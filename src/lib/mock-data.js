export const mockDashboard = {
  overview: [
    { label: "Current Band", value: "6.5", helper: "Target 7.5" },
    { label: "Tests Completed", value: "14", helper: "3 this week" },
    { label: "Streak", value: "9 days", helper: "Best: 16 days" },
    { label: "Accuracy", value: "78%", helper: "Reading focus" },
  ],
  skills: [
    { name: "Reading", score: 7.0, delta: "+0.5" },
    { name: "Listening", score: 6.5, delta: "+0.5" },
    { name: "Writing", score: 6.0, delta: "+0.5" },
    { name: "Speaking", score: 6.5, delta: "+0.5" },
  ],
  recentTests: [
    { name: "Reading Foundations", date: "May 21, 2026", score: "31 / 40", band: "7.0" },
    { name: "Academic Reading Drill", date: "May 19, 2026", score: "28 / 40", band: "6.5" },
    { name: "Time Pressure Set", date: "May 17, 2026", score: "30 / 40", band: "7.0" },
  ],
  streak: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => ({
    day,
    active: index !== 2,
  })),
  timeline: [
    { month: "Jan", band: 5.5 },
    { month: "Feb", band: 6.0 },
    { month: "Mar", band: 6.0 },
    { month: "Apr", band: 6.5 },
    { month: "May", band: 7.0 },
  ],
};

export const mockDemoBookings = [
  {
    id: "lead_001",
    full_name: "Aarav Malhotra",
    email: "aarav@example.com",
    phone: "+91 9876543210",
    target_band: "7.5",
    status: "new",
    created_at: "2026-05-21T08:30:00.000Z",
    source: "landing-page",
  },
  {
    id: "lead_002",
    full_name: "Sara Khan",
    email: "sara@example.com",
    phone: "+91 9988776655",
    target_band: "8.0+",
    status: "contacted",
    created_at: "2026-05-20T12:10:00.000Z",
    source: "hero-cta",
  },
];

export const mockSeoPages = [
  {
    id: "seo_home",
    page_key: "home",
    title: "IELTS.my | Premium IELTS Coaching",
    description: "IELTS.my offers intensive premium IELTS coaching with mock tests and score analytics.",
    slug: "/",
    keywords: ["IELTS coaching", "IELTS mock test", "IELTS course"],
    seoScore: 92,
  },
  {
    id: "seo_reading",
    page_key: "reading-test",
    title: "IELTS Reading Mock Test | IELTS.my",
    description: "Practice IELTS Reading with timer, answer review, and score insights.",
    slug: "/tests/reading-foundations",
    keywords: ["IELTS Reading", "IELTS Reading mock test"],
    seoScore: 81,
  },
];

export const mockContent = {
  faq: [
    {
      question: "Do students get answer explanations after every test?",
      answer: "Yes. Objective sections include detailed explanations and writing feedback is shown after evaluation.",
    },
  ],
  testimonials: [
    {
      name: "Nikita Rao",
      quote: "The Reading drills and review flow finally made timing feel manageable.",
    },
  ],
  pricing: {
    plan: "IELTS Fast Track",
    price: "EUR 490",
  },
};

export const mockTests = [
  {
    id: "test_reading_foundations",
    slug: "reading-foundations",
    title: "Academic Reading Mock 01",
    section: "Reading",
    durationMinutes: 60,
    level: "Academic",
    questionCount: 24,
    description: "A full IELTS-style Academic Reading mock with three passages, mixed question types, timed answering, and instant scoring.",
    status: "live",
    attemptCount: 14,
    averageBand: "6.7",
  },
];

