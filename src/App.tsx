/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  ArrowRight, Sparkles, Trophy, Calendar, BookOpen, Clock, 
  Terminal, ShieldCheck, Heart, CircleDot, Database, Smartphone, Laptop, 
  Download, Languages, Award, Compass, MessageSquare, Compass as MapIcon
} from 'lucide-react';

import Header from './components/Header';
import InteractiveSkills from './components/InteractiveSkills';
import ProjectDetailModal from './components/ProjectDetailModal';
import InteractivePhysicsSandbox from './components/InteractivePhysicsSandbox';
import ContactForm from './components/ContactForm';
import { useLanguage } from './context/LanguageContext';
import { ProjectItem } from './types';

// Concrete path imports for generated assets
import HERO_PORTRAIT from './assets/images/portrait_hero_1779545233456.jpg';
import ABOUT_PORTRAIT from './assets/images/about_portrait_custom-1.jpg';
import WORKSPACE_IMG from './assets/images/about_workspace_1779545253008-1.png';
import UNITY_GAME_IMG from './assets/images/unity_game_scene_1779545276227-1.png';

export default function App() {
  const [activeSection, setActiveSection] = useState('s1');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'mobile' | 'web' | 'game' | 'design'>('all');
  const { language, t, data } = useLanguage();

  // About Me portrait states & toggle grayscale filters
  const [imgSrc1, setImgSrc1] = useState(ABOUT_PORTRAIT);
  const [imgSrc2, setImgSrc2] = useState(WORKSPACE_IMG);
  const [imgSrc3, setImgSrc3] = useState(UNITY_GAME_IMG);
  const [isGrayscale1, setIsGrayscale1] = useState(true);
  const [isGrayscale2, setIsGrayscale2] = useState(true);
  const [isGrayscale3, setIsGrayscale3] = useState(false);

  // Monitor scrolling to highlight navbar tabs dynamically
  useEffect(() => {
    const sections = ['s1', 's2', 's3', 's4', 's5', 's7', 's9'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const downloadResumeSim = async () => {
    // Tra cứu xem người dùng có tải lên file PDF của chính mình chưa
    // Các đường dẫn hỗ trợ: '/CV_DOAN_XUAN_TOAN.pdf' hoặc '/cv.pdf' ở thư mục public
    let fileDownloaded = false;
    const customPaths = ['/CV_DOAN_XUAN_TOAN.pdf', '/cv.pdf'];

    for (const path of customPaths) {
      try {
        const response = await fetch(path);
        if (response.ok && response.status === 200) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('html')) {
            // SPA fallback serving index.html, skip
            continue;
          }
          const blob = await response.blob();
          // Nếu file PDF rỗng (0 bytes) do tạo file trống từ Code Editor, ta sẽ bỏ qua để kích hoạt bộ sinh jsPDF tự động!
          if (blob.size < 100) {
            console.log("File PDF trống hoặc quá nhỏ, bộ sinh CV tự động sẽ xử lý.");
            continue;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = path.split('/').pop() || 'CV_DOAN_XUAN_TOAN.pdf';
          link.target = '_blank'; // Mở tab mới/kích hoạt tải linh hoạt trong môi trường iframe sandbox
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          fileDownloaded = true;
          break;
        }
      } catch (e) {
        // Bỏ qua lỗi và tiếp tục thử
      }
    }

    if (fileDownloaded) {
      return;
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [29, 78, 216]; // Blue Hex #1D4ED8
    const secondaryColor = [71, 85, 105]; // Slate Hex #475569
    const darkColor = [30, 41, 59]; // Dark Slate Hex #1E293B
    const marginX = 15;
    let y = 15;

    const checkPageBreak = (neededSpace: number) => {
      if (y + neededSpace > 280) {
        doc.addPage();
        y = 15;
        return true;
      }
      return false;
    };

    // Header Setup
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('DOAN XUAN TOAN', marginX, y);
    
    y += 7;
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('GAME DEVELOPER INTERN', marginX, y);

    y += 6;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('Email: doanxuantoan3524@gmail.com   |   Phone: 0942482364   |   Da Nang city', marginX, y);
    
    y += 4.5;
    doc.text('GitHub: https://github.com/tooru352', marginX, y);

    y += 4;
    // Thin section decorator line
    doc.setDrawColor(203, 213, 225); // Slate 300
    doc.setLineWidth(0.3);
    doc.line(marginX, y, 210 - marginX, y);

    // Section divider utility
    const drawSectionTitle = (title: string) => {
      checkPageBreak(18);
      y += 8;
      // Blue accent background bar
      doc.setFillColor(239, 246, 255); // Hex #EFF6FF
      doc.rect(marginX, y - 5, 180, 7, 'F');

      // Left border stripe in blue
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(marginX, y - 5, 2, 7, 'F');

      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.text(title, marginX + 4, y);
      y += 5.5;
    };

    // Profile Summary
    drawSectionTitle('PROFILE SUMMARY');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    const summaryText = "Third-year Management Information Systems student with a strong foundation in web and mobile application development. Experienced in working with HTML, CSS, JavaScript, Flutter, Django, and REST API basics to build responsive and user-friendly applications. Passionate about game development and currently self-learning Unity to pursue a career as a Game Developer.";
    const splitSummary = doc.splitTextToSize(summaryText, 180);
    doc.text(splitSummary, marginX, y);
    y += splitSummary.length * 4.3;

    // Education
    drawSectionTitle('EDUCATION');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('University of Economics - The University of DaNang', marginX, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('2023 - 2027', 195 - marginX, y, { align: 'right' });
    y += 5;
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Major: Management Information System - MIS', marginX, y);
    y += 4;
    doc.text('GPA: 3.73 / 4.0', marginX, y);
    y += 4;

    // Hard Skills
    drawSectionTitle('HARD SKILLS');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFontSize(9);
    
    const hSkills = [
      { label: 'Programming Languages', value: 'C#, HTML, CSS, JavaScript, Python, Dart' },
      { label: 'Framework & Technologies', value: 'Unity (Learning), Flutter, Django, Responsive UI' },
      { label: 'Database', value: 'SQL Server, MongoDB' },
      { label: 'Tools', value: 'Android Studio, VS Code, IntelliJ IDEA, PyCharm, Git' },
      { label: 'Concept', value: 'OOP, REST API (Basic)' },
      { label: 'Design Tools', value: 'Adobe Photoshop, Illustrator, Premiere Pro, After Effects, CapCut, Digital Drawing Tablet' },
      { label: 'Languages', value: 'English (TOEIC 595 - IIG VIET NAM - 20/07/2024), Japanese (Beginner - N5), Chinese (HSK 3)' }
    ];

    hSkills.forEach(skill => {
      checkPageBreak(5);
      doc.setFont('Helvetica', 'bold');
      doc.text(`${skill.label}: `, marginX, y);
      const labelWidth = doc.getTextWidth(`${skill.label}: `);
      doc.setFont('Helvetica', 'normal');
      const valText = doc.splitTextToSize(skill.value, 180 - labelWidth);
      doc.text(valText, marginX + labelWidth, y);
      y += valText.length * 4.3;
    });

    // Soft Skills
    drawSectionTitle('SOFT SKILLS');
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('Observation, Decision making, Communication, Time Management, Presentation Skills, Adaptability', marginX, y);
    y += 4;

    // Certifications
    drawSectionTitle('CERTIFICATIONS');
    doc.setFont('Helvetica', 'bold');
    doc.text('TOEIC: 595 - IIG VIET NAM', marginX, y);
    doc.setFont('Helvetica', 'normal');
    doc.text('20/07/2024', 195 - marginX, y, { align: 'right' });
    y += 4;

    // Work Experience
    drawSectionTitle('WORK EXPERIENCE');
    
    // Job 1
    checkPageBreak(15);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Media & Communications Designer', marginX, y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('2023 - Present', 195 - marginX, y, { align: 'right' });
    y += 4;
    doc.setFont('Helvetica', 'italic');
    doc.text('Youth Union - Faculty of Statistics & Informatics', marginX, y);
    y += 4.5;

    const job1Bullets = [
      'Designed media publications for faculty events and student activities.',
      'Created posters, banners, social media content, and promotional videos.',
      'Worked with design and editing tools such as Adobe Photoshop, Illustrator, Premiere Pro, After Effects, and CapCut.',
      'Utilized a drawing tablet for digital illustration and graphic design in Photoshop.',
      'Designed basic characters, backgrounds, and visual assets for media content.',
      'Collaborated with team members to develop creative ideas and event communication materials.',
      'Managed multiple design tasks while ensuring deadlines and visual quality.'
    ];

    job1Bullets.forEach(bullet => {
      checkPageBreak(5);
      doc.setFont('Helvetica', 'normal');
      doc.text('•', marginX + 3, y);
      const splitted = doc.splitTextToSize(bullet, 172);
      doc.text(splitted, marginX + 7, y);
      y += splitted.length * 4.2;
    });

    // Job 2
    y += 2;
    checkPageBreak(15);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text('Part-time Restaurant Service Staff', marginX, y);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('2023 - Present', 195 - marginX, y, { align: 'right' });
    y += 4;
    doc.setFont('Helvetica', 'italic');
    doc.text('Four Points by Sheraton Danang', marginX, y);
    y += 4.5;

    const job2Bullets = [
      'Supported restaurant operations in a fast-paced 5-star hotel environment.',
      'Assisted guests and ensured professional customer service standards.',
      'Improved communication, teamwork, and problem-solving skills through daily customer interactions.',
      'Adapted to flexible shifts and high-pressure working environments.'
    ];

    job2Bullets.forEach(bullet => {
      checkPageBreak(5);
      doc.setFont('Helvetica', 'normal');
      doc.text('•', marginX + 3, y);
      const splitted = doc.splitTextToSize(bullet, 172);
      doc.text(splitted, marginX + 7, y);
      y += splitted.length * 4.2;
    });

    // Projects
    drawSectionTitle('PROJECTS');

    const projectsListObj = [
      {
        title: '2D Platformer Game - Unity & C# - Personal Project',
        timeline: '05/2026 - Present',
        github: 'https://github.com/tooru352/GameLearning.git',
        bullets: [
          'Designed game concept from scratch, including character design and background art, to create a cohesive visual style for the platformer.',
          'Built a 2D platformer game to learn Unity basics, including player movement (jump, double jump, wall slide), enemy behavior, and collectible items.',
          'Implemented checkpoint system for player respawn and health management with simple UI feedback.',
          'Created interactive platforms (moving, falling) and basic camera follow system to enhance gameplay experience.',
          'Learned C# scripting fundamentals, Unity physics (Rigidbody2D, Collider2D), and how to structure game code with multiple scripts.'
        ]
      },
      {
        title: 'Social Networking Web Platform Social (Responsible for Post Management)',
        timeline: '03/2026 - 05/2026',
        github: 'https://github.com/tooru352/NHOM2_LTW_49k14.1.git',
        bullets: [
          'Built a social networking web application using Django MVC framework with post management system supporting multi-image uploads, user authentication, and profile management.',
          'Developed comprehensive post CRUD operations with date-organized media storage, enabling users to create, edit, delete, and share posts with multiple images.',
          'Implemented Django ORM with SQLite database for efficient post data management and media file handling through RESTful API design.'
        ]
      },
      {
        title: 'Internal Social Networking Mobile Platform using Flutter & Node.js',
        timeline: '03/2026 - 05/2026',
        github: 'https://github.com/tooru352/Mobile_49K14.1.git',
        bullets: [
          'Developed post management features using Flutter with audience control, emotion reactions, user tagging, and sharing.',
          'Implemented media upload system with Cloudinary CDN to handle image/video uploads up to 50MB with automatic optimization.',
          'Designed database schema using Mongoose ODM with MongoDB Atlas, implementing soft delete, pagination, and navigation features.'
        ]
      }
    ];

    projectsListObj.forEach((proj, idx) => {
      checkPageBreak(15);
      if (idx > 0) y += 3;
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(proj.title, marginX, y);
      doc.setFont('Helvetica', 'normal');
      doc.text(proj.timeline, 195 - marginX, y, { align: 'right' });
      y += 4;
      doc.setFont('Helvetica', 'italic');
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(`GitHub: ${proj.github}`, marginX, y);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      y += 4.5;

      proj.bullets.forEach(bullet => {
        checkPageBreak(5);
        doc.setFont('Helvetica', 'normal');
        doc.text('•', marginX + 3, y);
        const splitted = doc.splitTextToSize(bullet, 172);
        doc.text(splitted, marginX + 7, y);
        y += splitted.length * 4.2;
      });
    });

    doc.save('CV_DOAN_XUAN_TOAN.pdf');
  };

  const filteredProjects = activeTab === 'all' 
    ? data.projectList 
    : data.projectList.filter(p => p.category === activeTab);

  return (
    <div className="bg-bg-primary font-sans text-white relative select-none">
      {/* Autoplay looping video background sitting at z-0 */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <video
          className="w-full h-full object-cover opacity-45"
          autoPlay
          loop
          muted
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4"
        />
        <div className="absolute inset-0 bg-black/35 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/40 to-black/90" />
      </div>

      <Header activeSection={activeSection} />

      {/* S1: HERO SECTION */}
      <section id="s1" className="min-h-screen flex items-center px-6 lg:px-20 relative pt-24 overflow-hidden z-10 animate-fade-rise">
        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto w-full z-10 items-center relative">
          <div className="col-span-full lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="flex flex-col mb-1 items-center lg:items-start">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold mb-2">
                {data.s1.subtitle}
              </span>
            </div>

            <h1 className="font-title text-5xl lg:text-[72px] font-medium leading-[0.95] tracking-tighter mb-4 uppercase">
              <span className="font-serif italic text-white/95">{data.s1.title.split(' ')[0]}</span>
              <span className="text-white block mt-2 font-semibold">
                {data.s1.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl font-light mx-auto lg:mx-0">
              {data.s1.body}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#s5"
                className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-hero-btn text-xs font-title font-bold tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                {t('btn.launch')}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={downloadResumeSim}
                className="px-6 py-4 liquid-glass hover:bg-white/5 rounded-hero-btn text-xs font-title font-bold tracking-wider hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-white" />
                {t('btn.resume')}
              </button>
            </div>
          </div>

          {/* S1: Dynamic Overlapped Portrait - Visible only on desktop (lg+) */}
          <div className="hidden lg:flex lg:col-span-6 relative h-[550px] xl:h-[650px] 2xl:h-[730px] w-full max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px] mx-auto lg:mx-0 select-none items-center justify-center overflow-visible">
            {/* Container wrapper for image and widgets */}
            <div className="relative w-full flex items-center justify-center transform translate-x-0 lg:translate-x-[60px] xl:translate-x-[100px] 2xl:translate-x-[120px]">
              {/* Extended Portrait frame */}
              <motion.div 
                animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [-1, 0.5, -1] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full max-w-[420px] xl:max-w-[480px] 2xl:max-w-[510px] rounded-[20px] lg:rounded-[24px] xl:rounded-[28px] overflow-hidden shadow-2xl border border-white/10 group bg-black/40 p-1 aspect-[3/4.2] z-10 backdrop-blur-md"
              >
                <img 
                  src={HERO_PORTRAIT} 
                  alt="Đoàn Xuân Toàn Portrait" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-[16px] lg:rounded-[20px] xl:rounded-[24px] opacity-85 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              </motion.div>

              {/* Floating HUD Widgets - Only visible on desktop (lg+) */}
              {/* Widget 1: Systems Active (MIS) - Desktop only - Moved to top-right */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0 }}
                className="hidden lg:block absolute top-[5%] right-[5%] w-[130px] lg:w-[140px] xl:w-[155px] 2xl:w-[165px] p-2 lg:p-2.5 xl:p-3 liquid-glass rounded-lg lg:rounded-xl xl:rounded-2xl shadow-primary border border-white/5 z-25 transform -translate-y-[160px] lg:-translate-y-[180px] xl:-translate-y-[200px] 2xl:-translate-y-[210px] -translate-x-[200px] lg:-translate-x-[250px] xl:-translate-x-[300px] 2xl:-translate-x-[350px]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span className="text-[6px] lg:text-[7px] xl:text-[8px] font-mono text-white/60 tracking-wider">SYSTEMS ACTIVE</span>
                </div>
                <h4 className="text-[9px] lg:text-[10px] xl:text-xs font-title font-bold">MIS Engineer</h4>
                <p className="text-[7px] lg:text-[8px] xl:text-[10px] text-white/50 mt-1">GPA: {data.educationInfo.gpa.split(' ')[0]}</p>
              </motion.div>

              {/* Widget 2: Passion for Game Dev - Desktop only - Moved to left-center */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 0.5 }}
                className="hidden lg:block absolute top-[40%] -left-[20px] w-[110px] lg:w-[120px] xl:w-[130px] 2xl:w-[140px] p-2 lg:p-2.5 xl:p-3 liquid-glass rounded-lg lg:rounded-xl xl:rounded-2xl shadow-primary border border-white/5 z-25 transform -translate-y-[180px] lg:-translate-y-[200px] xl:-translate-y-[230px] 2xl:-translate-y-[250px] -translate-x-[60px] lg:-translate-x-[75px] xl:-translate-x-[85px] 2xl:-translate-x-[90px]"
              >
                <span className="text-[7px] lg:text-[8px] xl:text-[9px] font-mono text-white/50 tracking-widest block font-bold">PASSION FOR GAME DEV</span>
                <h4 className="text-[9px] lg:text-[10px] xl:text-xs font-title font-bold mt-1 text-white">Unity Engine & C#</h4>
                <p className="text-[7px] lg:text-[8px] xl:text-[9px] text-white/60 mt-0.5">Gameplay mechanics & logic</p>
              </motion.div>

              {/* Widget 3: Current Node - Desktop only */}
              <motion.div 
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                className="hidden lg:block absolute bottom-[15%] right-[8%] w-[125px] lg:w-[135px] xl:w-[150px] 2xl:w-[160px] p-2 lg:p-2.5 xl:p-3 liquid-glass rounded-lg lg:rounded-xl xl:rounded-2xl shadow-primary border border-white/5 z-25 transform translate-y-[160px] lg:translate-y-[180px] xl:translate-y-[210px] 2xl:translate-y-[230px] -translate-x-[120px] lg:-translate-x-[140px] xl:-translate-x-[150px] 2xl:-translate-x-[160px]"
              >
                <span className="text-[7px] lg:text-[8px] xl:text-[9px] font-mono text-white/50 tracking-widest block font-bold uppercase">CURRENT NODE</span>
                <h4 className="text-[9px] lg:text-[10px] xl:text-xs font-title font-bold mt-1 text-white">Danang, Vietnam</h4>
                <p className="text-[7px] lg:text-[8px] xl:text-[9px] text-white/60 mt-0.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  UTC +7 • Active
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* S2: ABOUT ME SECTION */}
      <section id="s2" className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative z-10 animate-fade-rise">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-7xl mx-auto w-full z-10 items-center">
          
          {/* S2: 3 Asymmetric Floating Portraits */}
          <div className="relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-[610px] w-full max-w-[400px] sm:max-w-[480px] md:max-w-[520px] mx-auto lg:mx-0 select-none overflow-visible">
            {/* Card 1: Primary Portrait (Shunted Right towards text, Floating, shifted further up) */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 4, 0], rotate: [-1, 0.5, -1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[0px] sm:top-[-5px] md:top-[-15px] lg:top-[-30px] right-[0px] sm:right-[0px] md:right-[-10px] lg:right-[-20px] w-[52%] sm:w-[55%] md:w-[58%] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-2xl border border-white/10 group bg-black/40 p-1 aspect-[3/4.2] z-20 backdrop-blur-md cursor-pointer"
            >
              <img 
                src={imgSrc1} 
                alt="Đoàn Xuân Toàn Portrait 1" 
                onError={() => setImgSrc1(HERO_PORTRAIT)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] grayscale group-hover:grayscale-0 transition-all duration-750 group-hover:scale-105"
              />
            </motion.div>
 
            {/* Card 2: Secondary Portrait (Shifted UP and compact) */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -3, 0], rotate: [1, -0.5, 1] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-[22%] sm:top-[25%] md:top-[28%] left-[0px] sm:left-[-5px] md:left-[-15px] lg:left-[-30px] w-[40%] sm:w-[42%] md:w-[45%] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-2xl border border-white/10 group bg-black/40 p-1 aspect-[3/4.2] z-10 backdrop-blur-md cursor-pointer"
            >
              <img 
                src={imgSrc2} 
                alt="Đoàn Xuân Toàn Portrait 2" 
                onError={() => setImgSrc2(HERO_PORTRAIT)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] grayscale group-hover:grayscale-0 transition-all duration-750 group-hover:scale-105"
              />
            </motion.div>
 
            {/* Card 3: Tertiary Portrait (Bottom compact, shifted more to the right and down) */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, 3, 0], rotate: [-1, 0.5, -1] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.1 }}
              className="absolute bottom-[0px] sm:bottom-[-20px] md:bottom-[-40px] lg:bottom-[-70px] left-[18%] sm:left-[20%] md:left-[22%] lg:left-[25%] w-[42%] sm:w-[44%] md:w-[46%] rounded-[16px] sm:rounded-[20px] md:rounded-[24px] lg:rounded-[28px] overflow-hidden shadow-2xl border border-white/10 group bg-black/40 p-1 aspect-[3/4.1] z-30 backdrop-blur-lg cursor-pointer"
            >
              <img 
                src={imgSrc3} 
                alt="Đoàn Xuân Toàn Portrait 3" 
                onError={() => setImgSrc3(HERO_PORTRAIT)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[12px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] grayscale group-hover:grayscale-0 transition-all duration-750 group-hover:scale-105"
              />
            </motion.div>
          </div>

          {/* About Narrative Text (Shifted with lg:pl-10 to prevent left edge crowding) */}
          <div className="space-y-6 lg:pl-10">
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40 block font-semibold mb-2">
                {data.s2.subtitle}
              </span>
              <h2 className="font-title text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter uppercase leading-none">
                <span className="font-serif italic text-white/90 font-light mr-3">{language === 'vi' ? 'VỀ' : 'ABOUT'}</span>
                <span className="text-white font-black font-title tracking-tight">{language === 'vi' ? 'TÔI' : 'DX.TOAN'}</span>
              </h2>
            </div>

            <div className="p-5 sm:p-7 bg-white/[0.02] border border-white/5 rounded-[24px] text-white/75 text-sm sm:text-base leading-relaxed font-light text-justify">
              {data.s2.body}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.s2.highlights.map((highlight, idx) => {
                const parts = highlight.split(': ');
                const label = parts[0];
                const val = parts.slice(1).join(': ');
                return (
                  <div 
                    key={idx}
                    className="p-5 sm:p-6 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-white/10 hover:scale-[1.02] transition-all duration-300 rounded-[20px] flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full shrink-0 mt-2" />
                    <div>
                      <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">{label}</h4>
                      <p className="text-xs sm:text-[13px] font-semibold text-white/90 leading-relaxed mt-1.5">{val}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* S3: SKILLS SECTION */}
      <section id="s3" className="min-h-screen flex flex-col justify-center px-6 lg:px-20 py-24 relative overflow-hidden z-10 animate-fade-rise">
        {/* Abstract design vector overlay */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -z-10" />

        <div className="max-w-7xl mx-auto w-full text-center mb-16 space-y-4 border-b border-white/10 pb-8">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold mb-2 block">
            {data.s3.subtitle}
          </span>
          <h2 className="font-title text-5xl lg:text-7xl font-medium tracking-tighter uppercase">
            <span className="font-serif italic text-white/95">{language === 'vi' ? 'BẢN ĐỒ' : 'CORE'}</span> <span className="text-white font-semibold font-title">{t('title.skills').toUpperCase()}</span>
          </h2>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light">
            {data.s3.body}
          </p>
        </div>

        {/* Dynamic skills dashboard with sorting & micro level visual meters */}
        <div className="w-full relative z-10">
          <InteractiveSkills />
        </div>
      </section>

      {/* S4: WORK EXPERIENCE SECTION */}
      <section id="s4" className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative z-10 animate-fade-rise">
        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto w-full z-10 items-center">
          
          {/* Experience Timelines (Left side representation) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-1.5 pb-4 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/55 font-semibold block mb-2">
                {data.s4.subtitle}
              </span>
              <h2 className="font-title text-5xl lg:text-7xl font-medium tracking-tighter uppercase">
                <span className="font-serif italic text-white/95">{language === 'vi' ? 'HÀNH TRÌNH' : 'SYSTEMS'}</span> <span className="text-white font-semibold">{language === 'vi' ? 'THỰC TIỄN' : 'LOGISTICS'}</span>
              </h2>
              <p className="text-white/85 text-sm md:text-base leading-relaxed max-w-xl font-light">
                {data.s4.body}
              </p>
            </div>

            <div className="space-y-6">
              {data.experienceList.map((exp) => (
                <div 
                  key={exp.id}
                  className="p-6 liquid-glass rounded-dashboard hover:scale-[1.01] transition-transform duration-300 relative group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-20 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-title font-bold text-white group-hover:text-white/80 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-xs font-mono text-white/60 mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono text-white/70 shrink-0 self-start sm:self-center">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs text-white/75 leading-relaxed mb-4 font-light">
                    {exp.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {exp.achievements.map((ach, idx) => (
                      <div key={idx} className="flex gap-2 text-xs text-white/70 font-light">
                        <span className="text-white/40 font-bold shrink-0">•</span>
                        <span className="leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {exp.skillsGained.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded-md text-[10px] font-mono text-white/60 font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three Image Grid Grid layout (Right side) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-auto sm:h-[520px] max-w-[450px] mx-auto lg:mx-0">
            {/* Large double row column representation (Creative branding layout) */}
            <div className="col-span-1 rounded-bento p-5 flex flex-col justify-between overflow-hidden relative group liquid-glass hover:scale-105 transition-transform duration-300">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-title font-bold text-white leading-snug">{language === 'vi' ? 'Thiết kế & Sự kiện' : 'Graphic & Campaign Content'}</h4>
                <p className="text-[10px] text-white/75 leading-relaxed font-light">
                  {language === 'vi' 
                    ? 'Hiện thực hóa các ấn phẩm sự kiện kỹ thuật số và tư duy thương hiệu thông tin.' 
                    : 'Engineered visual guidelines for multiple digital IT and youth forums across the city network.'}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="text-[9px] font-mono text-white/50 block">CREATIVE LABS</span>
              </div>
            </div>

            {/* Top row right (Service Excellence) */}
            <div className="col-span-1 rounded-bento p-5 flex flex-col justify-between group liquid-glass hover:scale-105 transition-transform duration-300">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Languages className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-title font-bold text-white">{language === 'vi' ? 'Phục vụ Chuyên nghiệp' : 'Multilingual Host'}</h4>
                <p className="text-[9px] text-white/70 leading-relaxed font-light">
                  {language === 'vi' 
                    ? 'Chịu lực cao trong dịch vụ, điều phối và gắn kết các tệp khách hàng quốc tế.' 
                    : 'Thriving in high-stress customer coordination, greeting diverse guests in native registers.'}
                </p>
              </div>
              <span className="text-[8px] font-mono text-white/50">OPERATIONS</span>
            </div>

            {/* Bottom row right spanning full space */}
            <div className="col-span-1 rounded-bento p-5 flex flex-col justify-between group liquid-glass hover:scale-105 transition-transform duration-300">
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <Trophy className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-title font-bold text-white">{language === 'vi' ? 'Tinh thần Đồng đội' : 'Adhesive Teamwork'}</h4>
                <p className="text-[9px] text-white/70 leading-relaxed font-light">
                  {language === 'vi' 
                    ? 'Quản lý mâu thuẫn tốt, cầu nối giao lưu thân thiện nhiệt thành.' 
                    : 'Facilitated agile designs, connecting tech frameworks with business strategies.'}
                </p>
              </div>
              <span className="text-[8px] font-mono text-white/50">SYNERGY</span>
            </div>
          </div>
        </div>
      </section>

      {/* S5: PROJECTS SECTION */}
      <section id="s5" className="min-h-screen flex flex-col justify-center px-6 lg:px-20 py-24 relative overflow-hidden z-10 animate-fade-rise">
        <div className="max-w-7xl mx-auto w-full mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold block mb-2">
              {data.s5.subtitle}
            </span>
            <h2 className="font-title text-5xl lg:text-7xl font-medium tracking-tighter uppercase">
              <span className="font-serif italic text-white/95">{language === 'vi' ? 'DỰ ÁN' : 'SHOWCASE'}</span> <span className="text-white font-semibold">{language === 'vi' ? 'TIÊU BIỂU' : 'CASES'}</span>
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-2xl font-light">
              {data.s5.body}
            </p>
          </div>

          {/* Filtering trigger Tabs */}
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-1 liquid-glass p-1 rounded-full shrink-0 self-start md:self-end max-w-full">
            {(['all', 'mobile', 'web', 'game', 'design'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-title font-medium tracking-wide rounded-full transition-all cursor-pointer shrink-0 ${
                  activeTab === tab 
                    ? 'bg-white text-black shadow-md' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t(tab as any)}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic showcase Horizontal Scrolling row */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div 
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="liquid-glass rounded-[24px] hover:scale-105 hover:shadow-primary transition-transform duration-300 p-5 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/5 bg-[#0E0E0E] mb-5 flex items-center justify-center text-center">
                    {/* Render visual mock image */}
                    {proj.mockupUrl.startsWith('http') || proj.mockupUrl.startsWith('/src') ? (
                      <img 
                        src={proj.mockupUrl} 
                        alt={proj.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 flex flex-col items-center justify-center p-4">
                        <span className="text-white/90 font-title text-2xl font-bold mb-1">🎮 INDIE GAME</span>
                        <p className="text-[10px] text-white/50 max-w-[200px] leading-relaxed">Gravity Bound Kinematic Movement Core</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-4 py-2 bg-white text-black rounded-full text-xs font-title font-bold tracking-wide shadow-md hover:scale-105 transition-transform">
                        {language === 'vi' ? 'Mở rộng Chi tiết' : 'Expand Systems Case'}
                      </span>
                    </div>
                  </div>

                    <div className="flex items-center justify-between">
                      {proj.category === 'design' ? (
                        <span className="px-2.5 py-0.5 bg-[#1877F2]/10 border border-[#1877F2]/30 rounded-full text-[9.5px] font-title text-[#4b96f5] tracking-wider uppercase flex items-center gap-1 font-bold">
                          <svg className="w-2.5 h-2.5 fill-current text-[#1877F2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                          </svg>
                          {language === 'vi' ? 'Bài đăng FB' : 'FB Post'}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-mono text-white/70 tracking-wider uppercase">
                          {t(proj.category as any) || proj.category}
                        </span>
                      )}
                      {proj.period && (
                        <span className="text-[10px] font-mono text-white/40 tracking-tight">
                          {proj.period}
                        </span>
                      )}
                    </div>
                  <h3 className="text-xl font-title font-bold text-white mt-2 group-hover:text-white/80 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed mt-2 line-clamp-3 font-light">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {proj.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded-md text-[9px] font-mono text-white/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-white/[0.02] border border-white/5 rounded-md text-[9px] font-mono text-white/40">
                      +{proj.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* S5 Game Dev Lab Addition: Embedded interactive C# physics calculations simulator! */}
          <div className="mt-20 border-t border-white/10 pt-16 w-full">
            <div className="text-center space-y-4 mb-10">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold mb-2 block">
                {data.s6.subtitle}
              </span>
              
              <h3 className="font-title text-4xl lg:text-[54px] font-medium tracking-tighter uppercase text-white">
                <span className="font-serif italic text-white/95">{language === 'vi' ? 'PHÒNG THỬ' : 'KINETIC'}</span> <span className="text-white font-semibold">{language === 'vi' ? 'NGHIỆM VẬT LÝ' : 'PHYSICS LAB'}</span>
              </h3>

              <div className="liquid-glass-strong p-6 rounded-3xl max-w-3xl mx-auto">
                <p className="text-white/85 text-sm leading-relaxed font-light">
                  {data.s6.body}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {data.s6.highlights.map((highlight, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-1.5 liquid-glass rounded-full text-xs font-title font-medium text-white/85 hover:scale-105 transition-transform"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full relative">
              <InteractivePhysicsSandbox />
            </div>
          </div>
        </div>
      </section>

      {/* S7: EDUCATION SECTION */}
      <section id="s7" className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative z-10 animate-fade-rise">
        <div className="grid lg:grid-cols-12 gap-16 max-w-7xl mx-auto w-full z-10 items-center">
          
          {/* Left Side: Mockup Vector representation of Danang DUE Campus */}
          <div className="lg:col-span-5 w-full max-w-[420px] mx-auto lg:mx-0">
            <div className="relative w-full rounded-dashboard overflow-hidden group liquid-glass-strong p-8 flex flex-col hover:scale-[1.03] transition-transform duration-300">
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col">
                <span className="self-start px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[9px] font-mono text-white/80 tracking-wider uppercase mb-[26px]">
                  ACADEMIC ENTITY NODE
                </span>
                
                <h3 className="text-2xl font-title font-bold text-white leading-tight">
                  {language === 'vi' ? 'Trường Đại học Kinh tế' : 'University of Economics'}
                </h3>
                <p className="text-xs text-white/60 mt-1.5">
                  {language === 'vi' ? 'Đại học Đà Nẵng – Việt Nam' : 'The University of Danang – Việt Nam'}
                </p>
                <p className="text-xs text-white/70 leading-relaxed mt-4 font-light">
                  {language === 'vi' 
                    ? 'Cơ sở đào tạo uy tín hàng đầu khu vực miền Trung, kết hợp giữa quản lý doanh nghiệp và công nghệ hiện đại.'
                    : 'Established regional incubator blending modern systems methodologies, data logistics, and software architectures.'}
                </p>
              </div>

              <div className="p-4 liquid-glass mt-5">
                <span className="text-[9px] font-mono text-white/50 block uppercase">{t('gpa')}</span>
                <span className="text-lg font-title font-bold text-white block mt-0.5">{data.educationInfo.gpa}</span>
              </div>
            </div>
          </div>

          {/* Right Side: Educational Coursework breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-6">
              <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold block mb-2">
                {data.s7.subtitle}
              </span>
              <h2 className="font-title text-5xl lg:text-7xl font-medium tracking-tighter uppercase">
                <span className="font-serif italic text-white/95">{language === 'vi' ? 'HỌC VẤN' : 'ACADEMIC'}</span> <span className="text-white font-semibold">{language === 'vi' ? 'NỀN TẢNG' : 'ACUMEN'}</span>
              </h2>
              <h3 className="text-xl font-title font-bold text-white mt-4 uppercase">
                {data.educationInfo.degree}
              </h3>
              <p className="text-xs font-mono text-white/60 mt-1">
                {data.educationInfo.school} • {data.educationInfo.period}
              </p>
            </div>

            <p className="text-white/80 text-sm leading-relaxed border-l-2 border-white/40 pl-4 font-light">
              {data.educationInfo.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-mono text-white/55 uppercase tracking-widest flex items-center gap-2 font-bold">
                <BookOpen className="w-3.5 h-3.5 text-white/70" />
                {t('edu.highlights')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.educationInfo.subjects.map((course, idx) => (
                  <div 
                    key={idx}
                    className="p-3 liquid-glass rounded-xl text-xs text-white/80 hover:text-white hover:scale-[1.03] transition-transform flex items-center gap-2.5"
                  >
                    <div className="w-1.5 h-1.5 bg-white/60 rounded-full shrink-0" />
                    <span className="font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S9: CONTACT SECTION */}
      <section id="s9" className="min-h-screen flex items-center px-6 lg:px-20 py-24 relative z-10 animate-fade-rise">
        <div className="max-w-7xl mx-auto w-full z-10 items-center space-y-16">
          <div className="text-center space-y-4 border-b border-white/10 pb-8">
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-semibold block mb-1">
              {data.s9.subtitle}
            </span>
            <h2 className="font-title text-5xl lg:text-7xl font-medium tracking-tighter uppercase">
              <span className="font-serif italic text-white/95">{language === 'vi' ? 'KHỞI TẠO' : 'TRANSMIT'}</span> <span className="text-white font-semibold">{language === 'vi' ? 'LIÊN LẠC' : 'DISPATCH'}</span>
            </h2>
            <p className="text-white/85 text-sm md:text-base max-w-xl mx-auto font-light">
              {data.s9.body}
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Bottom Legal Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-[10px] font-mono text-white/45 bg-transparent">
        <p>© 2026 {t('brand').toUpperCase()}. {language === 'vi' ? 'Bảo lưu mọi quyền.' : 'All rights reserved.'} Built with premium responsive Tailwind CSS.</p>
      </footer>

      {/* CASE STUDY MODAL INJECTOR */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
