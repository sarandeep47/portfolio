// --- DOM Elements ---
const header = document.querySelector('.header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillProgressBars = []; // Legacy — replaced by chip stagger system
const statNums = document.querySelectorAll('.stat-num');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBodyContent = document.getElementById('modal-body-content');
const toastContainer = document.getElementById('toast-container');

// --- Project Data ---
const projectsData = {
    'ai-interviewer': {
        title: 'AI Interviewer: Mock Screening Suite',
        badge: 'React + FastAPI + Gemini',
        role: 'Full-Stack Developer & AI Architect',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_artificialintelligence-ai-machinelearning-ugcPost-7473755964983115776-56uS/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'An advanced, interactive mock screening application designed to simulate high-fidelity technical interviews using LLMs. It features a React frontend and a FastAPI backend, supporting PDF/Image resume uploads, client-side/backend OCR fallbacks, real-time evaluation, database session management, and synchronized voice interaction (Text-to-Speech & Speech-to-Text).',
        responsibilities: [
            'Engineered a robust React (Vite/TypeScript) client featuring modular glassmorphic design and synchronized voice engine.',
            'Designed a FastAPI backend implementing SQLAlchemy ORM with SQLite database mappings supporting cascade message deletion.',
            'Developed a multi-tier OCR pipeline utilizing native pypdf digital extraction, backend fitz (PyMuPDF) page rendering with pytesseract/PaddleOCR fallbacks, and a client-side Tesseract.js browser runner.',
            'Built a state-aware interview engine utilizing Gemini SDK (gemini-flash-latest) and background threads for asynchronous metadata extraction.',
            'Orchestrated a strict 5-Question flow matching indexed introduction, project probing, core role concepts, engineering practices, and structured feedback collection.',
            'Implemented synchronized Text-to-Speech (speechSynthesis) and Speech-to-Text (SpeechRecognition) timing checks with idle and recording countdown safeguards.'
        ],
        impacts: [
            'Delivered a zero-latency screening simulation enabling real-time candidate evaluations.',
            'Eliminated complex local system dependencies by integrating browser-based Tesseract.js OCR fallbacks.',
            'Successfully processed uploaded PDF/Image resumes to extract structured name, email, skills, and experience tags.'
        ],
        techStack: ['React', 'TypeScript', 'FastAPI', 'Gemini API', 'SQLAlchemy', 'Tesseract.js', 'Speech Recognition', 'Python']
    },
    'news-agent': {
        title: 'Daily AI News Agent',
        badge: 'n8n + Groq AI + WhatsApp',
        role: 'Automation Workflow Engineer',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_ai-automation-n8n-ugcPost-7441790045528858624-v9Qb/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'An automated intelligence pipeline that triggers daily at 9:00 AM to fetch current news, filters articles using advanced JavaScript matching logic, generates strict 3-bullet summaries via Groq AI, and dispatches them to the subscriber via WhatsApp.',
        responsibilities: [
            'Configured a cron-based schedule trigger running at 9:00 AM daily in n8n.',
            'Created an HTTP Request node querying the NewsAPI everything endpoint for articles containing geographical and political markers.',
            'Wrote complex JavaScript filtering logic in n8n to safely parse raw payloads, enforce a 48-hour timestamp filter window, deduplicate matching titles, and apply an active keyword fallback mechanism.',
            'Integrated a Loop Over Items batching system to stream articles sequentially into an AI Agent loop.',
            'Engineered LangChain LLM prompts utilizing Groq\'s Llama-3.3-70b-versatile model to synthesize articles into 3 bullet points answering what happened, who is involved, and why it matters under 30 words per bullet.',
            'Integrated WhatsApp API credentials inside n8n to send the finalized summaries directly to a mobile recipient.'
        ],
        impacts: [
            'Aggregated, parsed, and summarized 50+ daily local articles autonomously.',
            'Eliminated the need to manually browse multiple newspapers, delivering key updates in under 10 seconds.',
            'Provided strict text truncation, deduplication, and parsing safeguards ensuring 100% execution uptime.'
        ],
        techStack: ['n8n', 'JavaScript', 'Groq AI', 'LangChain Agent', 'WhatsApp API', 'NewsAPI']
    },
    'blood-alert': {
        title: 'Automated Blood Emergency Coordinator',
        badge: 'n8n + Google Sheets + SMTP',
        role: 'Workflow Architect',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_n8n-automation-javascript-activity-7420031231074988032-XbTS?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'A critical emergency response system that intercepts hospital blood requests via Google Sheets webhooks, queries donor databases, maps donor groups using a custom compatibility matrix, and drafts/sends structured Gmail alerts in controlled batches.',
        responsibilities: [
            'Implemented Google Sheets polling trigger monitoring patient responses in real-time.',
            'Engineered an IF condition node matching non-processed entries, setting a locking state to prevent duplicate mail execution.',
            'Queried secondary Google Sheets donor registry to gather contact listings.',
            'Wrote custom JavaScript normalization and mapping algorithms conforming to ABO and Rh blood group compatibility matrices (e.g. O- and A- donor compatibility filtering for A- requests).',
            'Configured split batch looping containing an automated 7-second cooldown wait buffer to bypass Gmail SMTP volume restrictions.',
            'Integrated responsive HTML templates containing patient requirements and hospital coordinates directly inside Gmail nodes.'
        ],
        impacts: [
            'Replaced manual registry matching and coordinate routing with zero-latency automation.',
            'Reduced donor notification times from hours to under 2 minutes during medical emergencies.',
            'Ensured safe data updating locks preventing recipients from receiving duplicate alerts.'
        ],
        techStack: ['n8n', 'Google Sheets API', 'Gmail OAuth2', 'JavaScript', 'ABO Compatibility Matrix']
    },
    'mail-agent': {
        title: 'Telegram-Controlled AI Mail Assistant',
        badge: 'n8n + Groq AI + Telegram Bot',
        role: 'Developer & AI Engineer',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_ai-automation-n8n-activity-7437097433869799425-b3cX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'An n8n-powered Telegram assistant bot that receives voice/text commands, uses Groq Llama 3.3 to perform structured JSON entity extraction, retrieves recipient details from spreadsheets, drafts contextual email subjects/bodies, and dispatches them via Gmail.',
        responsibilities: [
            'Created an n8n webhook connection mapping incoming Telegram bot text messages.',
            'Configured a LangChain AI Agent with Groq (Llama-3.3-70b-versatile) and a Structured Output Parser to extract fields (sender, recipient, request_type, reason, duration, urgency, tone) in JSON format.',
            'Wrote JavaScript parsing scripts to standardize JSON fields and query Google Sheets directories for recipient emails matching extracted tags.',
            'Set up an n8n Merge node combining extracted variables with recipient profile contact details.',
            'Configured a drafting AI Agent with custom system rules mapping leave-request templates (sick, casual, WFH) and adjusting message tone (professional, casual, informal) dynamically based on target recipients.',
            'Established secure Gmail API integrations to dispatch formatted email subjects and bodies.'
        ],
        impacts: [
            'Created a mobile hands-free email drafting bot capable of interpreting complex unstructured statements.',
            'Implemented 100% structured data validation parsing using Llama 3.3 JSON schemas.',
            'Simplified workplace messaging, making it possible to draft formal HR requests in 5 seconds on the move.'
        ],
        techStack: ['n8n', 'Telegram Trigger', 'Groq AI', 'Structured JSON', 'Google Sheets API', 'Gmail API']
    },
    'google-reviews': {
        title: 'Autonomous Google Review Reply Manager',
        badge: 'Activepieces + Groq AI',
        role: 'Lead Automation Developer',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_ai-llms-activepieces-ugcPost-7463285336870195200-ZCBN/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'A self-governing customer service workflow designed in Activepieces that captures new Google Maps reviews, analyzes customer sentiment, drafts tailored replies using Groq LLM API, and posts them directly back onto the business page.',
        responsibilities: [
            "Constructed an Activepieces workflow listening to Google My Business triggers.",
            "Configured Google My Business OAuth2 integrations to fetch review payloads in real-time.",
            "Integrated Groq API with Llama models to analyze the incoming feedback sentiment, rating, and user sentiment.",
            "Programmed conditional prompts directing the LLM to draft highly customized, brand-aligned, and supportive responses.",
            "Configured Google My Business Create/Update Response actions to submit replies autonomously.",
            "Established tracking logs to monitor sentiments, response quality, and post success metrics."
        ],
        impacts: [
            "Enabled 24/7 reputation management and response publishing autonomously.",
            "Saved hours of customer relations labor by responding to reviews instantly.",
            "Improved brand search engine rating by increasing average reply rates to 100%."
        ],
        techStack: ['Activepieces', 'Groq API', 'Google Business API', 'JSON', 'Prompt Engineering']
    },
    'skillscope': {
        title: 'SkillScope — AI Resume Scanner',
        badge: 'n8n + Groq AI + JSearch',
        role: 'Full-Stack Workflow Engineer',
        demoLink: 'https://www.linkedin.com/posts/sarandeep-p-s-345b39261_ai-n8n-groq-ugcPost-7455529229879783424-IKhP/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEBrBaUBF_geEoLK1xjuInaLiF4y2mSY554',
        desc: 'An n8n-powered resume screening dashboard that processes candidates\' PDF resume uploads, extracts raw texts, evaluates resume content using custom-prompted LLMs on Groq (Llama 3.3), and returns localized, compatibility-ranked job openings fetched from JSearch API.',
        responsibilities: [
            'Configured an n8n webhook listener parsing multi-part form payloads containing PDF resume uploads and candidate locations.',
            'Implemented an Extract Text node utilizing PDF binary parsing algorithms to extract textual data.',
            'Engineered system prompts for Groq LLMs utilizing Llama-3.3-70b-versatile with strict output structures to score resumes (0-100), generate analytical feedback, and provide suggestions.',
            'Wrote robust JavaScript parsing sandboxes inside n8n to strip markdown block fences, handle raw JSON parsing exceptions, and enforce fail-safes.',
            'Integrated external JSearch REST endpoints via HTTP request nodes passing dynamic search strings based on LLM-derived optimal job titles.',
            'Coded the front-end dashboard featuring PDF drag-and-drop support, location filters, grade badges (S, A, B, C, D, F) with animated progress bars, and localized matching job cards.'
        ],
        impacts: [
            'Created an end-to-end, zero-latency serverless screening portal triggered via webhook calls.',
            'Achieved 100% structured data validation parsing utilizing Llama 3.3 JSON schemas.',
            'Accelerated candidate placement matches by serving active, local job vacancies directly alongside structural resume feedback.'
        ],
        techStack: ['n8n', 'Groq AI', 'JSearch API', 'RapidAPI', 'JavaScript', 'PDF Extraction', 'JSON Schemas']
    }
};

// --- Mobile Navigation ---
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu on nav link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// --- Scroll Effects & Sticky Navbar ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
        header.style.backgroundColor = 'rgba(3, 5, 4, 0.9)';
    } else {
        header.style.boxShadow = 'none';
        header.style.backgroundColor = 'rgba(6, 11, 8, 0.75)';
    }

    // Scrollspy navigation highlight
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 120)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// --- Intersection Observer for Animations ---
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            
            // If it's a progress bar, animate the progress width
            if (entry.target.classList.contains('skills-category-card')) {
                const bars = entry.target.querySelectorAll('.skill-progress-bar .progress');
                bars.forEach(bar => {
                    const widthVal = bar.parentElement.previousElementSibling.querySelector('.skill-level').previousElementSibling ? 
                                     bar.parentElement.previousElementSibling.querySelector('.skill-level').parentElement.nextSibling : null;
                    bar.style.width = bar.style.width; 
                });
            }

            // If it's the stats section, animate stats counters
            if (entry.target.classList.contains('stats-section')) {
                statNums.forEach(num => {
                    const target = parseInt(num.getAttribute('data-val'));
                    animateCounter(num, target);
                });
            }
        }
    });
}, { threshold: 0.15 });