export const readingTest = {
  id: "test_reading_foundations",
  slug: "reading-foundations",
  title: "Academic Reading Mock 01",
  section: "Reading",
  level: "Academic",
  durationMinutes: 60,
  sections: [
    {
      id: "section_1",
      title: "Passage 1",
      passageTitle: "Cooling the Modern City",
      instructions: "Questions 1-8. Read the passage and answer the questions that follow.",
      passage: [
        "Cities are usually warmer than nearby rural areas, a phenomenon known as the urban heat island effect. Roads, rooftops, and concrete surfaces absorb solar energy during the day and release it slowly at night. As a result, urban neighbourhoods often remain uncomfortably hot long after sunset, especially during extended heatwaves.",
        "The problem is not only physical but social. Residents in low-income districts frequently have less access to shade, fewer trees, and older housing stock with poor ventilation. Public health researchers have found that heat-related illness is more severe where green space is limited and air-conditioning is unreliable or too expensive to run.",
        "To address this, city planners have experimented with reflective roofing materials, tree-planting campaigns, and surfaces that allow rainwater to evaporate gradually. Reflective roofs can reduce indoor temperatures by sending a higher proportion of sunlight back into the atmosphere. Trees, meanwhile, cool streets by providing shade and by releasing water vapour through their leaves.",
        "Yet not every intervention works equally well in every location. A broad avenue with little pedestrian activity may benefit more from engineered materials, while a dense residential block may gain more from additional tree cover and shaded courtyards. This means that successful cooling policies depend on local design rather than on a single universal solution.",
      ],
      questionIds: ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    },
    {
      id: "section_2",
      title: "Passage 2",
      passageTitle: "Recovering History from Shallow Seas",
      instructions: "Questions 9-16. Read the passage and answer the questions that follow.",
      passage: [
        "Marine archaeologists were once associated mainly with dramatic deep-sea expeditions and famous shipwrecks. In recent decades, however, many researchers have shifted their attention to coastal waters, estuaries, and harbours. These shallower environments often contain traces of daily trade, fishing activity, and local transport that are absent from grander historical narratives.",
        "Working in such locations brings advantages. Divers can spend more time at a site, equipment costs are lower, and repeated visits are easier to arrange. Just as importantly, shallow-water sites are often closer to museums, universities, and local communities, making public engagement and student training more practical.",
        "The work is not straightforward. Sediment can move rapidly after storms, visibility may change from one hour to the next, and modern infrastructure such as cables or harbour walls can complicate access. Researchers therefore combine underwater survey methods with historical charts, sonar scans, and increasingly precise digital models to understand what lies beneath the surface.",
        "These digital models are particularly valuable because excavation is irreversible. Once a layer has been disturbed, the original arrangement of objects cannot be restored. By building a detailed virtual record first, teams can test interpretations, compare seasons of fieldwork, and decide whether excavation is necessary at all.",
      ],
      questionIds: ["q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16"],
    },
    {
      id: "section_3",
      title: "Passage 3",
      passageTitle: "Why Apprenticeships Are Being Reimagined",
      instructions: "Questions 17-24. Read the passage and answer the questions that follow.",
      passage: [
        "For much of the twentieth century, apprenticeships were strongly associated with manual trades. A young worker learned by observing an experienced craftsperson, performing routine tasks at first, and gradually taking on more responsibility. The system was demanding, but it offered a clear route into stable employment and occupational identity.",
        "Today, governments and employers are trying to revive the apprenticeship model in sectors ranging from advanced manufacturing to digital design and healthcare administration. They argue that formal education alone cannot always provide the mix of technical knowledge, workplace judgement, and professional habits required by modern organisations.",
        "Critics respond that not all programmes deserve the label. Some apprenticeships offer little structured learning and rely too heavily on repetitive labour. Others are designed so narrowly around one employer's internal systems that participants struggle to transfer their skills elsewhere. In such cases, the programme may satisfy short-term labour needs without delivering long-term career value.",
        "The strongest schemes tend to share several features. They define progression clearly, combine supervised practice with explicit teaching, and assess learners against standards recognised beyond a single company. They also depend on mentors who can explain why a task is performed in a certain way, not merely demonstrate the sequence of steps.",
        "Recent policy debates have therefore focused less on whether apprenticeships should expand and more on how quality should be monitored. Completion rates alone reveal little. A programme can look successful on paper while producing graduates who lack adaptability, confidence, or recognised evidence of competence. Measuring outcomes more carefully may be slower and more expensive, but supporters argue it is essential if apprenticeships are to retain public trust.",
      ],
      questionIds: ["q17", "q18", "q19", "q20", "q21", "q22", "q23", "q24"],
    },
  ],
  questions: [
    {
      id: "q1",
      type: "mcq",
      sectionId: "section_1",
      prompt: "What is the main cause of the urban heat island effect mentioned in the passage?",
      options: [
        "Growing numbers of private vehicles",
        "Heat stored in built surfaces",
        "A shortage of evening rainfall",
        "Excessive use of air-conditioning",
      ],
      correctAnswer: "Heat stored in built surfaces",
      explanation: "The first paragraph explains that roads, rooftops, and concrete absorb energy and release it slowly, which drives the effect.",
    },
    {
      id: "q2",
      type: "fill",
      sectionId: "section_1",
      prompt: "Low-income districts often have fewer trees and less access to _____.",
      correctAnswer: ["shade"],
      explanation: "The second paragraph states that these districts frequently have less access to shade.",
    },
    {
      id: "q3",
      type: "tfng",
      sectionId: "section_1",
      prompt: "Heat-related illness is reported to be worse in areas with limited green space.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "True",
      explanation: "The second paragraph directly links more severe heat-related illness with places where green space is limited.",
    },
    {
      id: "q4",
      type: "short",
      sectionId: "section_1",
      prompt: "Which roofing material strategy helps lower indoor temperatures by reflecting sunlight?",
      correctAnswer: ["reflective roofs", "reflective roofing materials"],
      explanation: "The third paragraph says reflective roofing materials lower indoor temperatures by sending more sunlight back into the atmosphere.",
    },
    {
      id: "q5",
      type: "mcq",
      sectionId: "section_1",
      prompt: "According to the writer, trees cool streets in two ways. One is providing shade. What is the other?",
      options: [
        "They block wind at street level",
        "They absorb sound from traffic",
        "They release water vapour",
        "They lighten the colour of roads",
      ],
      correctAnswer: "They release water vapour",
      explanation: "The passage states that trees cool streets by shade and by releasing water vapour through their leaves.",
    },
    {
      id: "q6",
      type: "fill",
      sectionId: "section_1",
      prompt: "A successful cooling policy depends on local _____ rather than one universal solution.",
      correctAnswer: ["design"],
      explanation: "The final sentence says successful policies depend on local design.",
    },
    {
      id: "q7",
      type: "tfng",
      sectionId: "section_1",
      prompt: "The passage claims that engineered materials are always more effective than adding tree cover.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "False",
      explanation: "The final paragraph says different places benefit from different interventions, so engineered materials are not always better.",
    },
    {
      id: "q8",
      type: "short",
      sectionId: "section_1",
      prompt: "Which type of urban space may benefit more from engineered materials according to the passage?",
      correctAnswer: ["a broad avenue", "broad avenue"],
      explanation: "The passage gives a broad avenue with little pedestrian activity as the example that may benefit more from engineered materials.",
    },
    {
      id: "q9",
      type: "mcq",
      sectionId: "section_2",
      prompt: "Why have many marine archaeologists shifted attention to shallow waters?",
      options: [
        "Deep-sea wrecks have all been fully explored",
        "Shallow sites reveal ordinary historical activity",
        "International law bans work in deeper waters",
        "Tourism agencies fund only coastal research",
      ],
      correctAnswer: "Shallow sites reveal ordinary historical activity",
      explanation: "The first paragraph says coastal sites preserve evidence of trade, fishing, and local transport missing from grander narratives.",
    },
    {
      id: "q10",
      type: "fill",
      sectionId: "section_2",
      prompt: "Shallow-water sites are often closer to museums, universities, and local _____.",
      correctAnswer: ["communities"],
      explanation: "The second paragraph lists local communities along with museums and universities.",
    },
    {
      id: "q11",
      type: "tfng",
      sectionId: "section_2",
      prompt: "Divers can usually spend less time at shallow sites than at deep-sea sites.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "False",
      explanation: "The second paragraph says the opposite: divers can spend more time at shallow-water sites.",
    },
    {
      id: "q12",
      type: "short",
      sectionId: "section_2",
      prompt: "What can change rapidly after storms and affect the site conditions?",
      correctAnswer: ["sediment"],
      explanation: "The third paragraph says sediment can move rapidly after storms.",
    },
    {
      id: "q13",
      type: "mcq",
      sectionId: "section_2",
      prompt: "What is one reason digital models are valuable?",
      options: [
        "They eliminate the need for trained divers",
        "They allow excavation to be reversed later",
        "They help teams evaluate a site before disturbing it",
        "They are legally required in every country",
      ],
      correctAnswer: "They help teams evaluate a site before disturbing it",
      explanation: "The fourth paragraph explains that virtual records let teams test interpretations and decide whether excavation is necessary.",
    },
    {
      id: "q14",
      type: "fill",
      sectionId: "section_2",
      prompt: "Researchers use sonar scans and historical charts alongside precise digital _____.",
      correctAnswer: ["models"],
      explanation: "The third paragraph refers to increasingly precise digital models.",
    },
    {
      id: "q15",
      type: "tfng",
      sectionId: "section_2",
      prompt: "Excavation can be undone if enough virtual data has been recorded first.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "False",
      explanation: "The passage says excavation is irreversible, which is exactly why digital records matter.",
    },
    {
      id: "q16",
      type: "short",
      sectionId: "section_2",
      prompt: "Besides sonar scans, name one modern or historical source researchers combine in order to understand a site.",
      correctAnswer: ["historical charts", "digital models", "precise digital models"],
      explanation: "The third paragraph lists historical charts, sonar scans, and digital models together.",
    },
    {
      id: "q17",
      type: "mcq",
      sectionId: "section_3",
      prompt: "What traditional advantage of apprenticeships does the first paragraph highlight?",
      options: [
        "Immediate university credit",
        "A direct route into stable work",
        "Guaranteed international mobility",
        "Shorter training than any alternative",
      ],
      correctAnswer: "A direct route into stable work",
      explanation: "The first paragraph says apprenticeships offered a clear route into stable employment and occupational identity.",
    },
    {
      id: "q18",
      type: "fill",
      sectionId: "section_3",
      prompt: "Supporters say formal education alone may not provide enough workplace _____ and professional habits.",
      correctAnswer: ["judgement", "judgment"],
      explanation: "The second paragraph uses the phrase workplace judgement.",
    },
    {
      id: "q19",
      type: "tfng",
      sectionId: "section_3",
      prompt: "The writer states that every modern apprenticeship includes substantial structured learning.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "False",
      explanation: "The third paragraph criticises some programmes for offering little structured learning.",
    },
    {
      id: "q20",
      type: "short",
      sectionId: "section_3",
      prompt: "What problem can occur when a programme is built too narrowly around one employer's systems?",
      correctAnswer: [
        "skills are hard to transfer elsewhere",
        "participants struggle to transfer their skills elsewhere",
        "skills cannot be transferred elsewhere",
      ],
      explanation: "The third paragraph says participants may struggle to transfer their skills elsewhere.",
    },
    {
      id: "q21",
      type: "mcq",
      sectionId: "section_3",
      prompt: "According to the passage, strong apprenticeship schemes usually:",
      options: [
        "Avoid formal assessment",
        "Depend mainly on repetition",
        "Use standards recognised beyond one company",
        "Focus only on short-term labour needs",
      ],
      correctAnswer: "Use standards recognised beyond one company",
      explanation: "The fourth paragraph identifies recognised standards beyond a single company as a feature of strong schemes.",
    },
    {
      id: "q22",
      type: "fill",
      sectionId: "section_3",
      prompt: "Good mentors explain why a task is done in a certain way, not just the _____ of steps.",
      correctAnswer: ["sequence"],
      explanation: "The fourth paragraph contrasts explanation with merely demonstrating the sequence of steps.",
    },
    {
      id: "q23",
      type: "tfng",
      sectionId: "section_3",
      prompt: "The passage suggests completion rates are sufficient for judging apprenticeship quality.",
      options: ["True", "False", "Not Given"],
      correctAnswer: "False",
      explanation: "The final paragraph explicitly says completion rates alone reveal little.",
    },
    {
      id: "q24",
      type: "short",
      sectionId: "section_3",
      prompt: "Name one quality that graduates may still lack even if a programme appears successful on paper.",
      correctAnswer: ["adaptability", "confidence", "recognised evidence of competence", "evidence of competence"],
      explanation: "The last paragraph lists adaptability, confidence, and recognised evidence of competence.",
    },
  ],
};

