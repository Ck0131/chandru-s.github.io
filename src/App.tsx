import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Award, BookOpen,
  GraduationCap, Briefcase, ChevronDown, Database, BarChart3, Code,
  Shield, Zap, Layers, Cpu, Globe, TrendingUp, PieChart, FileSpreadsheet,
  Lock, Server, Cloud, Workflow, Brain, Monitor
} from 'lucide-react';

/* ───────────────────────────────────────────────────────────────
   GLOBAL STYLES
   ─────────────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    .hero-heading {
      background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-heading-dark {
      background: linear-gradient(180deg, #0C0C0C 0%, #4a4a4a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0C0C0C; }
    ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #555; }
  `}</style>
);

/* ───────────────────────────────────────────────────────────────
   REUSABLE COMPONENTS
   ─────────────────────────────────────────────────────────────── */

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '50px', amount: 0 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Magnet = ({ children, padding = 150, strength = 3, className = '' }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDist = Math.max(rect.width, rect.height) / 2 + padding;

    if (distance < maxDist) {
      setIsActive(true);
      setPosition({ x: distX / strength, y: distY / strength });
    } else {
      setIsActive(false);
      setPosition({ x: 0, y: 0 });
    }
  }, [padding, strength]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

const ContactButton = ({ className = '' }: { className?: string }) => (
  <a
    href="mailto:chandrus0131@gmail.com"
    className={`inline-flex items-center justify-center rounded-full font-medium uppercase tracking-widest text-white transition-transform hover:scale-105 ${className}`}
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset, 0 0 0 2px white, 0 0 0 5px transparent',
      padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem)',
      fontSize: 'clamp(0.65rem, 1.2vw, 1rem)',
    }}
  >
    <Mail className="w-4 h-4 mr-2" />
    Contact Me
  </a>
);

const LiveProjectButton = ({ href, className = '' }: { href: string; className?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-all hover:bg-[#D7E2EA]/10 ${className}`}
    style={{
      padding: 'clamp(0.6rem, 1.5vw, 0.875rem) clamp(1.25rem, 2.5vw, 2rem)',
      fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
    }}
  >
    <ExternalLink className="w-4 h-4 mr-2" />
    View Project
  </a>
);

const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');

  return (
    <p ref={ref} className={className} style={{ textAlign: 'center' }}>
      {characters.map((char, i) => (
        <Character key={i} progress={scrollYProgress} index={i} total={characters.length} char={char} />
      ))}
    </p>
  );
};

const Character = ({ progress, index, total, char }: any) => {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.2, 1]
  );

  return (
    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre' }}>
      <span style={{ opacity: 0.2 }}>{char}</span>
      <motion.span 
        style={{ 
          opacity, 
          position: 'absolute', 
          left: 0, 
          top: 0,
          display: 'inline-block'
        }}
      >
        {char}
      </motion.span>
    </span>
  );
};

/* ───────────────────────────────────────────────────────────────
   HERO SECTION
   ─────────────────────────────────────────────────────────────── */

