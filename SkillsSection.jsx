import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// --- Skills Data ---
const skillsData = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    desc: 'Designing AI-powered workflows, intelligent automation and API integrations.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/>
        <path d="M12 8v4l3 3"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    skills: [
      { name: 'Prompt Engineering', icon: <PromptIcon /> },
      { name: 'AI-assisted Dev', icon: <DevIcon /> },
      { name: 'AI Agents', icon: <AgentIcon /> },
      { name: 'Workflow Automation', icon: <WorkflowIcon /> },
      { name: 'n8n', icon: <N8nIcon /> },
      { name: 'Activepieces', icon: <PiecesIcon /> },
      { name: 'REST APIs', icon: <ApiIcon /> },
      { name: 'Webhooks', icon: <WebhookIcon /> },
      { name: 'Google APIs', icon: <GoogleIcon /> }
    ]
  },
  {
    id: 'web-dev',
    title: 'Web Development',
    desc: 'Building modern, responsive, and interactive web applications.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="m9 8 3 3-3 3"/>
        <path d="M15 11h3"/>
      </svg>
    ),
    skills: [
      { name: 'React', icon: <ReactIcon /> },
      { name: 'JavaScript', icon: <JsIcon /> },
      { name: 'HTML5', icon: <HtmlIcon /> },
      { name: 'CSS3', icon: <CssIcon /> },
      { name: 'Responsive Design', icon: <ResponsiveIcon /> },
      { name: 'Component UI', icon: <UiIcon /> }
    ]
  },
  {
    id: 'backend-db',
    title: 'Backend & Database',
    desc: 'Backend business logic, API gateways & secure database management.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
      </svg>
    ),
    skills: [
      { name: 'Python', icon: <PythonIcon /> },
      { name: 'SQL', icon: <SqlIcon /> },
      { name: 'MySQL', icon: <MysqlIcon /> },
      { name: 'Git', icon: <GitIcon /> },
      { name: 'API Integration', icon: <ApiIcon /> }
    ]
  }
];

const professionalSkillsData = {
  title: 'Professional Skills',
  desc: 'Core cognitive, collaborative, and interpersonal assets driving execution quality and team success.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  pills: [
    { name: 'Problem Solving', icon: <PromptIcon /> },
    { name: 'Analytical Thinking', icon: <SearchIcon /> },
    { name: 'Communication', icon: <MessageIcon /> },
    { name: 'Teamwork', icon: <TeamIcon /> },
    { name: 'Adaptability', icon: <WorkflowIcon /> },
    { name: 'Time Management', icon: <ClockIcon /> },
    { name: 'Fast Learner', icon: <FlashIcon /> },
    { name: 'Critical Thinking', icon: <GearIcon /> }
  ]
};

// --- Framer Motion Animations ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const chipContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }
};

// --- Mouse Glow Hook ---
function useMouseGlow(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);
    };
    el.addEventListener('mousemove', handleMouseMove);
    return () => el.removeEventListener('mousemove', handleMouseMove);
  }, [ref]);
}

// --- Components ---

export function SkillChip({ name, icon }) {
  return (
    <motion.div 
      className="skill-chip"
      variants={chipVariants}
      whileHover={{ 
        y: -5, 
        scale: 1.04,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 16px rgba(16, 185, 129, 0.18), inset 0 0 8px rgba(16, 185, 129, 0.05)'
      }}
    >
      <span className="skill-chip-icon">{icon}</span>
      <span className="skill-chip-name">{name}</span>
    </motion.div>
  );
}