// Apply to sections & cards (exclude .skill-category-block — handled by stagger observer)
document.querySelectorAll('section, .timeline-item, .project-card, .edu-card, .achievements-card').forEach(el => {
    el.classList.add('fade-in-section');
    animateOnScroll.observe(el);
});

// --- Skills Section Data & Dynamic Component Rendering ---
const skillsData = [
    {
        title: 'AI & Automation',
        desc: 'AI workflows, intelligent automation & API integrations',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l3 3"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        skills: [
            { name: 'Prompt Engineering', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>` },
            { name: 'AI-assisted Dev', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>` },
            { name: 'AI Agents', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>` },
            { name: 'Workflow Automation', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>` },
            { name: 'n8n', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>` },
            { name: 'Activepieces', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` },
            { name: 'REST APIs', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>` },
            { name: 'Webhooks', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9M8 17l4 4 4-4"/></svg>` },
            { name: 'Google APIs', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>` }
        ]
    },
    {
        title: 'Web Development',
        desc: 'Building modern, responsive web applications',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="m9 8 3 3-3 3"/><path d="M15 11h3"/></svg>`,
        skills: [
            { name: 'React', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>` },
            { name: 'JavaScript', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` },
            { name: 'HTML5', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 0M4 12l16 0M4 20l16 0"/></svg>` },
            { name: 'CSS3', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>` },
            { name: 'Responsive Design', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>` },
            { name: 'Component UI', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/></svg>` }
        ]
    },
    {
        title: 'Backend & Database',
        desc: 'Backend logic, APIs & database management',
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
        skills: [
            { name: 'Python', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>` },
            { name: 'SQL', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>` },
            { name: 'MySQL', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/></svg>` },
            { name: 'Git', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>` },
            { name: 'API Integration', icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>` }
        ]
    }
];

const professionalSkillsData = {
    title: 'Professional Skills',
    desc: 'Core cognitive and collaborative soft skills that drive project delivery and execution.',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    pills: [
        { name: 'Problem Solving', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>` },
        { name: 'Analytical Thinking', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>` },
        { name: 'Communication', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
        { name: 'Teamwork', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>` },
        { name: 'Adaptability', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>` },
        { name: 'Time Management', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>` },
        { name: 'Fast Learner', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v-3"/><path d="M14 14v-3"/><path d="M11 19H6.93a2 2 0 0 1-1.8-1.1L3 14h18l-2.13 3.9A2 2 0 0 1 17.07 19H16"/><path d="M12 22v-3"/></svg>` },
        { name: 'Critical Thinking', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>` }
    ]
};

function renderSkillsSection() {
    const gridContainer = document.getElementById('skills-grid-container');
    const profContainer = document.getElementById('professional-skills-container');
    
    if (!gridContainer || !profContainer) return;
    
    // Render Technical Skills Cards
    gridContainer.innerHTML = skillsData.map((category) => {
        const chipsHTML = category.skills.map(skill => `
            <div class="skill-chip" data-stagger-child>
                <span class="skill-chip-icon">${skill.icon}</span>
                <span class="skill-chip-name">${skill.name}</span>
            </div>
        `).join('');
        
        return `
            <div class="skill-category-block" data-stagger-parent>
                <div class="card-border-sweep"></div>
                <div class="skill-cat-header">
                    <div class="skill-cat-icon-wrap">${category.icon}</div>
                    <div class="skill-cat-header-info">
                        <h3 class="skill-cat-title">${category.title}</h3>
                        <p class="skill-cat-desc">${category.desc}</p>
                    </div>
                </div>
                <hr class="skill-card-divider" />
                <div class="skill-chips-grid">
                    ${chipsHTML}
                </div>
            </div>
        `;
    }).join('');
    
    // Render Professional Skills Panel
    const pillsHTML = professionalSkillsData.pills.map(pill => `
        <span class="skill-pill" data-stagger-child>
            ${pill.icon}
            ${pill.name}
        </span>
    `).join('');
    
    profContainer.innerHTML = `
        <div class="professional-skills-block" data-stagger-parent>
            <div class="card-border-sweep"></div>
            <div class="professional-skills-left">
                <div class="professional-skills-icon-wrap">${professionalSkillsData.icon}</div>
                <div class="professional-skills-info">
                    <h3 class="professional-skills-title">${professionalSkillsData.title}</h3>
                    <p class="professional-skills-desc">${professionalSkillsData.desc}</p>
                </div>
            </div>
            <div class="professional-skills-right">
                <div class="skill-pills-row">
                    ${pillsHTML}
                </div>
            </div>
        </div>
    `;
}

// Mouse Follow Glow Effect
function initSkillsMouseGlow() {
    const blocks = document.querySelectorAll('.skill-category-block, .professional-skills-block');
    blocks.forEach(block => {
        block.addEventListener('mousemove', e => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            block.style.setProperty('--mouse-x', `${x}px`);
            block.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Dynamic Particle Generation
function initSkillsParticles() {
    const container = document.getElementById('skills-particles');
    if (!container) return;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = `particle particle-${i}`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.setProperty('--delay', `${Math.random() * 8}s`);
        particle.style.setProperty('--duration', `${6 + Math.random() * 10}s`);
        particle.style.setProperty('--x', `${-30 + Math.random() * 60}px`);
        particle.style.setProperty('--y', `${-40 - Math.random() * 80}px`);
        container.appendChild(particle);
    }
}

// Initialize Skills section on DOM load
renderSkillsSection();
initSkillsMouseGlow();
initSkillsParticles();

// --- Skills Stagger Animation (chip-cards & pills) ---
const skillStaggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const parent = entry.target;
            parent.classList.add('is-visible');

            // Stagger each child chip/pill inside this category block
            const children = parent.querySelectorAll('[data-stagger-child]');
            children.forEach((child, i) => {
                setTimeout(() => {
                    child.classList.add('is-visible');
                }, 80 + i * 55);
            });

            skillStaggerObserver.unobserve(parent);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-stagger-parent]').forEach(block => {
    skillStaggerObserver.observe(block);
});

// Counter Animation Logic
function animateCounter(element, target) {
    let count = 0;
    const duration = 1200; // ms
    const speed = Math.ceil(target / (duration / 16)); // ~60fps
    
    element.innerText = count;

    const timer = setInterval(() => {
        count += speed;
        if (count >= target) {
            clearInterval(timer);
            element.innerText = target + (element.innerText.includes('%') || element.getAttribute('data-val') === '100' || element.getAttribute('data-val') === '90' ? '%' : '+');
        } else {
            element.innerText = count + (element.getAttribute('data-val') === '100' || element.getAttribute('data-val') === '90' ? '%' : '+');
        }
    }, 16);
}

// Chip tilt on mousemove (subtle 3D feel)
document.querySelectorAll('.skill-chip').forEach(chip => {
    chip.addEventListener('mousemove', (e) => {
        const rect = chip.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        chip.style.transform = `translateY(-3px) scale(1.02) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
    });
    chip.addEventListener('mouseleave', () => {
        chip.style.transform = '';
    });
});


// --- Project Details Modal Logic ---
document.querySelectorAll('.btn-card-details').forEach(btn => {
    btn.addEventListener('click', () => {
        const projId = btn.getAttribute('data-project');
        const data = projectsData[projId];
        
        if (data) {
            // Compile Tech Stack HTML
            const techHTML = data.techStack.map(t => `<span class="tag">${t}</span>`).join('');
            
            // Compile Responsibilities HTML
            const respHTML = data.responsibilities.map(r => `<li>${r}</li>`).join('');
            
            // Compile Impacts HTML
            const impactHTML = data.impacts.map(i => `<li>${i}</li>`).join('');
            
            // Inject to Modal body
            modalBodyContent.innerHTML = `
                <div class="modal-header-section">
                    <span class="modal-project-badge">${data.badge}</span>
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-sub-header">
                        <span class="modal-project-role">Role: ${data.role}</span>
                        ${data.demoLink ? `
                        <a href="${data.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-card-demo">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            <span>Watch Demo</span>
                        </a>` : ''}
                    </div>
                </div>
                
                <div class="modal-body-section">
                    <h4>Description</h4>
                    <p>${data.desc}</p>
                </div>
                
                <div class="modal-body-section">
                    <h4>Core Technologies Used</h4>
                    <div class="project-tags">${techHTML}</div>
                </div>

                <div class="modal-body-section">
                    <h4>Responsibilities & Architecture</h4>
                    <ul class="modal-list">${respHTML}</ul>
                </div>

                <div class="modal-body-section">
                    <h4>Impact & Results</h4>
                    <ul class="modal-list modal-impact-list">${impactHTML}</ul>
                </div>
            `;
            
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        }
    });
});

// Close Modal
function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Release background scroll
}

if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeModal();
    }
});


