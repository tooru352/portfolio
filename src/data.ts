/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SectionContent, SkillItem, ProjectItem, WorkExpItem, EducationItem, ActivityCertificateItem } from './types';

// Project images imports
import PROJ_UNITY_IMG from './assets/images/unity_game_scene_1779545276227.png';
import PROJ_DJANGO_IMG from './assets/images/proj_django.png';
import PROJ_DESIGN_1_IMG from './assets/images/proj_design_1.jpg';
import PROJ_DESIGN_2_IMG from './assets/images/proj_design_2.png';
import PROJ_DESIGN_3_IMG from './assets/images/proj_design_3.png';

export const portfolioData = {
  s1: {
    title: "DOAN XUAN TOAN",
    subtitle: "GAME DEVELOPER INTERN",
    body: "Third-year Management Information Systems student with a strong foundation in web and mobile application development. Experienced in working with HTML, CSS, JavaScript, Flutter, Django, and REST API basics to build responsive and user-friendly applications. Passionate about game development and currently self-learning Unity to pursue a career as a Game Developer.",
    highlights: ["C# & Unity", "HTML, CSS & JavaScript", "Flutter & Django", "GPA: 3.73 / 4.0", "TOEIC 595"]
  } as SectionContent,

  s2: {
    title: "About Me",
    subtitle: "Bridging Systems Engineering, Design, and Analytical Business Strategy",
    body: "As a Junior Management Information Systems (MIS) student at the University of Economics, Da Nang, my education is a powerful hybrid of technology architectures and corporate operation systems. I enjoy the strict logical rigor of writing clean, scalable code as well as the aesthetics of responsive, beautifully crafted graphic design. My development journey is driven by a constant desire to learn new technologies, build smooth user experiences, and explore the combination of technology, creativity, and game development through Unity.",
    highlights: ["University: University of Economics - The University of DaNang", "Major: Management Information System - MIS", "GPA: 3.73 / 4.0", "Soft Skills: Observation, Decision making, Communication, Time Management, Presentation, Adaptability"]
  } as SectionContent,

  s3: {
    title: "Skills",
    subtitle: "Technical Stack & Professional Capabilities",
    body: "I continuously sharpen my skills across modern, industry-standard technologies to bridge the gap from fluid frontends to resilient APIs, secure mobile architecture, and interactive physics engines.",
    highlights: ["Programming Languages", "Framework & Technologies", "Database", "Tools", "Concept", "Design Tools", "Languages"]
  } as SectionContent,

  s4: {
    title: "Work Experience",
    subtitle: "Professional History & Roles",
    body: "Combining technical logic with creative graphics and high-level cooperative service, here are the paths where I have applied my capabilities in fast-paced collaborative environments.",
    highlights: ["Media & Communications", "Hotel & Luxury Service", "Team Collaboration", "Operational Ethics"]
  } as SectionContent,

  s5: {
    title: "Projects",
    subtitle: "Academic and Personal Software Showcase",
    body: "A presentation of web, mobile, and interactive game projects designed, developed, and deployed to address real functional needs and explore software designs.",
    highlights: ["Unity Game Development", "Django Web Application", "Flutter Mobile Client"]
  } as SectionContent,

  s6: {
    title: "Game Development Journey",
    subtitle: "Self-driven Kinematic Movement Experiments",
    body: "Pursuing my goal as an Indie Game Developer, I leverage Unity and C# to engineer physics scripts, custom colliders, dynamic camera targets, state transitions, and interactive gameplay cycles from scratch.",
    highlights: ["C# Object Scripting", "Kinematic Physics Controls", "Interactive Mechanics", "Future Indie Developer Goal"]
  } as SectionContent,

  s7: {
    title: "Education",
    subtitle: "Academic Acumen in MIS",
    body: "Diving into database schemas, systems analysis, and programming paradigms, I build a dual-lens capability that lets me translate user requirements into software designs.",
    highlights: ["Management Information Systems", "DUE University - Danang", "Key Coursework", "Honors GPA"]
  } as SectionContent,

  s8: {
    title: "Certificates & Activities",
    subtitle: "Academic Credentials and Linguistic Skills",
    body: "Official languages certifications and campus communications roles that prepare me to function within diverse teams and interpret global technical resources.",
    highlights: ["TOEIC 595 Proficient", "Japanese N5", "Chinese HSK 3", "University Press Materials"]
  } as SectionContent,

  s9: {
    title: "Contact Me",
    subtitle: "Initiate Connection and Collaboration Node",
    body: "I am actively seeking game developer intern roles and collaborative game project challenges. Do you have a role, a question, or a project in mind? Let's discuss it and build together!",
    highlights: ["doanxuantoan3524@gmail.com", "GitHub: tooru352", "LinkedIn: doanxuantoan3524", "Facebook Space", "0942482364"]
  } as SectionContent,

  skillDetails: [
    { name: "C#", level: 4, category: "Programming Languages" },
    { name: "HTML", level: 5, category: "Programming Languages" },
    { name: "CSS", level: 5, category: "Programming Languages" },
    { name: "JavaScript", level: 4, category: "Programming Languages" },
    { name: "Python", level: 4, category: "Programming Languages" },
    { name: "Dart", level: 4, category: "Programming Languages" },
    { name: "Unity (Learning)", level: 3, category: "Framework & Technologies" },
    { name: "Flutter", level: 4, category: "Framework & Technologies" },
    { name: "Django", level: 4, category: "Framework & Technologies" },
    { name: "Responsive UI", level: 5, category: "Framework & Technologies" },
    { name: "SQL Server", level: 4, category: "Database" },
    { name: "MongoDB", level: 3, category: "Database" },
    { name: "Android Studio", level: 4, category: "Tools" },
    { name: "VS Code", level: 5, category: "Tools" },
    { name: "IntelliJ IDEA", level: 4, category: "Tools" },
    { name: "PyCharm", level: 4, category: "Tools" },
    { name: "Git", level: 5, category: "Tools" },
    { name: "OOP", level: 4, category: "Concept" },
    { name: "REST API (Basic)", level: 4, category: "Concept" },
    { name: "Adobe Photoshop", level: 5, category: "Design Tools" },
    { name: "Illustrator", level: 4, category: "Design Tools" },
    { name: "Premiere Pro", level: 4, category: "Design Tools" },
    { name: "After Effects", level: 4, category: "Design Tools" },
    { name: "CapCut", level: 5, category: "Design Tools" },
    { name: "Digital Drawing Tablet", level: 5, category: "Design Tools" },
    { name: "English (TOEIC 595 - IIG VIET NAM - 20/07/2024)", level: 4, category: "Languages" },
    { name: "Japanese (Beginner - N5)", level: 3, category: "Languages" },
    { name: "Chinese (HSK 3)", level: 4, category: "Languages" }
  ] as SkillItem[],

  projectList: [
    {
      id: "proj_unity",
      title: "2D Platformer Game",
      subtitle: "Unity & C# - Personal Project",
      description: "An arcade-style 2D platformer designed to learn Unity basics, fluid player kinematics (jump, wall slide), and cohesive art design.",
      longDescription: "Designed the game concept completely from scratch, including custom character layout and background assets to construct a unified aesthetic theme. Programmed smooth player states (basic walking, running, vertical jumping with double-jump triggers, and reactive wall-slide physics). Structured a custom checkpoint mechanics for player respawns, health tracking, kinematic moving surfaces, and basic camera-target follow configurations using C# scripting APIs (Rigidbody2D, Collider2D, triggers).",
      technologies: ["Unity 2D", "C# Scripting", "Kinematic Physics", "Rigidbody2D", "Collider2D"],
      mockupUrl: PROJ_UNITY_IMG,
      githubUrl: "https://github.com/tooru352/GameLearning.git",
      period: "05/2026 - Present",
      category: "game"
    },
    {
      id: "proj_django",
      title: "Social Networking Web Platform",
      subtitle: "Django MVC - Course Project",
      description: "A secure web portal built using Django support multipart image uploads, user credentials, and active group feeds.",
      longDescription: "Took lead responsibility for the Post Management Module. Built a responsive web community portal using Django MVC architecture. Engineered smooth post lifecycle (CRUD actions) mapped with date-partitioned file storage. Enabled group feeds with secure multi-image uploads, profiles management, and user permissions. Implemented Django database ORM layered over SQLite for robust query execution and quick response delivery.",
      technologies: ["Django", "Python", "SQLite", "Django ORM", "REST API", "MVC Pattern"],
      mockupUrl: PROJ_DJANGO_IMG,
      githubUrl: "https://github.com/tooru352/NHOM2_LTW_49k14.1.git",
      period: "03/2026 - 05/2026",
      category: "web"
    },
    {
      id: "proj_flutter",
      title: "Internal Social Networking Mobile Platform",
      subtitle: "Flutter & Node.js - Course Project",
      description: "A dual-stack mobile social solution utilizing Flutter client interface, Node.js, and MongoDB document schemas.",
      longDescription: "Assigned as leader of the Post Management Module. Created high-performing mobile screens in Flutter with complex audience access controls, post tagging, sharing, and custom reaction emojis. Connected a media processing system integrated with Cloudinary CDN to execute image or video uploads up to 50MB with on-the-fly network optimization. Designed logical schemas with Mongoose ODM connected to MongoDB Atlas, establishing soft delete mechanisms, cursor pagination, and responsive routing handlers.",
      technologies: ["Flutter", "Dart", "Node.js", "MongoDB", "Mongoose ODM", "Cloudinary CDN"],
      mockupUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      githubUrl: "https://github.com/tooru352/Mobile_49K14.1.git",
      period: "03/2026 - 05/2026",
      category: "mobile"
    },
    {
      id: "proj_design_1",
      title: "Welcome to KetinMemovies's World",
      subtitle: "Personal Creative Media Project",
      description: "A personal creative media project focused on storytelling, visual design, and character development, combining photography, digital editing, and graphic design to create a cinematic and artistic experience.",
      longDescription: "Developed the storyline and creative concept. Wrote storytelling scripts and project content. Designed characters and visual concepts. Managed photography and visual composition. Edited photos and designed project visuals.",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Digital Drawing Tablet", "Character Design", "Creative Storytelling", "Visual Content Creation"],
      mockupUrl: PROJ_DESIGN_1_IMG,
      liveUrl: "https://www.facebook.com/share/p/18dVLQS7kS/",
      period: "25/10/2024 – 28/10/2024",
      category: "design"
    },
    {
      id: "proj_design_2",
      title: "Tớ mệt rồi...Nhưng tớ vẫn muốn cố gắng, còn bạn thì sao?",
      subtitle: "Emotion & Photography Creative Project",
      description: "A personal creative project focused on emotional storytelling and visual expression through photography and graphic design, delivering motivational messages through cinematic visual composition.",
      longDescription: "Wrote storytelling scripts and project content. Developed creative concepts and visual direction. Managed photography and scene composition. Edited photos and designed visual assets.",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Digital Drawing Tablet", "Photography & Photo Editing", "Creative Storytelling", "Visual Content Creation"],
      mockupUrl: PROJ_DESIGN_2_IMG,
      liveUrl: "https://www.facebook.com/share/p/18YYauvYaK/",
      period: "20/06/2025 – 23/06/2025",
      category: "design"
    },
    {
      id: "proj_design_3",
      title: "Một đôi mắt – Hai cách nhìn",
      subtitle: "Visual Storytelling Media Project",
      description: "A personal creative media project focused on visual storytelling and emotional expression through photography and graphic design, exploring different perspectives through cinematic visuals.",
      longDescription: "Developed the storyline and creative concept. Wrote storytelling scripts and project content. Designed visual concepts and project aesthetics. Managed photography and visual composition. Edited photos and designed visual assets.",
      technologies: ["Adobe Photoshop", "Adobe Illustrator", "Adobe Lightroom", "Digital Drawing Tablet", "Character Design", "Creative Storytelling", "Visual Content Creation"],
      mockupUrl: PROJ_DESIGN_3_IMG,
      liveUrl: "https://www.facebook.com/share/p/1DGFztu8MW/",
      period: "16/10/2025 – 19/10/2025",
      category: "design"
    }
  ] as ProjectItem[],

  experienceList: [
    {
      id: "exp_media",
      role: "Media & Communications Designer",
      company: "Youth Union – Faculty of Statistics & Informatics",
      period: "2023 - Present",
      description: "Developed and executed key visual elements and communications content for student activities and faculty-level public events.",
      achievements: [
        "Designed media publications for faculty events and student activities.",
        "Created promotional posters, banners, social media marketing content, and event reels/videos.",
        "Mastered digital composition and illustration with drawing tablet tools (Photoshop, Illustrator, After Effects, Premiere, CapCut).",
        "Collaborated with diverse team structures to generate creative ideas and maintain unified media layout standards under high velocity."
      ],
      skillsGained: ["Digital Illustration", "Visual Layout Design", "Adobe Photoshop & Illustrator", "Event Media Strategy"]
    },
    {
      id: "exp_service",
      role: "Part-time Restaurant Service Staff",
      company: "Four Points by Sheraton Danang",
      period: "2023 - Present",
      description: "Supported guest services and operational requirements for upscale guest services in a fast-paced 5-star hotel restaurant tier.",
      achievements: [
        "Supported restaurant operations in a high-intensity, luxury hotel environment.",
        "Delivered premium hospitality standards and accommodated bespoke requests of global clients.",
        "Refined active listening, real-time crisis handling, and collaborative teamwork across multiple service shifts."
      ],
      skillsGained: ["Customer Relations", "Active Listen & Empathy", "Stress Tolerance", "Operational Coordination"]
    }
  ] as WorkExpItem[],

  educationInfo: {
    degree: "Management Information System - MIS",
    school: "University of Economics - The University of DaNang",
    period: "2023 - 2027",
    gpa: "3.73 / 4.0",
    subjects: [
      "Database Management Systems",
      "Systems Analysis & Design",
      "Object-Oriented Programming (C# & Python)",
      "Web Development (HTML/CSS/JS/React)",
      "Mobile App Engineering (Flutter & Dart)",
      "REST API Architectures & Data Structures"
    ],
    description: "Third-year undergraduate student focused on bridging data models and organizational efficiency. Building extensive practices in programming C#, Python, Flutter, SQL DB architectures, and modern web systems."
  } as EducationItem,

  activitiesAndLanguages: [
    {
      id: "cert_toeic",
      title: "TOEIC 595 Certificate",
      issuerOrCategory: "IIG VIET NAM",
      date: "20/07/2024",
      description: "Officially certified professional English listening and reading skills under standard TOEIC metrics.",
      type: "language"
    },
    {
      id: "lang_jp",
      title: "Japanese N5",
      issuerOrCategory: "Beginner - N5",
      date: "Ongoing",
      description: "Certified beginner Japanese proficiency covering fundamental sentence structures, Hiragana, Katakana, and basic conversational patterns.",
      type: "language"
    },
    {
      id: "lang_cn",
      title: "Chinese HSK 3",
      issuerOrCategory: "Hanban Certificate",
      date: "Achieved",
      description: "Certified comfortable intermediate communication, translation, and vocabulary recognition in Chinese.",
      type: "language"
    }
  ] as ActivityCertificateItem[]
};
