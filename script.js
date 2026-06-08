// --- DOM Elements ---
const header = document.querySelector('.header');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const skillProgressBars = document.querySelectorAll('.skill-progress-bar .progress');
const statNums = document.querySelectorAll('.stat-num');
const projectModal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalBodyContent = document.getElementById('modal-body-content');
const toastContainer = document.getElementById('toast-container');

// --- Project Data ---
const projectsData = {
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

// Apply to sections & cards
document.querySelectorAll('section, .skills-category-card, .timeline-item, .project-card, .edu-card, .achievements-card').forEach(el => {
    el.classList.add('fade-in-section');
    animateOnScroll.observe(el);
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

// Ensure initial skill progress widths are read from inline styling during transition
document.querySelectorAll('.skill-progress-bar .progress').forEach(progress => {
    const targetWidth = progress.style.width;
    progress.style.width = '0';
    
    const skillCard = progress.closest('.skills-category-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progress.style.width = targetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    observer.observe(skillCard);
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