// --- Clipboard Copy Logic ---
document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
        // If clicking a link directly, let's copy text, but don't prevent navigation unless it is a button
        const copyText = el.getAttribute('data-copy');
        navigator.clipboard.writeText(copyText).then(() => {
            showToast('Information copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg class="toast-success-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

// --- Experience Modal Logic ---
const experienceData = {
    'tarcin': {
        company: 'Tarcin Robotics',
        role: 'AI OPS Intern',
        type: 'Internship',
        period: 'September 2025 – May 2026',
        summary: 'Worked at the intersection of AI, machine learning, and workflow automation — building intelligent systems and integrating machine learning models into production-level automation pipelines.',
        responsibilities: [
            'Developed AI-powered workflow automation solutions using n8n and internal tools, reducing manual intervention across key operational processes.',
            'Applied machine learning techniques to classify, route, and process incoming data — combining model logic with LLM prompts for hybrid decision-making.',
            'Built and integrated AI features into web applications and internal systems, including AI-assisted data review and real-time alert mechanisms.',
            'Integrated REST APIs and webhook-driven automation workflows for seamless data processing and inter-system business operations.',
            'Automated repetitive tasks through Python scripting, workflow orchestration, and multi-step system integrations.',
            'Designed ML-assisted pipelines to pre-filter and validate data before passing it to AI/LLM nodes — improving accuracy and reducing token cost.',
            'Collaborated with development teams to deploy, test, and optimize AI-enabled applications in staging and production environments.'
        ],
        impacts: [
            'Reduced manual data processing time significantly by automating multi-step classification workflows.',
            'Combined machine learning logic with LLM chains to achieve higher precision in automated decision flows.',
            'Built reusable automation templates adopted across multiple internal departments.',
            'Contributed to a production-level AI integration that handled real-time business data end-to-end.'
        ],
        techStack: ['n8n', 'Python', 'REST APIs', 'Webhooks', 'LLMs (Groq)', 'Machine Learning', 'AI Agents', 'Workflow Automation', 'JavaScript'],
        certLink: 'https://drive.google.com/drive/folders/1g3HMKSUmVpMgJs49gTXD1t6Hlra0pCbO?usp=drive_link'
    }
};

const expModal = document.getElementById('exp-modal');
const expModalBody = document.getElementById('exp-modal-body');
const expModalClose = document.getElementById('exp-modal-close');

function openExpModal(id) {
    const data = experienceData[id];
    if (!data) return;

    const respHTML = data.responsibilities.map(r => `<li>${r}</li>`).join('');
    const impactHTML = data.impacts ? data.impacts.map(i => `<li>${i}</li>`).join('') : '';
    const techHTML = data.techStack.map(t => `<span class="tag">${t}</span>`).join('');

    expModalBody.innerHTML = `
        <div class="modal-header-section">
            <span class="modal-project-badge">${data.type} &nbsp;·&nbsp; ${data.period}</span>
            <h3 class="modal-project-title">${data.role}</h3>
            <div class="modal-sub-header">
                <span class="modal-project-role">${data.company}</span>
                ${data.certLink ? `
                <a href="${data.certLink}" target="_blank" rel="noopener noreferrer" class="btn btn-card-demo" style="background-color: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25); color: var(--accent-primary); box-shadow: none;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    <span>View Certificate</span>
                </a>` : ''}
            </div>
        </div>

        ${data.summary ? `<div class="modal-body-section"><p>${data.summary}</p></div>` : ''}

        <div class="modal-body-section">
            <h4>Key Responsibilities</h4>
            <ul class="modal-list">${respHTML}</ul>
        </div>

        ${impactHTML ? `
        <div class="modal-body-section">
            <h4>Impact &amp; Outcomes</h4>
            <ul class="modal-list modal-impact-list">${impactHTML}</ul>
        </div>` : ''}

        <div class="modal-body-section">
            <h4>Technologies Used</h4>
            <div class="project-tags">${techHTML}</div>
        </div>
    `;

    expModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeExpModal() {
    expModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Wire up all exp cards
document.querySelectorAll('.exp-card').forEach(card => {
    card.addEventListener('click', () => openExpModal(card.getAttribute('data-exp')));
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openExpModal(card.getAttribute('data-exp'));
        }
    });
});

if (expModalClose) expModalClose.addEventListener('click', closeExpModal);

window.addEventListener('click', e => {
    if (e.target === expModal) closeExpModal();
});

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && expModal && expModal.classList.contains('active')) {
        closeExpModal();
    }
});
