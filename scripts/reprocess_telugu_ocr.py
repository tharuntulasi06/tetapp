import os
import re
import json
import time
import pymupdf
from pypdf import PdfReader
from google import genai
from dotenv import load_dotenv

load_dotenv('.env.local')
load_dotenv('.env')

API_KEY = os.getenv('GEMINI_API_KEY')

def ocr_telugu_pdf(pdf_path, ans_pdf_path, output_json_path):
    if not API_KEY:
        print("Error: GEMINI_API_KEY is not set in .env.local or .env!")
        return

    client = genai.Client(api_key=API_KEY)

    # 1. Parse Answer Key
    ans_reader = PdfReader(ans_pdf_path)
    ans_text = ''
    for p in ans_reader.pages:
        ans_text += p.extract_text() + '\n'
    answers = {}
    for qnum, ans_val in re.findall(r'(\d+)\s+([1-4])', ans_text):
        qnum_i = int(qnum)
        if qnum_i not in answers and qnum_i <= 650:
            answers[qnum_i] = int(ans_val)

    # Load existing questions if json file exists
    all_questions = []
    processed_qnums = set()
    if os.path.exists(output_json_path):
        try:
            with open(output_json_path, 'r', encoding='utf-8') as f:
                existing = json.load(f)
                all_questions = existing
                for q in existing:
                    if 'qnum' in q:
                        processed_qnums.add(q['qnum'])
        except Exception as e:
            all_questions = []

    doc = pymupdf.open(pdf_path)
    total_pages = len(doc)
    print(f"Total pages in Telugu PDF: {total_pages}. Already saved: {len(all_questions)} questions.")

    models_to_try = [
        'gemini-3.8-flash',
        'gemini-3.5-flash',
        'gemma-4-26b-a4b-it'
    ]

    # Process page by page
    for page_idx in range(1, total_pages - 7):
        page = doc[page_idx]
        pix = page.get_pixmap(dpi=200)
        img_bytes = pix.tobytes("png")

        prompt = """
You are an expert Telugu OCR engine. 
Extract all MCQ questions from this image page.
Output a JSON array of objects with keys:
- qnum: integer question number
- question: string (the Telugu/English question text)
- teluguQuestion: string (pure Telugu question text)
- options: array of 4 strings (e.g. ["A. Option1", "B. Option2", "C. Option3", "D. Option4"])

Return ONLY valid raw JSON array without markdown code blocks.
"""

        success = False
        for model_name in models_to_try:
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=[
                        genai.types.Part.from_bytes(data=img_bytes, mime_type='image/png'),
                        prompt
                    ]
                )

                text_resp = response.text.strip()
                if text_resp.startswith('```json'):
                    text_resp = text_resp[7:]
                if text_resp.endswith('```'):
                    text_resp = text_resp[:-3]

                page_qs = json.loads(text_resp.strip())

                new_added = 0
                for q in page_qs:
                    qnum = q.get('qnum', 0)
                    if qnum in processed_qnums:
                        continue

                    correct_idx = answers.get(qnum, 1) - 1
                    if correct_idx < 0 or correct_idx > 3:
                        correct_idx = 0

                    opts = q.get('options', [])
                    if len(opts) == 4:
                        clean_opts = [re.sub(r'^[1-4A-Da-d][\)\.]\s*', '', str(o)).strip() for o in opts]
                        formatted_opts = [f'{chr(65+i)}. {clean_opts[i]}' for i in range(4)]
                        correct_str = formatted_opts[correct_idx]

                        q['id'] = f'telugu-{qnum}'
                        q['options'] = formatted_opts
                        q['correctAnswer'] = correct_str
                        q['explanation'] = f'TET Telugu Paper official key answer is Option {chr(65+correct_idx)}.'
                        q['teluguExplanation'] = f'TET పరీక్ష జవాబు కీ ప్రకారం ఆప్షన్ {chr(65+correct_idx)} ({clean_opts[correct_idx]}) సరైన జవాబు.'
                        q['category'] = 'Telugu'
                        q['difficulty'] = 'medium'
                        all_questions.append(q)
                        processed_qnums.add(qnum)
                        new_added += 1

                # Save INCREMENTALLY to disk
                with open(output_json_path, 'w', encoding='utf-8') as f:
                    json.dump(all_questions, f, ensure_ascii=False, indent=2)

                print(f"Page {page_idx+1}/{total_pages-7}: Extracted {new_added} new questions via {model_name} (Total saved: {len(all_questions)})")
                success = True
                break
            except Exception as e:
                time.sleep(1)
                continue

        if not success:
            print(f"Skipped page {page_idx+1} (Rate limit across models)")

        time.sleep(1.2)

    print(f"\nFINISHED! Saved {len(all_questions)} pristine Telugu questions to {output_json_path}!")

if __name__ == '__main__':
    ocr_telugu_pdf(
        './src/data/papers/Paper1A TELUGU .pdf',
        './src/data/papers/Paper1A TELUGU  ANSWERS 162-168.pdf',
        './src/data/papers/paper_telugu.json'
    )
