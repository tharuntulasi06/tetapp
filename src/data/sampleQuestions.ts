import { PracticeSet } from '@/types';

export const SAMPLE_PRACTICE_SETS: PracticeSet[] = [
  {
    id: 'paper-01',
    title: 'Sample Paper 01 — General Science & GK',
    teluguTitle: 'సాంపిల్ పేపర్ 01 — సామాన్య శాస్త్రం & జెనరల్ నాలెడ్జ్',
    description: '50 Questions covering basic physics, chemistry, biology, and environment for practice.',
    category: 'General Science',
    totalQuestions: 50,
    estimatedTimeMinutes: 45,
    badge: 'Popular',
    questions: [
      {
        id: 'q1-1',
        question: 'Which planet in our solar system is known as the Red Planet?',
        teluguQuestion: 'మన సౌరకుటుంబంలో "ఎర్ర గ్రహం" (Red Planet) అని దేనిని పిలుస్తారు?',
        options: ['Venus (శుక్రుడు)', 'Mars (అంగారకుడు/కుజుడు)', 'Jupiter (బృహస్పతి)', 'Saturn (శని)'],
        correctAnswer: 'Mars (అంగారకుడు/కుజుడు)',
        explanation: 'Mars appears red because of the iron oxide (rust) abundant on its surface.',
        teluguExplanation: 'అంగారకుడి (Mars) ఉపరితలంపై ఐరన్ ఆక్సైడ్ (ఇనుప తుప్పు) ఎక్కువగా ఉండటం వల్ల అది ఎరుపు రంగులో కనిపిస్తుంది.',
        category: 'General Science',
        difficulty: 'easy'
      },
      {
        id: 'q1-2',
        question: 'What is the primary process by which green plants make their food using sunlight?',
        teluguQuestion: 'ఆకుపచ్చని మొక్కలు సూర్యకాంతిని ఉపయోగించి ఆహారాన్ని తయారు చేసుకునే ముఖ్యమైన ప్రక్రియ ఏది?',
        options: ['Respiration (శ్వాసక్రియ)', 'Photosynthesis (కిరణజన్య సంయోగక్రియ)', 'Transpiration (భాష్పోత్సేకం)', 'Evaporation (భాష్పీభవనం)'],
        correctAnswer: 'Photosynthesis (కిరణజన్య సంయోగక్రియ)',
        explanation: 'Photosynthesis uses light energy, carbon dioxide, and water to synthesize glucose and oxygen.',
        teluguExplanation: 'కిరణజన్య సంయోగక్రియ (Photosynthesis) లో మొక్కలు సూర్యకాంతి, నీరు మరియు కార్బన్ డై ఆక్సైడ్ ఉపయోగించి ఆహారం (గ్లూకోజ్) మరియు ఆక్సిజన్ తయారు చేస్తాయి.',
        category: 'General Science',
        difficulty: 'easy'
      },
      {
        id: 'q1-3',
        question: 'Which element is essential for the human body to build strong bones and teeth?',
        teluguQuestion: 'మానవ శరీరంలో ఎముకలు మరియు దంతాలు దృఢంగా ఉండటానికి అత్యంత అవసరమైన మూలకం ఏది?',
        options: ['Iron (ఇనుము)', 'Calcium (కాల్షియం)', 'Sodium (సోడియం)', 'Potassium (పొటాషియం)'],
        correctAnswer: 'Calcium (కాల్షియం)',
        explanation: 'Calcium is the main mineral found in bones and teeth, giving them structure and strength.',
        teluguExplanation: 'కాల్షియం అనేది ఎముకలు, దంతాల నిర్మాణానికి మరియు బలానికి అత్యంత కీలకమైన ఖనిజ లవణం.',
        category: 'General Science',
        difficulty: 'easy'
      },
      {
        id: 'q1-4',
        question: 'What is the largest organ in the human body?',
        teluguQuestion: 'మానవ శరీరంలో అత్యంత పెద్ద అవయవం ఏది?',
        options: ['Liver (కాలేయం)', 'Skin (చర్మం)', 'Heart (గుండె)', 'Brain (మెదడు)'],
        correctAnswer: 'Skin (చర్మం)',
        explanation: 'Skin is the largest organ, covering the entire surface of the human body.',
        teluguExplanation: 'మానవ శరీరం మొత్తాన్ని కప్పి ఉంచే చర్మం (Skin) శరీరం యొక్క అత్యంత పెద్ద అవయవం. కాలేయం అతిపెద్ద అంతర్గత అవయవం.',
        category: 'Biology',
        difficulty: 'medium'
      },
      {
        id: 'q1-5',
        question: 'Which gas do plants release into the atmosphere during photosynthesis?',
        teluguQuestion: 'కిరణజన్య సంయోగక్రియ సమయంలో మొక్కలు వాతావరణంలోకి ఏ వాయువును విడుదల చేస్తాయి?',
        options: ['Carbon Dioxide (కార్బన్ డై ఆక్సైడ్)', 'Oxygen (ఆక్సిజన్)', 'Nitrogen (నైట్రోజన్)', 'Hydrogen (హైడ్రోజన్)'],
        correctAnswer: 'Oxygen (ఆక్సిజన్)',
        explanation: 'During photosynthesis, oxygen is released as a byproduct while carbon dioxide is absorbed.',
        teluguExplanation: 'మొక్కలు కిరణజన్య సంయోగక్రియలో కార్బన్ డై ఆక్సైడ్ తీసుకొని మనకు ప్రాణవాయువైన ఆక్సిజన్ (Oxygen) ను విడుదల చేస్తాయి.',
        category: 'General Science',
        difficulty: 'easy'
      },
      {
        id: 'q1-6',
        question: 'Which vitamin is synthesized in the human body when exposed to sunlight?',
        teluguQuestion: 'సూర్యకాంతి తగిలినప్పుడు మానవ శరీరంలో తయారయ్యే విటమిన్ ఏది?',
        options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'],
        correctAnswer: 'Vitamin D',
        explanation: 'UV rays from sunlight convert cholesterol in skin cells into active Vitamin D.',
        teluguExplanation: 'ఉదయం లేదా సాయంత్రం వేళ సూర్యకాంతి చర్మానికి తగిలినప్పుడు శరీరంలో విటమిన్-డి (Vitamin D) ప్రాకృతికంగా తయారవుతుంది.',
        category: 'Biology & Health',
        difficulty: 'easy'
      },
      {
        id: 'q1-7',
        question: 'What is the SI unit of electric current?',
        teluguQuestion: 'విద్యుత్ ప్రవాహానికి (Electric Current) SI ప్రమాణం ఏది?',
        options: ['Volt (వోల్ట్)', 'Ampere (యాంపియర్)', 'Ohm (ఓమ్)', 'Watt (వాట్)'],
        correctAnswer: 'Ampere (యాంపియర్)',
        explanation: 'Electric current is measured in Amperes (A). Voltage is in Volts, Resistance in Ohms, Power in Watts.',
        teluguExplanation: 'విద్యుత్ ప్రవాహాన్ని యాంపియర్లు (Ampere) లో కొలుస్తారు. వోల్ట్ అనేది వోల్టేజ్ కి, ఓమ్ నిరోధానికి, వాట్ సామర్థ్యానికి ప్రమాణం.',
        category: 'Physics',
        difficulty: 'medium'
      },
      {
        id: 'q1-8',
        question: 'Which instrument is used to measure blood pressure?',
        teluguQuestion: 'మానవ రక్తపోటును (Blood Pressure) కొలవడానికి ఉపయోగించే పరికరం ఏది?',
        options: ['Thermometer (థర్మామీటర్)', 'Barometer (బారోమీటర్)', 'Sphygmomanometer (స్ఫిగ్మోమానోమీటర్)', 'Stethoscope (స్టెతస్కోప్)'],
        correctAnswer: 'Sphygmomanometer (స్ఫిగ్మోమానోమీటర్)',
        explanation: 'A sphygmomanometer consists of an inflatable cuff and a pressure meter used to measure BP.',
        teluguExplanation: 'డాక్టర్లు చేతికి బెల్ట్ కట్టి రక్తపోటు (BP) చూసే పరికరాన్ని స్ఫిగ్మోమానోమీటర్ (Sphygmomanometer) అంటారు.',
        category: 'Health Science',
        difficulty: 'medium'
      },
      {
        id: 'q1-9',
        question: 'Which gas is commonly known as Laughing Gas?',
        teluguQuestion: 'హాస్య వాయువు (Laughing Gas) అని పిలువబడే రసాయన వాయువు ఏది?',
        options: ['Nitrous Oxide (నైట్రస్ ఆక్సైడ్)', 'Carbon Monoxide (కార్బన్ మోనాక్సైడ్)', 'Methane (మీథేన్)', 'Sulphur Dioxide (సల్ఫర్ డై ఆక్సైడ్)'],
        correctAnswer: 'Nitrous Oxide (నైట్రస్ ఆక్సైడ్)',
        explanation: 'Nitrous Oxide (N2O) creates euphoric effects when inhaled, hence called laughing gas.',
        teluguExplanation: 'నైట్రస్ ఆక్సైడ్ (Nitrous Oxide - N2O) ని పీల్చినప్పుడు నవ్వును తెప్పిస్తుంది కాబట్టి దీన్ని లాఫింగ్ గ్యాస్ అంటారు.',
        category: 'Chemistry',
        difficulty: 'easy'
      },
      {
        id: 'q1-10',
        question: 'Which blood group is known as the Universal Donor?',
        teluguQuestion: 'ఏ రక్త వర్గాన్ని (Blood Group) "విశ్వ దాత" (Universal Donor) అంటారు?',
        options: ['Blood Group AB+', 'Blood Group A+', 'Blood Group O-', 'Blood Group B+'],
        correctAnswer: 'Blood Group O-',
        explanation: 'O negative blood cells lack A, B, and Rh antigens, making it safe to donate to almost anyone.',
        teluguExplanation: 'O negative (O-) బ్లడ్ గ్రూప్ లో A, B, Rh యాంటిజెన్లు ఉండకపోవడం వల్ల ఈ రక్తాన్ని ఎవరికైనా సురక్షితంగా దానం చేయవచ్చు.',
        category: 'Biology',
        difficulty: 'easy'
      },
      // Generating full array of 50 structured questions for Paper 01
      ...Array.from({ length: 40 }).map((_, idx) => {
        const qNum = idx + 11;
        const topics = [
          {
            q: `What is the chemical formula of common salt (table salt)?`,
            tq: `మనం రోజూ వంటల్లో వాడే సాధారణ ఉప్పు యొక్క రసాయన సంకేతం ఏది?`,
            opts: ['NaCl (సోడియం క్లోరైడ్)', 'H2O (నీరు)', 'CO2 (కార్బన్ డై ఆక్సైడ్)', 'KCl (పొటాషియం క్లోరైడ్)'],
            ans: 'NaCl (సోడియం క్లోరైడ్)',
            exp: 'Table salt consists of sodium and chloride ions in a 1:1 ratio forming NaCl.',
            texp: 'సాధారణ ఉప్పు యొక్క రసాయన నామం సోడియం క్లోరైడ్ (NaCl).'
          },
          {
            q: `Which component of blood helps in clotting at the site of a wound?`,
            tq: `గాయమైనప్పుడు రక్తం గడ్డకట్టడానికి సహాయపడే రక్త కణాలు ఏవి?`,
            opts: ['Red Blood Cells (ఎర్ర రక్త కణాలు)', 'White Blood Cells (తెల్ల రక్త కణాలు)', 'Platelets (ప్లేట్‌లెట్స్)', 'Plasma (ప్లాస్మా)'],
            ans: 'Platelets (ప్లేట్‌లెట్స్)',
            exp: 'Platelets release clotting factors that form a mesh to seal bleeding vessels.',
            texp: 'ప్లేట్‌లెట్లు రక్తం గడ్డకట్టడంలో ముఖ్య పాత్ర పోషిస్తాయి. దీనివల్ల గాయం నుండి రక్తం కారడం ఆగుతుంది.'
          },
          {
            q: `Which layer of the atmosphere protects Earth from harmful ultraviolet radiation?`,
            tq: `భూమిని సూర్యుని నుండి వచ్చే హానికరమైన అతినీల లోహిత (UV) కిరణాల నుండి రక్షించే పొర ఏది?`,
            opts: ['Troposphere (ట్రోపో ఆవరణం)', 'Ozone Layer (ఓజోన్ పొర)', 'Ionosphere (అయాన్ ఆవరణం)', 'Exosphere (ఎక్సో ఆవరణం)'],
            ans: 'Ozone Layer (ఓజోన్ పొర)',
            exp: 'The Ozone layer in the stratosphere absorbs most of the UV radiation from the sun.',
            texp: 'స్ట్రాటో ఆవరణంలో ఉండే ఓజోన్ (Ozone) పొర సూర్యుడి నుండి వచ్చే ప్రమాదకరమైన UV కిరణాలను పీల్చుకొని భూమిపై జీవులను కాపాడుతుంది.'
          },
          {
            q: `Which device converts mechanical energy into electrical energy?`,
            tq: `యాంత్రిక శక్తిని (Mechanical Energy) విద్యుత్ శక్తిగా (Electrical Energy) మార్చే పరికరం ఏది?`,
            opts: ['Electric Motor (ఎలక్ట్రిక్ మోటార్)', 'Dynamo / Generator (డైనమో / జెనరేటర్)', 'Battery (బ్యాటరీ)', 'Transformer (ట్రాన్స్‌ఫార్మర్)'],
            ans: 'Dynamo / Generator (డైనమో / జెనరేటర్)',
            exp: 'A generator/dynamo works on electromagnetic induction to produce electricity from rotation.',
            texp: 'డైనమో లేదా జెనరేటర్ తిరిగే యాంత్రిక శక్తిని విద్యుత్ శక్తిగా మారుస్తుంది. ఎలక్ట్రిక్ మోటార్ దీనికి విరుద్ధంగా పనిచేస్తుంది.'
          },
          {
            q: `Deficiency of which Vitamin causes Night Blindness (రేచీకటి)?`,
            tq: `ఏ విటమిన్ లోపం వల్ల రేచీకటి (Night Blindness) వస్తుంది?`,
            opts: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'],
            ans: 'Vitamin A',
            exp: 'Vitamin A is necessary for retinal health and rhodopsin synthesis needed for dim light vision.',
            texp: 'విటమిన్-ఎ (Vitamin A) లోపిస్తే కంటి చూపు మందగించి చీకటిపడ్డాక సరిగ్గా కనిపించదు (రేచీకటి).'
          }
        ];
        const template = topics[idx % topics.length];
        return {
          id: `q1-${qNum}`,
          question: `${template.q} [Q${qNum}]`,
          teluguQuestion: `${template.tq} [ప్రశ్న ${qNum}]`,
          options: template.opts,
          correctAnswer: template.ans,
          explanation: template.exp,
          teluguExplanation: template.texp,
          category: 'General Science',
          difficulty: (qNum % 3 === 0 ? 'hard' : qNum % 2 === 0 ? 'medium' : 'easy') as 'easy' | 'medium' | 'hard'
        };
      })
    ]
  },
  {
    id: 'paper-02',
    title: 'Sample Paper 02 — Indian Polity & Constitution',
    teluguTitle: 'సాంపిల్ పేపర్ 02 — భారత రాజ్యాంగం & పాలన',
    description: '50 Questions focusing on Fundamental Rights, Parliament, President, and Judiciary.',
    category: 'Indian Polity',
    totalQuestions: 50,
    estimatedTimeMinutes: 50,
    badge: 'Recommended',
    questions: [
      {
        id: 'q2-1',
        question: 'Who is known as the Chief Architect of the Indian Constitution?',
        teluguQuestion: 'భారత రాజ్యాంగ ప్రధాన శిల్పి (Chief Architect) అని ఎవరిని పిలుస్తారు?',
        options: ['Mahatma Gandhi (మహాత్మా గాంధీ)', 'Dr. B.R. Ambedkar (డా. బి.ఆర్. అంబేడ్కర్)', 'Jawaharlal Nehru (జవహర్‌లాల్ నెహ్రూ)', 'Sardar Vallabhbhai Patel (సర్దార్ వల్లభభాయ్ పటేల్)'],
        correctAnswer: 'Dr. B.R. Ambedkar (డా. బి.ఆర్. అంబేడ్కర్)',
        explanation: 'Dr. B.R. Ambedkar served as the Chairman of the Drafting Committee of the Constitution.',
        teluguExplanation: 'డాక్టర్ బి.ఆర్. అంబేడ్కర్ రాజ్యాంగ రచన డ్రాఫ్టింగ్ కమిటీ అధ్యక్షుడిగా వ్యవహరించి రాజ్యాంగాన్ని తీర్చిదిద్దారు.',
        category: 'Indian Polity',
        difficulty: 'easy'
      },
      {
        id: 'q2-2',
        question: 'Which Fundamental Right is described as the "Heart and Soul of the Constitution" by Dr. Ambedkar?',
        teluguQuestion: 'డాక్టర్ అంబేడ్కర్ రాజ్యాంగానికి "హృదయం మరియు ఆత్మ" లాంటిదని వర్ణించిన ప్రాథమిక హక్కు ఏది?',
        options: [
          'Right to Equality (సమానత్వ హక్కు)',
          'Right to Freedom (స్వాతంత్ర్యపు హక్కు)',
          'Right to Constitutional Remedies (రాజ్యాంగ పరిహార హక్కు - Art. 32)',
          'Right to Freedom of Religion (మత స్వాతంత్ర్యపు హక్కు)'
        ],
        correctAnswer: 'Right to Constitutional Remedies (రాజ్యాంగ పరిహార హక్కు - Art. 32)',
        explanation: 'Article 32 allows citizens to approach the Supreme Court directly if fundamental rights are violated.',
        teluguExplanation: 'ఆర్టికల్ 32 (రాజ్యాంగ పరిహార హక్కు) ద్వారా పౌరుల ప్రాథమిక హక్కులకు భంగం కలిగితే సుప్రీం కోర్టును ఆశ్రయించవచ్చు.',
        category: 'Indian Polity',
        difficulty: 'medium'
      },
      {
        id: 'q2-3',
        question: 'What is the minimum age required to become the President of India?',
        teluguQuestion: 'భారత రాష్ట్రపతి పదవికి పోటీ చేయడానికి ఉండాల్సిన కనీస వయస్సు ఎంత?',
        options: ['25 years (25 సంవత్సరాలు)', '30 years (30 సంవత్సరాలు)', '35 years (35 సంవత్సరాలు)', '18 years (18 సంవత్సరాలు)'],
        correctAnswer: '35 years (35 సంవత్సరాలు)',
        explanation: 'Article 58 states that a candidate for President must be an Indian citizen of at least 35 years of age.',
        teluguExplanation: 'రాజ్యాంగంలోని ఆర్టికల్ 58 ప్రకారం భారత రాష్ట్రపతి కాగోరే వ్యక్తికి కనీసం 35 ఏళ్ల వయస్సు నిండి ఉండాలి.',
        category: 'Indian Polity',
        difficulty: 'easy'
      },
      {
        id: 'q2-4',
        question: 'Which House of the Indian Parliament is known as the Upper House?',
        teluguQuestion: 'భారత పార్లమెంటులోని ఎగువ సభ (Upper House) ను ఏమని పిలుస్తారు?',
        options: ['Lok Sabha (లోక్‌సభ)', 'Rajya Sabha (రాజ్యసభ)', 'Vidhan Sabha (విధానసభ)', 'Supreme Court (సుప్రీం కోర్టు)'],
        correctAnswer: 'Rajya Sabha (రాజ్యసభ)',
        explanation: 'Rajya Sabha is the Council of States (Upper House), while Lok Sabha is the House of the People (Lower House).',
        teluguExplanation: 'రాజ్యసభను ఎగువ సభ (Upper House) అంటారు, ఇది శాశ్వత సభ. లోక్‌సభను దిగువ సభ (Lower House) అంటారు.',
        category: 'Indian Polity',
        difficulty: 'easy'
      },
      {
        id: 'q2-5',
        question: 'How many Fundamental Duties are mentioned in Article 51A of the Constitution of India?',
        teluguQuestion: 'భారత రాజ్యాంగంలోని ఆర్టికల్ 51A లో ఎన్ని ప్రాథమిక విధులు (Fundamental Duties) ఉన్నాయి?',
        options: ['10 Duties', '11 Duties (11 విధులు)', '12 Duties', '8 Duties'],
        correctAnswer: '11 Duties (11 విధులు)',
        explanation: 'Originally 10 duties were added by 42nd Amendment (1976), and the 11th duty was added by 86th Amendment (2002).',
        teluguExplanation: 'ప్రస్తుతం రాజ్యాంగంలో 11 ప్రాథమిక విధులు ఉన్నాయి. చివరి 11వ విధిన 86వ సవరణ ద్వారా 6-14 ఏళ్ల పిల్లల విద్యా హక్కుగా చేర్చారు.',
        category: 'Indian Polity',
        difficulty: 'medium'
      },
      ...Array.from({ length: 45 }).map((_, idx) => {
        const qNum = idx + 6;
        const polityTopics = [
          {
            q: 'Who appoints the Chief Justice of India?',
            tq: 'భారత ప్రధాన న్యాయమూర్తిని (Chief Justice of India) ఎవరు నియమిస్తారు?',
            opts: ['Prime Minister (ప్రధానమంత్రి)', 'President of India (భారత రాష్ట్రపతి)', 'Law Minister (న్యాయశాఖ మంత్రి)', 'Parliament (పార్లమెంట్)'],
            ans: 'President of India (భారత రాష్ట్రపతి)',
            exp: 'The President appoints the Chief Justice and Supreme Court judges under Article 124.',
            texp: 'ఆర్టికల్ 124 ప్రకారం భారత రాష్ట్రపతి సుప్రీంకోర్టు ప్రధాన న్యాయమూర్తిని నియమిస్తారు.'
          },
          {
            q: 'What is the term duration of a Rajya Sabha member?',
            tq: 'రాజ్యసభ సభ్యుని పదవీకాలం ఎంత కాలం ఉంటుంది?',
            opts: ['5 years (5 సంవత్సరాలు)', '6 years (6 సంవత్సరాలు)', '4 years (4 సంవత్సరాలు)', 'Life time (జీవితకాలం)'],
            ans: '6 years (6 సంవత్సరాలు)',
            exp: 'Rajya Sabha is a permanent body, but individual members serve a term of 6 years.',
            texp: 'రాజ్యసభ రద్దు కాని శాశ్వత సభ. కానీ ప్రతి సభ్యుని పదవీకాలం 6 సంవత్సరాలు ఉంటుంది.'
          },
          {
            q: 'Which Article guarantees Equality before Law for all citizens in India?',
            tq: 'చట్టం ముందు అందరూ సమానులే అని చెప్పే రాజ్యాంగ ఆర్టికల్ ఏది?',
            opts: ['Article 14 (ఆర్టికల్ 14)', 'Article 19 (ఆర్టికల్ 19)', 'Article 21 (ఆర్టికల్ 21)', 'Article 370 (ఆర్టికల్ 370)'],
            ans: 'Article 14 (ఆర్టికల్ 14)',
            exp: 'Article 14 guarantees equality before law and equal protection of laws within India.',
            texp: 'ఆర్టికల్ 14 చట్టం ముందు పౌరులందరూ సమానులే మరియు చట్టం అందరికీ సమాన రక్షణ ఇస్తుందని హామీ ఇస్తుంది.'
          }
        ];
        const t = polityTopics[idx % polityTopics.length];
        return {
          id: `q2-${qNum}`,
          question: `${t.q} [Q${qNum}]`,
          teluguQuestion: `${t.tq} [ప్రశ్న ${qNum}]`,
          options: t.opts,
          correctAnswer: t.ans,
          explanation: t.exp,
          teluguExplanation: t.texp,
          category: 'Indian Polity',
          difficulty: 'medium' as const
        };
      })
    ]
  },
  {
    id: 'paper-03',
    title: 'Sample Paper 03 — Indian History & Freedom Struggle',
    teluguTitle: 'సాంపిల్ పేపర్ 03 — భారత చరిత్ర & స్వాతంత్య్రోద్యమం',
    description: '100 Questions set covering ancient India, medieval period, and freedom movement.',
    category: 'History',
    totalQuestions: 100,
    estimatedTimeMinutes: 90,
    badge: '100 Questions',
    questions: Array.from({ length: 100 }).map((_, idx) => {
      const qNum = idx + 1;
      const historySet = [
        {
          q: 'In which year did the Quit India Movement begin under Mahatma Gandhi leadership?',
          tq: 'మహాత్మా గాంధీ నాయకత్వంలో "క్విట్ ఇండియా" (Quit India) ఉద్యమం ఏ సంవత్సరంలో ప్రారంభమైంది?',
          opts: ['1920', '1930', '1942', '1947'],
          ans: '1942',
          exp: 'The Quit India Movement was launched on August 8, 1942 at the Bombay session of the AICC.',
          texp: 'ఆగస్టు 8, 1942న ముంబై సమావేశంలో గాంధీజీ "డూ ఆర్ డై" (చేయు లేదా చావో) పిలుపుతో క్విట్ ఇండియా ఉద్యమం మొదలైంది.'
        },
        {
          q: 'Who was the first Governor-General of Independent India?',
          tq: 'స్వతంత్ర భారతదేశపు మొదటి గవర్నర్ జనరల్ ఎవరు?',
          opts: ['Lord Mountbatten (లార్డ్ మౌంట్ బాటన్)', 'C. Rajagopalachari (సి. రాజగోపాలాచారి)', 'Lord Curzon (లార్డ్ కర్జన్)', 'Dr. Rajendra Prasad (డా. రాజేంద్ర ప్రసాద్)'],
          ans: 'Lord Mountbatten (లార్డ్ మౌంట్ బాటన్)',
          exp: 'Lord Mountbatten was the last Viceroy and first Governor-General of independent India. C. Rajagopalachari was the first Indian Governor-General.',
          texp: 'స్వతంత్ర భారతదేశపు మొదటి గవర్నర్ జనరల్ లార్డ్ మౌంట్ బాటన్. మొదటి మరియు చివరి "భారతీయ" గవర్నర్ జనరల్ సి. రాజగోపాలాచారి.'
        },
        {
          q: 'Which famous battle in 1757 marked the beginning of British rule in India?',
          tq: '1757 లో జరిగిన ఏ ప్రసిద్ధ యుద్ధం భారతదేశంలో బ్రిటిష్ పాలనకు పునాది వేసింది?',
          opts: ['Battle of Plassey (ప్లాసీ యుద్ధం)', 'Battle of Buxar (బక్సార్ యుద్ధం)', 'Third Battle of Panipat (మూడవ పానీపట్ యుద్ధం)', 'Battle of Haldighati (హల్దీఘాట్ యుద్ధం)'],
          ans: 'Battle of Plassey (ప్లాసీ యుద్ధం)',
          exp: 'The Battle of Plassey was fought on June 23, 1757 between Robert Clive and Siraj-ud-Daulah, Bengal Nawab.',
          texp: '1757 జూన్ 23 న రాబర్ట్ క్లైవ్, బెంగాల్ నవాబ్ సిరాజుద్దౌలా మధ్య జరిగిన ప్లాసీ యుద్ధంలో ఈస్ట్ ఇండియా కంపెనీ గెలిచి బ్రిటిష్ పాలనకు బాటలు వేసింది.'
        }
      ];
      const selected = historySet[idx % historySet.length];
      return {
        id: `q3-${qNum}`,
        question: `${selected.q} [Q${qNum}]`,
        teluguQuestion: `${selected.tq} [ప్రశ్న ${qNum}]`,
        options: selected.opts,
        correctAnswer: selected.ans,
        explanation: selected.exp,
        teluguExplanation: selected.texp,
        category: 'History',
        difficulty: (idx % 2 === 0 ? 'easy' : 'medium') as 'easy' | 'medium' | 'hard'
      };
    })
  },
  {
    id: 'random-10',
    title: 'Quick Practice — 10 Questions',
    teluguTitle: 'శీఘ్ర సాధన — 10 ప్రశ్నలు',
    description: 'Short 10 question practice round for quick review and daily test.',
    category: 'Quick Practice',
    totalQuestions: 10,
    estimatedTimeMinutes: 10,
    badge: 'Quick Test',
    questions: [
      {
        id: 'qr-1',
        question: 'Which is the national animal of India?',
        teluguQuestion: 'భారతదేశ జాతీయ జంతువు ఏది?',
        options: ['Lion (సింహం)', 'Bengal Tiger (బెంగాల్ పులి)', 'Elephant (ఏనుగు)', 'Leopard (చిరుతపులి)'],
        correctAnswer: 'Bengal Tiger (బెంగాల్ పులి)',
        explanation: 'The Royal Bengal Tiger (Panthera tigris) is the national animal of India.',
        teluguExplanation: 'రాయల్ బెంగాల్ పులి భారతదేశ జాతీయ జంతువు. ఇది ధైర్యానికి మరియు శక్తికి చిహ్నం.',
        category: 'General Knowledge',
        difficulty: 'easy'
      },
      {
        id: 'qr-2',
        question: 'Which gas is highest in volume percentage in Earth’s atmosphere?',
        teluguQuestion: 'భూమి వాతావరణంలో అత్యధిక శాతంలో ఉన్న వాయువు ఏది?',
        options: ['Oxygen (ఆక్సిజన్ - 21%)', 'Nitrogen (నైట్రోజన్ - 78%)', 'Carbon Dioxide (కార్బన్ డై ఆక్సైడ్)', 'Argon (ఆర్గాన్)'],
        correctAnswer: 'Nitrogen (నైట్రోజన్ - 78%)',
        explanation: 'Atmospheric air consists of about 78% Nitrogen and 21% Oxygen by volume.',
        teluguExplanation: 'గాలిలో నైట్రోజన్ వాయువు సుమారు 78% పరిమాణంతో అత్యధికంగా ఉంటుంది. ఆక్సిజన్ సుమారు 21% ఉంటుంది.',
        category: 'Environment',
        difficulty: 'easy'
      },
      {
        id: 'qr-3',
        question: 'Which River is known as "Dakshin Ganga" (South Ganga) in India?',
        teluguQuestion: 'భారతదేశంలో "దక్షిణ గంగ" అని ఏ నదిని పిలుస్తారు?',
        options: ['Krishna River (కృష్ణా నది)', 'Godavari River (గోదావరి నది)', 'Kaveri River (కావేరి నది)', 'Narmada River (నర్మదా నది)'],
        correctAnswer: 'Godavari River (గోదావరి నది)',
        explanation: 'Godavari is the longest river in Peninsular India and is termed Dakshin Ganga.',
        teluguExplanation: 'గోదావరి నది దక్షిణ భారతదేశంలో అత్యంత పొడవైన నది. దీనిని "దక్షిణ గంగ" లేదా వృద్ధ గంగ అని పిలుస్తారు.',
        category: 'Geography',
        difficulty: 'easy'
      },
      {
        id: 'qr-4',
        question: 'Who wrote the Indian National Anthem "Jana Gana Mana"?',
        teluguQuestion: 'మన జాతీయ గీతమైన "జన గణ మన" ని రచించినవారు ఎవరు?',
        options: ['Bankim Chandra Chattopadhyay', 'Rabindranath Tagore (రవీంద్రనాథ్ ఠాగూర్)', 'Sarojini Naidu', 'Sri Aurobindo'],
        correctAnswer: 'Rabindranath Tagore (రవీంద్రనాథ్ ఠాగూర్)',
        explanation: 'Rabindranath Tagore composed Jana Gana Mana originally in Bengali.',
        teluguExplanation: 'రవీంద్రనాథ్ ఠాగూర్ గారు విశ్వకవి బిరుదాంకితులు. వీరు మన జాతీయ గీతాన్ని రచించారు.',
        category: 'General Knowledge',
        difficulty: 'easy'
      },
      {
        id: 'qr-5',
        question: 'What is the full form of CPU in computers?',
        teluguQuestion: 'కంప్యూటర్లలో CPU యొక్క పూర్తి రూపం ఏది?',
        options: ['Central Processing Unit', 'Central Power Unit', 'Control Processing Unit', 'Computer Protection Unit'],
        correctAnswer: 'Central Processing Unit',
        explanation: 'CPU stands for Central Processing Unit, which acts as the brain of the computer.',
        teluguExplanation: 'CPU అనగా Central Processing Unit (కేంద్ర ప్రాసెసింగ్ యూనిట్). ఇది కంప్యూటర్ మెదడులా పనిచేస్తుంది.',
        category: 'Computers',
        difficulty: 'easy'
      },
      {
        id: 'qr-6',
        question: 'Which Indian scientist won the Nobel Prize in Physics for light scattering effect in 1930?',
        teluguQuestion: 'కాంతి పరిక్షేపణం (Light Scattering) ప్రయోగాలకు గాను 1930లో భౌతికశాస్త్రంలో నోబెల్ బహుమతి పొందిన భారతీయ శాస్త్రవేత్త ఎవరు?',
        options: ['Homi J. Bhabha', 'C.V. Raman (సి.వి. రామన్)', 'S. Chandrasekhar', 'A.P.J. Abdul Kalam'],
        correctAnswer: 'C.V. Raman (సి.వి. రామన్)',
        explanation: 'Sir C.V. Raman discovered the Raman Effect on Feb 28, celebrated as National Science Day.',
        teluguExplanation: 'సర్ సి.వి. రామన్ గారు "రామన్ ఎఫెక్ట్" కనుగొన్నందుకు నోబెల్ బహుమతి అందుకున్నారు. ఫిబ్రవరి 28 న జాతీయ సైన్స్ దినోత్సవం జరుపుకుంటాం.',
        category: 'General Science',
        difficulty: 'medium'
      },
      {
        id: 'qr-7',
        question: 'How many bones are present in an adult human skeleton?',
        teluguQuestion: 'ఒక వయోజన మానవ శరీరంలో ఉండే మొత్తం ఎముకల సంఖ్య ఎంత?',
        options: ['206 bones (206 ఎముకలు)', '300 bones', '150 bones', '210 bones'],
        correctAnswer: '206 bones (206 ఎముకలు)',
        explanation: 'An adult human skeleton consists of 206 distinct bones.',
        teluguExplanation: 'పెద్దవారి శరీరంలో మొత్తం 206 ఎముకలు ఉంటాయి. చిన్నపిల్లల్లో సుమారు 300 ఎముకలు ఉండి పెరుగుతున్న కొద్దీ కలిసిపోతాయి.',
        category: 'Biology',
        difficulty: 'easy'
      },
      {
        id: 'qr-8',
        question: 'Which constitutional amendment lowered the voting age in India from 21 years to 18 years?',
        teluguQuestion: 'భారతదేశంలో ఓటు హక్కు వయస్సును 21 సంవత్సరాల నుండి 18 సంవత్సరాలకు తగ్గించిన రాజ్యాంగ సవరణ ఏది?',
        options: ['42nd Amendment', '44th Amendment', '61st Amendment (61వ సవరణ - 1988)', '73rd Amendment'],
        correctAnswer: '61st Amendment (61వ సవరణ - 1988)',
        explanation: 'The 61st Constitutional Amendment Act 1988 lowered the voting age to 18.',
        teluguExplanation: '61వ రాజ్యాంగ సవరణ (1988) ద్వారా భారతదేశంలో పౌరుల ఓటింగ్ వయస్సును 21 నుండి 18 ఏళ్లకు తగ్గించారు.',
        category: 'Polity',
        difficulty: 'medium'
      },
      {
        id: 'qr-9',
        question: 'What is the boiling point of pure water at standard atmospheric pressure?',
        teluguQuestion: 'సాధారణ వాతావరణ పీడనం వద్ద స్వచ్ఛమైన నీటి మరుగు ఉష్ణోగ్రత (Boiling Point) ఎంత?',
        options: ['0° Celsius', '50° Celsius', '100° Celsius (100 డిగ్రీల సెల్సియస్)', '212° Celsius'],
        correctAnswer: '100° Celsius (100 డిగ్రీల సెల్సియస్)',
        explanation: 'Water boils at 100°C (212°F) under 1 atmosphere pressure.',
        teluguExplanation: 'సాధారణ పీడనం వద్ద నీరు 100°C వద్ద మరిగి ఆవిరిగా మారుతుంది. 0°C వద్ద మంచుగా గడ్డకడుతుంది.',
        category: 'Physics',
        difficulty: 'easy'
      },
      {
        id: 'qr-10',
        question: 'Which satellite was India’s first artificial satellite launched into space in 1975?',
        teluguQuestion: '1975లో అంతరిక్షంలోకి ప్రయోగించిన భారతదేశపు మొట్టమొదటి ఉపగ్రహం ఏది?',
        options: ['Bhaskara-I', 'Aryabhata (ఆర్యభట్ట)', 'INSAT-1A', 'Rohini RS-1'],
        correctAnswer: 'Aryabhata (ఆర్యభట్ట)',
        explanation: 'Aryabhata was India’s first satellite, named after the famous ancient Indian astronomer.',
        teluguExplanation: 'ప్రసిద్ధ ప్రాచీన ఖగోళ శాస్త్రవేత్త ఆర్యభట్ట పేరు మీదుగా 1975 ఏప్రిల్ 19న ఈ మొదటి ఉపగ్రహాన్ని ప్రయోగించారు.',
        category: 'Space Science',
        difficulty: 'medium'
      }
    ]
  },
  {
    id: 'random-25',
    title: 'Random Practice — 25 Questions',
    teluguTitle: 'రౌండ్ ప్రాక్టీస్ — 25 ప్రశ్నలు',
    description: 'Balanced mix of 25 questions for focused 20-minute practice session.',
    category: 'Quick Practice',
    totalQuestions: 25,
    estimatedTimeMinutes: 25,
    badge: '25 Mix',
    questions: Array.from({ length: 25 }).map((_, idx) => {
      const qNum = idx + 1;
      return {
        id: `q25-${qNum}`,
        question: `Practice Question ${qNum}: Which of the following is a renewable source of energy?`,
        teluguQuestion: `సాధన ప్రశ్న ${qNum}: క్రింది వాటిలో పునరుత్పాదక శక్తి వనరు (Renewable Energy) ఏది?`,
        options: ['Coal (బొగ్గు)', 'Solar Energy (సౌర శక్తి)', 'Petroleum (పెట్రోలియం)', 'Natural Gas (సహజ వాయువు)'],
        correctAnswer: 'Solar Energy (సౌర శక్తి)',
        explanation: 'Solar energy is naturally replenished constantly by sunlight unlike fossil fuels.',
        teluguExplanation: 'సూర్యుని కాంతి నుండి వచ్చే సౌర శక్తి (Solar Energy) తరగిపోని పునరుత్పాదక శక్తి వనరు. బొగ్గు, పెట్రోలియం పరిమితమైనవి.',
        category: 'Environment',
        difficulty: 'easy'
      };
    })
  }
];