export function SkillCategoryCard({ title, desc, icon, skills }) {
  const cardRef = useRef(null);
  useMouseGlow(cardRef);

  return (
    <motion.div 
      ref={cardRef}
      className="skill-category-block"
      variants={cardVariants}
      whileHover={{ y: -8 }}
    >
      {/* Animated glow border */}
      <div className="card-border-sweep" />
      
      <div className="skill-cat-header">
        <div className="skill-cat-icon-wrap">
          {icon}
        </div>
        <div className="skill-cat-header-info">
          <h3 className="skill-cat-title">{title}</h3>
          <p class="skill-cat-desc">{desc}</p>
        </div>
      </div>
      <hr className="skill-card-divider" />
      <motion.div 
        className="skill-chips-grid"
        variants={chipContainerVariants}
      >
        {skills.map((skill, index) => (
          <SkillChip key={index} name={skill.name} icon={skill.icon} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function ProfessionalSkills({ title, desc, icon, pills }) {
  const panelRef = useRef(null);
  useMouseGlow(panelRef);

  return (
    <motion.div 
      ref={panelRef}
      className="professional-skills-block"
      variants={cardVariants}
    >
      <div className="professional-skills-left">
        <div className="professional-skills-icon-wrap">
          {icon}
        </div>
        <div className="professional-skills-info">
          <h3 className="professional-skills-title">{title}</h3>
          <p className="professional-skills-desc">{desc}</p>
        </div>
      </div>
      <div className="professional-skills-right">
        <div className="skill-pills-row">
          {pills.map((pill, index) => (
            <motion.span 
              key={index} 
              className="skill-pill"
              variants={chipVariants}
              whileHover={{ 
                y: -2, 
                scale: 1.04, 
                color: '#00ff87',
                borderColor: 'rgba(16, 185, 129, 0.5)',
                boxShadow: '0 0 18px rgba(16, 185, 129, 0.2)' 
              }}
            >
              {pill.icon}
              {pill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      {/* Ambient background particles & glows */}
      <div className="skills-ambient-glow" />
      <div className="skills-noise-overlay" />
      
      {/* Animated glowing particles */}
      <div className="skills-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`} />
        ))}
      </div>
      
      {/* Floating lines */}
      <div className="skills-floating-lines">
        <div className="floating-line line-1" />
        <div className="floating-line line-2" />
        <div className="floating-line line-3" />
      </div>
      
      {/* Glowing blur blobs */}
      <div className="skills-glow-blob blob-1" />
      <div className="skills-glow-blob blob-2" />

      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Skillset</h2>
          <p className="section-subtitle">
            Technologies and methodologies I use to build AI-powered solutions, modern web apps, and intelligent automation workflows.
          </p>
        </div>

        <motion.div 
          className="skills-categories-grid"
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsData.map((category) => (
            <SkillCategoryCard 
              key={category.id}
              title={category.title}
              desc={category.desc}
              icon={category.icon}
              skills={category.skills}
            />
          ))}
        </motion.div>

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          <ProfessionalSkills 
            title={professionalSkillsData.title}
            desc={professionalSkillsData.desc}
            icon={professionalSkillsData.icon}
            pills={professionalSkillsData.pills}
          />
        </motion.div>
      </div>
    </section>
  );
}

// --- Inline SVGs Helper Components for React ---
function PromptIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
  );
}
function DevIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
    </svg>
  );
}
function AgentIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  );
}
function WorkflowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
    </svg>
  );
}
function N8nIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function PiecesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}
function ApiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 20V10M12 20V4M6 20v-6"/>
    </svg>
  );
}
function WebhookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9M8 17l4 4 4-4"/>
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
    </svg>
  );
}
function ReactIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
    </svg>
  );
}
function JsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function HtmlIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l16 0M4 12l16 0M4 20l16 0"/>
    </svg>
  );
}
function CssIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
    </svg>
  );
}
function ResponsiveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
}
function UiIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/>
    </svg>
  );
}
function PythonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
    </svg>
  );
}
function SqlIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
    </svg>
  );
}
function MysqlIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8M12 8v8"/>
    </svg>
  );
}
function GitIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
function MessageIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function FlashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m13 2-2 2.5h3L12 7"/><path d="M10 14v-3"/><path d="M14 14v-3"/><path d="M11 19H6.93a2 2 0 0 1-1.8-1.1L3 14h18l-2.13 3.9A2 2 0 0 1 17.07 19H16"/><path d="M12 22v-3"/>
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