const HeroSection = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the motion using springs
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Map mouse coordinates to image translations (parallax shift direction)
  const faceX = useTransform(smoothX, [-1, 1], [15, -15]);
  const faceY = useTransform(smoothY, [-1, 1], [15, -15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinate offset relative to viewport center (-1 to 1)
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen flex flex-col overflow-x-clip" style={{ background: '#0C0C0C' }}>
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider transition-opacity duration-200 hover:opacity-70"
              style={{ fontSize: 'clamp(0.75rem, 1.5vw, 1.4rem)' }}
            >
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="overflow-hidden w-full mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center"
            style={{ fontSize: 'clamp(3.5rem, 14vw, 17.5vw)' }}
          >
            Hi, i&apos;m chandru
          </h1>
        </FadeIn>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="pointer-events-auto">
          <FadeIn delay={0.6} y={30}>
            <Magnet padding={150} strength={3}>
              <div className="relative">
                <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
                  {/* 3D Logo Ring Effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-[#B600A8]/20 animate-pulse" />
                  <div className="absolute -inset-4 rounded-full border-2 border-[#7621B0]/15" />
                  <div className="absolute -inset-8 rounded-full border border-[#B600A8]/10" />

                  {/* Main Photo Container */}
                  <div className="relative aspect-square rounded-full overflow-hidden border-4 border-[#B600A8]/40 shadow-[0_0_80px_rgba(182,0,168,0.3),0_0_120px_rgba(118,33,176,0.15)]">
                    <motion.img
                      src="./chandru-photo.jpg"
                      alt="Chandru S - Power BI Developer"
                      className="w-full h-full object-cover"
                      style={{
                        scale: 1.25,
                        objectPosition: '55% 15%',
                        x: faceX,
                        y: faceY,
                      }}
                      loading="lazy"
                    />
                    {/* Gradient overlay for 3D effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#B600A8]/10 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* 3D Floating Badge */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#18011F] via-[#B600A8] to-[#7621B0] rounded-full px-6 py-2 shadow-[0_4px_20px_rgba(182,0,168,0.4)] border border-white/20">
                    <span className="text-white text-sm font-bold uppercase tracking-widest">PL-300 Certified</span>
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#0C0C0C]/90 backdrop-blur-sm border border-[#B600A8]/30 rounded-full px-6 py-2">
                  <span className="text-[#D7E2EA] text-sm font-medium uppercase tracking-widest">PL-300 Certified</span>
                </div>
              </div>
            </Magnet>
          </FadeIn>
        </div>
      </div>

      <div className="mt-auto flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug"
            style={{
              fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)',
              maxWidth: 'clamp(160px, 18vw, 260px)',
            }}
          >
            a power bi developer & data analyst crafting data-driven business solutions
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#D7E2EA]/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   MARQUEE SECTION
   ─────────────────────────────────────────────────────────────── */

const techIcons = [
  { name: 'Power BI', icon: BarChart3, color: '#F2C811' },
  { name: 'DAX', icon: Code, color: '#D83B01' },
  { name: 'SQL Server', icon: Database, color: '#A91D22' },
  { name: 'Python', icon: Brain, color: '#3776AB' },
  { name: 'Microsoft Fabric', icon: Layers, color: '#00A4EF' },
  { name: 'Power Query', icon: Workflow, color: '#217346' },
  { name: 'Data Modeling', icon: Server, color: '#7FBA00' },
  { name: 'RLS', icon: Lock, color: '#FFB900' },
  { name: 'Azure', icon: Cloud, color: '#0078D4' },
  { name: 'Excel', icon: FileSpreadsheet, color: '#217346' },
  { name: 'Machine Learning', icon: Cpu, color: '#FF6F00' },
  { name: 'Dashboards', icon: Monitor, color: '#00BCF2' },
  { name: 'KPIs', icon: TrendingUp, color: '#E3008C' },
  { name: 'ETL', icon: Zap, color: '#FF4081' },
  { name: 'Analytics', icon: PieChart, color: '#00E676' },
  { name: 'Visualization', icon: Globe, color: '#651FFF' },
  { name: 'Pandas', icon: Shield, color: '#150458' },
  { name: 'NumPy', icon: BookOpen, color: '#4D77CF' },
  { name: 'GitHub', icon: Code, color: '#FFFFFF' },
  { name: 'OneLake', icon: Cloud, color: '#00A4EF' },
  { name: 'MySQL', icon: Database, color: '#4479A1' },
];

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(scrollOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1 = techIcons.slice(0, 11);
  const row2 = techIcons.slice(11);
  const tripleRow1 = [...row1, ...row1, ...row1];
  const tripleRow2 = [...row2, ...row2, ...row2];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0C0C0C', paddingTop: 'clamp(6rem, 8vw, 10rem)', paddingBottom: '2.5rem' }}
    >
      <div className="mb-8 text-center">
        <span className="text-[#D7E2EA]/40 text-sm uppercase tracking-[0.3em]">Tech Stack & Tools</span>
      </div>

      <div
        className="flex gap-3 mb-3"
        style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}
      >
        {tripleRow1.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`r1-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#D7E2EA]/10 bg-[#111]/50 backdrop-blur-sm"
              style={{ minWidth: '220px' }}
            >
              <Icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-[#D7E2EA] font-medium text-sm uppercase tracking-wide">{tech.name}</span>
            </div>
          );
        })}
      </div>

      <div
        className="flex gap-3"
        style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}
      >
        {tripleRow2.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`r2-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl border border-[#D7E2EA]/10 bg-[#111]/50 backdrop-blur-sm"
              style={{ minWidth: '220px' }}
            >
              <Icon className="w-8 h-8" style={{ color: tech.color }} />
              <span className="text-[#D7E2EA] font-medium text-sm uppercase tracking-wide">{tech.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   ABOUT SECTION
   ─────────────────────────────────────────────────────────────── */

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative Images - positioned with pointer-events-none to not interfere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FadeIn delay={0.1} x={-80} duration={0.9}>
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=300&fit=crop"
            alt="Data Visualization"
            className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[80px] sm:w-[120px] md:w-[160px] rounded-2xl opacity-40 hover:opacity-70 transition-opacity pointer-events-auto"
            loading="lazy"
          />
        </FadeIn>

        <FadeIn delay={0.25} x={-80} duration={0.9}>
          <img
            src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=300&h=300&fit=crop"
            alt="Analytics Dashboard"
            className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[70px] sm:w-[100px] md:w-[140px] rounded-2xl opacity-40 hover:opacity-70 transition-opacity pointer-events-auto"
            loading="lazy"
          />
        </FadeIn>

        <FadeIn delay={0.15} x={80} duration={0.9}>
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop"
            alt="Business Intelligence"
            className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[80px] sm:w-[120px] md:w-[160px] rounded-2xl opacity-40 hover:opacity-70 transition-opacity pointer-events-auto"
            loading="lazy"
          />
        </FadeIn>

        <FadeIn delay={0.3} x={80} duration={0.9}>
          <img
            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&h=300&fit=crop"
            alt="Data Science"
            className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[90px] sm:w-[130px] md:w-[170px] rounded-2xl opacity-40 hover:opacity-70 transition-opacity pointer-events-auto"
            loading="lazy"
          />
        </FadeIn>
      </div>

      {/* Content - centered with proper z-index */}
      <div className="relative z-10 flex flex-col items-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-10 sm:mb-14 md:mb-16"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="max-w-[600px] w-full mx-auto text-center mb-16 sm:mb-20 md:mb-24 px-4 sm:px-6">
          <AnimatedText
            text="With more than two years of experience in business intelligence, I focus on Power BI development, data modeling, DAX optimization, and interactive dashboard design. I truly enjoy working with businesses that aim to stand out and present their best data-driven image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed text-center"
          />
        </div>

        <FadeIn delay={0.2} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   SKILLS SECTION
   ─────────────────────────────────────────────────────────────── */

const skillsData = [
  {
    number: '01',
    name: 'Power BI Development',
    description: 'Expert in Power BI Desktop & Service, building interactive dashboards, paginated reports, and real-time analytics with advanced visualizations and custom themes.',
    icon: BarChart3,
  },
  {
    number: '02',
    name: 'DAX & Data Modeling',
    description: 'Advanced DAX formulas, calculated measures, star schema design, and optimized data models that improve query performance by 30% or more.',
    icon: Database,
  },
  {
    number: '03',
    name: 'ETL & Power Query',
    description: 'Complex data transformation pipelines using Power Query (M Language), handling data cleaning, merging, and shaping for enterprise-scale reporting.',
    icon: Workflow,
  },
  {
    number: '04',
    name: 'SQL & Databases',
    description: 'Proficient in SQL Server, MySQL, and OneLake queries. Writing optimized stored procedures, views, and complex joins for BI solutions.',
    icon: Server,
  },
  {
    number: '05',
    name: 'Python & Analytics',
    description: 'Data analysis with Pandas, NumPy, and Matplotlib. Statistical analysis, trend identification, and machine learning integration for predictive insights.',
    icon: Brain,
  },
];

const SkillsSection = () => {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading-dark font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto w-full">
        {skillsData.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <FadeIn key={skill.number} delay={i * 0.1} y={30}>
              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 py-8 sm:py-10 md:py-12"
                style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="font-black text-[#0C0C0C]"
                    style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
                  >
                    {skill.number}
                  </span>
                  <Icon className="w-8 h-8 text-[#0C0C0C]/40 sm:hidden" />
                </div>
                <div className="flex-1">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] mb-2"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {skill.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed text-[#0C0C0C] max-w-2xl"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                  >
                    {skill.description}
                  </p>
                </div>
                <Icon className="w-10 h-10 text-[#0C0C0C]/20 hidden sm:block flex-shrink-0" />
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   EXPERIENCE SECTION
   ─────────────────────────────────────────────────────────────── */

const experienceData = [
  {
    period: 'Sep 2024 – Present',
    role: 'Power BI Trainer',
    company: 'G-Tec Academy, Coimbatore',
    description: 'Delivered hands-on Power BI training to 50+ professionals and students. Developed customized course content covering data modeling, DAX functions, Power Query, and dashboard design best practices. Mentored learners in DAX optimization techniques, reducing report query times and boosting dashboard performance.',
    tags: ['Power BI', 'DAX', 'Training', 'Mentoring'],
    icon: Briefcase,
  },
  {
    period: 'Jun 2024 – Aug 2025',
    role: 'Data Analyst (Freelance)',
    company: 'The Institute of Advanced Computing',
    description: 'Designed and deployed 10+ interactive Power BI dashboards enabling real-time reporting. Performed data cleaning and transformation using Power Query and DAX, maintaining 99%+ data integrity. Built star schema data models improving report load speed by 30%. Conducted statistical analysis supporting marketing strategy optimization.',
    tags: ['Dashboards', 'SQL', 'Star Schema', 'Analytics'],
    icon: BarChart3,
  },
  {
    period: 'Apr 2023 – Aug 2023',
    role: 'Data Analyst Intern',
    company: 'Muniss Research Foundation, Chennai',
    description: 'Analyzed large datasets using Python (Pandas) and SQL to extract business insights for research publications. Created visualizations and summary reports supporting data-driven research decisions.',
    tags: ['Python', 'SQL', 'Research', 'Visualization'],
    icon: BookOpen,
  },
];

const ExperienceSection = () => {
  return (
    <section
      className="relative flex flex-col items-center"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto w-full space-y-8">
        {experienceData.map((exp, i) => {
          const Icon = exp.icon;
          return (
            <FadeIn key={i} delay={i * 0.15} y={30}>
              <div className="group relative border border-[#D7E2EA]/10 rounded-[30px] p-6 sm:p-8 md:p-10 bg-[#111]/30 backdrop-blur-sm hover:border-[#B600A8]/30 transition-all duration-500">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B600A8]/20 to-[#7621B0]/20 flex items-center justify-center border border-[#B600A8]/20">
                      <Icon className="w-7 h-7 text-[#B600A8]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                      <span className="text-[#B600A8] text-sm font-medium uppercase tracking-widest">{exp.period}</span>
                      <span className="hidden sm:block text-[#D7E2EA]/20">|</span>
                      <span className="text-[#D7E2EA]/60 text-sm">{exp.company}</span>
                    </div>
                    <h3 className="text-[#D7E2EA] text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">
                      {exp.role}
                    </h3>
                    <p className="text-[#D7E2EA]/60 font-light leading-relaxed mb-6" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                      {exp.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/70 text-xs uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   PROJECTS SECTION
   ─────────────────────────────────────────────────────────────── */

const projectsData = [
  {
    number: '01',
    category: 'Client Project',
    name: 'Supply Chain Analytics',
    description: 'Comprehensive Power BI dashboard analyzing supply chain data to identify bottlenecks, optimize inventory, and improve logistics efficiency with interactive visualizations.',
    tags: ['Power BI', 'DAX', 'Power Query', 'SQL'],
    images: {
      col1: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=500&fit=crop',
      ],
      col2: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=700&fit=crop',
    },
    href: 'https://github.com/Ck0131/Supply-Chain-Analysis',
  },
  {
    number: '02',
    category: 'Personal Project',
    name: 'Bank Churn Analysis',
    description: 'Predictive analytics dashboard for customer churn in banking, featuring key metrics, trend analysis, and actionable insights to reduce customer attrition using machine learning.',
    tags: ['Power BI', 'DAX', 'Data Modeling', 'Python'],
    images: {
      col1: [
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop',
      ],
      col2: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=700&fit=crop',
    },
    href: 'https://github.com/Ck0131/bank-churn-analysis',
  },
  {
    number: '03',
    category: 'Client Project',
    name: 'Financial Analytics Platform',
    description: 'Developed a financial reporting solution for The Institute of Advanced Computing, automating data pipelines and reducing monthly reporting time by 60% with real-time KPI tracking.',
    tags: ['Power BI', 'SQL Server', 'Power Query', 'Microsoft Fabric'],
    images: {
      col1: [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=500&fit=crop',
      ],
      col2: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=700&fit=crop',
    },
    href: '#',
  },
];

const ProjectCard = ({ project, index, totalCards }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return (
    <div ref={cardRef} className="h-[85vh] sticky" style={{ top: `${index * 28}px` }}>
      <motion.div
        className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA]/20 p-4 sm:p-6 md:p-8 flex flex-col"
        style={{ scale, opacity, background: 'linear-gradient(145deg, #0C0C0C 0%, #111 100%)' }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA]/20"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <div>
              <span className="text-[#B600A8] text-xs uppercase tracking-[0.2em] font-medium block mb-1">
                {project.category}
              </span>
              <h3 className="text-[#D7E2EA] text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.href} />
        </div>

        <p className="text-[#D7E2EA]/60 font-light leading-relaxed mb-6 max-w-2xl" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-[#D7E2EA]/15 text-[#D7E2EA]/60 text-xs uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex-1 flex gap-3 sm:gap-4 min-h-0">
          <div className="flex flex-col gap-3 sm:gap-4 w-[40%]">
            <div className="rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden flex-shrink-0" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
              <img src={project.images.col1[0]} alt={`${project.name} preview 1`} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden flex-1" style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}>
              <img src={project.images.col1[1]} alt={`${project.name} preview 2`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="w-[60%] rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden">
            <img src={project.images.col2} alt={`${project.name} main preview`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative flex flex-col items-center"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="relative w-full max-w-6xl mx-auto">
        {projectsData.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} totalCards={projectsData.length} />
        ))}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   CERTIFICATIONS SECTION
   ─────────────────────────────────────────────────────────────── */

const certifications = [
  {
    title: 'Microsoft PL-300',
    subtitle: 'Power BI Data Analyst Associate',
    description: 'Validates expertise in designing and building scalable data models, cleaning and transforming data, and enabling advanced analytics capabilities with Power BI.',
    icon: Award,
    color: '#00A4EF',
    href: 'https://learn.microsoft.com/en-in/users/chandrus-5203/credentials/513862a7377032b2?ref=https%3A%2F%2Fwww.linkedin.com%2F',
  },
  {
    title: 'Coursera Professional',
    subtitle: 'Microsoft Power BI Data Analyst',
    description: 'Comprehensive certification covering end-to-end BI workflows from data preparation to dashboard deployment and sharing.',
    icon: GraduationCap,
    color: '#2B7A3E',
    href: 'https://www.credly.com/badges/a7d282bd-256e-4577-999e-c2ebafe1e13f/linked_in_profile',
  },
  {
    title: 'AWS Cloud Foundations',
    subtitle: 'AWS Certified',
    description: 'Foundational knowledge of AWS cloud services, architecture, and best practices for cloud-based data solutions.',
    icon: Cloud,
    color: '#FF9900',
    href: 'https://www.credly.com/badges/0c162f78-8d8e-439f-b93a-3dad80d4abf1/linked_in_profile',
  },
  {
    title: 'Introduction to Cyber Security',
    subtitle: 'Cisco Certified',
    description: 'Introduction to cybersecurity principles, threat landscape, and defensive strategies for data protection.',
    icon: Shield,
    color: '#049FD9',
    href: 'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_3388902307073574000_shared/1-c64e8fad-eea1-4eba-bad2-cf5b2278ffc7.pdf',
  },
];

const CertificationsSection = () => {
  return (
    <section
      className="relative flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading-dark font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Certs
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {certifications.map((cert, i) => {
          const Icon = cert.icon;
          return (
            <FadeIn key={i} delay={i * 0.1} y={30}>
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative border border-[#0C0C0C]/10 rounded-[30px] p-6 sm:p-8 bg-[#FAFAFA] hover:bg-[#0C0C0C] hover:border-[#0C0C0C] transition-all duration-500 cursor-pointer h-full"
              >
                {/* External Link Indicator Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                  <ExternalLink className="w-5 h-5 text-[#0C0C0C]/40 group-hover:text-white" />
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${cert.color}15` }}>
                    <Icon className="w-6 h-6" style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h3 className="text-[#0C0C0C] group-hover:text-white text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors">
                      {cert.title}
                    </h3>
                    <span className="text-[#0C0C0C]/50 group-hover:text-[#D7E2EA]/50 text-sm uppercase tracking-wider transition-colors">
                      {cert.subtitle}
                    </span>
                  </div>
                </div>
                <p className="text-[#0C0C0C]/60 group-hover:text-[#D7E2EA]/60 font-light leading-relaxed transition-colors" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>
                  {cert.description}
                </p>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   PUBLICATIONS SECTION
   ─────────────────────────────────────────────────────────────── */

const publications = [
  {
    title: 'Wireless Communications Through Reconfigurable Intelligent Surfaces',
    award: 'Best Paper Award 2022',
    description: 'Research on next-generation wireless communication technologies using intelligent reflecting surfaces for enhanced signal propagation.',
    icon: BookOpen,
  },
  {
    title: 'AI and Machine Learning in 5G Network Security',
    award: 'Best Paper Presentation 2022',
    description: 'Exploration of AI-driven security mechanisms for 5G networks, addressing emerging threats and autonomous defense strategies.',
    icon: Brain,
  },
];

const PublicationsSection = () => {
  return (
    <section
      className="relative flex flex-col items-center"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Research
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto w-full space-y-8">
        {publications.map((pub, i) => {
          const Icon = pub.icon;
          return (
            <FadeIn key={i} delay={i * 0.15} y={30}>
              <div className="group relative border border-[#D7E2EA]/10 rounded-[30px] p-6 sm:p-8 md:p-10 bg-[#111]/30 backdrop-blur-sm hover:border-[#B600A8]/30 transition-all duration-500">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#B600A8]/20 to-[#7621B0]/20 flex items-center justify-center border border-[#B600A8]/20 flex-shrink-0">
                    <Icon className="w-7 h-7 text-[#B600A8]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5 text-[#FFB900]" />
                      <span className="text-[#FFB900] text-sm font-medium uppercase tracking-widest">{pub.award}</span>
                    </div>
                    <h3 className="text-[#D7E2EA] text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">
                      {pub.title}
                    </h3>
                    <p className="text-[#D7E2EA]/60 font-light leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                      {pub.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   EDUCATION SECTION
   ─────────────────────────────────────────────────────────────── */

const educationData = [
  {
    degree: 'B.Tech – Artificial Intelligence & Data Science',
    period: 'Sep 2020 – Mar 2024',
    institution: 'Dhanalakshmi Srinivasan College of Engineering, Coimbatore',
    description: 'Specialized in Artificial Intelligence and Data Science with coursework in machine learning, data visualization, database management, and statistical analysis.',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary Education (Class XII)',
    period: '2020',
    institution: 'The Richmond Matriculation Higher Secondary School, Perundurai',
    description: 'Completed higher secondary education with focus on science and mathematics, laying the foundation for engineering studies.',
    icon: BookOpen,
  },
  {
    degree: 'Secondary Education (Class X)',
    period: '2018',
    institution: 'Nagamani Ammal Memorial Matriculation Higher Secondary School',
    description: 'Completed secondary education with strong academic performance in mathematics and science subjects.',
    icon: BookOpen,
  },
];

const EducationSection = () => {
  return (
    <section
      className="relative flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading-dark font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Education
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto w-full space-y-8">
        {educationData.map((edu, i) => {
          const Icon = edu.icon;
          return (
            <FadeIn key={i} delay={i * 0.15} y={30}>
              <div className="group relative border border-[#0C0C0C]/10 rounded-[30px] p-6 sm:p-8 md:p-10 bg-[#FAFAFA] hover:bg-[#0C0C0C] hover:border-[#0C0C0C] transition-all duration-500">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00A4EF]/15 to-[#0078D4]/15 flex items-center justify-center border border-[#00A4EF]/20 group-hover:border-[#B600A8]/30 transition-all">
                      <Icon className="w-7 h-7 text-[#00A4EF] group-hover:text-[#B600A8] transition-colors" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                      <span className="text-[#00A4EF] group-hover:text-[#B600A8] text-sm font-medium uppercase tracking-widest transition-colors">{edu.period}</span>
                    </div>
                    <h3 className="text-[#0C0C0C] group-hover:text-white text-xl sm:text-2xl font-bold uppercase tracking-tight mb-2 transition-colors">
                      {edu.degree}
                    </h3>
                    <span className="text-[#0C0C0C]/50 group-hover:text-[#D7E2EA]/50 text-sm block mb-4 transition-colors">
                      {edu.institution}
                    </span>
                    <p className="text-[#0C0C0C]/60 group-hover:text-[#D7E2EA]/60 font-light leading-relaxed transition-colors" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                      {edu.description}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   CONTACT / FOOTER SECTION
   ─────────────────────────────────────────────────────────────── */

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center"
      style={{
        background: '#0C0C0C',
        borderRadius: 'clamp(40px, 4vw, 60px) clamp(40px, 4vw, 60px) 0 0',
        marginTop: '-2.5rem',
        padding: 'clamp(5rem, 6vw, 8rem) clamp(1.25rem, 2vw, 2.5rem)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <FadeIn delay={0} y={40} className="w-full text-center">
        <h2
          className="hero-heading font-black uppercase text-center mb-8"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.2} y={20}>
        <p className="text-[#D7E2EA]/60 text-center font-light mb-12 max-w-xl mx-auto" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}>
          Have a project in mind? Let's build something amazing together with data-driven insights.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} y={20}>
        <div className="flex justify-center mb-16">
          <ContactButton />
        </div>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
        <FadeIn delay={0.1} y={20}>
          <a href="mailto:chandrus0131@gmail.com" className="group flex flex-col items-center justify-between gap-3 p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/30 bg-[#111]/30 backdrop-blur-sm transition-all w-full h-full min-h-[140px]">
            <div className="flex flex-col items-center gap-3">
              <Mail className="w-6 h-6 text-[#B600A8]" />
              <span className="text-[#D7E2EA] text-sm uppercase tracking-wider font-semibold">Email</span>
            </div>
            <span className="text-[#D7E2EA]/60 text-xs text-center truncate w-full">chandrus0131@gmail.com</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <a href="tel:+917604825587" className="group flex flex-col items-center justify-between gap-3 p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/30 bg-[#111]/30 backdrop-blur-sm transition-all w-full h-full min-h-[140px]">
            <div className="flex flex-col items-center gap-3">
              <Phone className="w-6 h-6 text-[#B600A8]" />
              <span className="text-[#D7E2EA] text-sm uppercase tracking-wider font-semibold">Phone</span>
            </div>
            <span className="text-[#D7E2EA]/60 text-xs text-center w-full">+91 76048 25587</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.3} y={20}>
          <div className="group flex flex-col items-center justify-between gap-3 p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/30 bg-[#111]/30 backdrop-blur-sm transition-all w-full h-full min-h-[140px]">
            <div className="flex flex-col items-center gap-3">
              <MapPin className="w-6 h-6 text-[#B600A8]" />
              <span className="text-[#D7E2EA] text-sm uppercase tracking-wider font-semibold">Location</span>
            </div>
            <span className="text-[#D7E2EA]/60 text-xs text-center w-full">Coimbatore, India</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} y={20}>
          <a href="https://www.linkedin.com/in/chandru-s-1b21bb228/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-between gap-3 p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/30 bg-[#111]/30 backdrop-blur-sm transition-all w-full h-full min-h-[140px]">
            <div className="flex flex-col items-center gap-3">
              <Linkedin className="w-6 h-6 text-[#B600A8]" />
              <span className="text-[#D7E2EA] text-sm uppercase tracking-wider font-semibold">LinkedIn</span>
            </div>
            <span className="text-[#D7E2EA]/60 text-xs text-center truncate w-full">chandru-s-1b21bb228</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <a href="https://github.com/Ck0131" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-between gap-3 p-6 rounded-2xl border border-[#D7E2EA]/10 hover:border-[#B600A8]/30 bg-[#111]/30 backdrop-blur-sm transition-all w-full h-full min-h-[140px]">
            <div className="flex flex-col items-center gap-3">
              <Github className="w-6 h-6 text-[#B600A8]" />
              <span className="text-[#D7E2EA] text-sm uppercase tracking-wider font-semibold">GitHub</span>
            </div>
            <span className="text-[#D7E2EA]/60 text-xs text-center truncate w-full">Ck0131</span>
          </a>
        </FadeIn>
      </div>

      <div className="border-t border-[#D7E2EA]/10 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#D7E2EA]/40 text-sm uppercase tracking-wider">
            © 2026 Chandru S. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#D7E2EA]/40 text-sm">Built with</span>
            <span className="text-[#B600A8] text-sm font-medium">React + Framer Motion</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────────────────────────────────────────────
   MAIN APP
   ─────────────────────────────────────────────────────────────── */

export default function App() {
  return (
    <div className="overflow-x-clip" style={{ background: '#0C0C0C', fontFamily: "'Kanit', sans-serif" }}>
      <GlobalStyles />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertificationsSection />
      <PublicationsSection />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