function normalizeAnswer(value) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getAcceptedAnswers(question) {
  if (Array.isArray(question.correctAnswer)) {
    return question.correctAnswer;
  }

  return [question.correctAnswer];
}

function mapReadingBand(correctCount, totalQuestions) {
  const scaledScore = Math.round((correctCount / totalQuestions) * 40);
  const thresholds = [
    { min: 39, band: "9.0" },
    { min: 37, band: "8.5" },
    { min: 35, band: "8.0" },
    { min: 33, band: "7.5" },
    { min: 30, band: "7.0" },
    { min: 27, band: "6.5" },
    { min: 23, band: "6.0" },
    { min: 19, band: "5.5" },
    { min: 15, band: "5.0" },
    { min: 13, band: "4.5" },
    { min: 10, band: "4.0" },
    { min: 8, band: "3.5" },
    { min: 6, band: "3.0" },
    { min: 4, band: "2.5" },
    { min: 2, band: "2.0" },
  ];

  return thresholds.find((threshold) => scaledScore >= threshold.min)?.band || "1.0";
}

function buildCoachNote(correctCount, totalQuestions) {
  const accuracy = correctCount / totalQuestions;

  if (accuracy >= 0.8) {
    return "Strong Reading control. Your next gain will come from eliminating avoidable slips in detail questions and keeping the same accuracy under tighter time pressure.";
  }

  if (accuracy >= 0.6) {
    return "You are in a solid mid-band range. Focus on scanning for exact evidence, especially for True/False/Not Given and short-answer questions where wording shifts can mislead you.";
  }

  if (accuracy >= 0.4) {
    return "Your reading foundation is developing, but accuracy is dropping across multiple question types. Slow down slightly, identify keywords before reading options, and answer from evidence rather than memory.";
  }

  return "This score suggests the passage-detail link is not stable yet. Start with shorter untimed drills, practice paraphrase matching, and build confidence before trying another full timed set.";
}

export function buildResultSummary(answers = {}) {
  const objectiveQuestions = readingTest.questions;
  const reviewed = objectiveQuestions.map((question) => {
    const submitted = answers[question.id] || "";
    const normalizedSubmitted = normalizeAnswer(submitted);
    const acceptedAnswers = getAcceptedAnswers(question);
    const isCorrect = acceptedAnswers.some((answer) => normalizeAnswer(answer) === normalizedSubmitted);

    return {
      id: question.id,
      sectionId: question.sectionId,
      prompt: question.prompt,
      submitted,
      correctAnswer: acceptedAnswers[0],
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = reviewed.filter((item) => item.isCorrect).length;
  const totalObjective = reviewed.length;
  const bandScore = mapReadingBand(correctCount, totalObjective);

  return {
    attemptId: "demo-reading-foundations",
    title: readingTest.title,
    section: readingTest.section,
    correctCount,
    totalObjective,
    bandScore,
    reviewed,
    essayFeedback: buildCoachNote(correctCount, totalObjective),
  };
}
