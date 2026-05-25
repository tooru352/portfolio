/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Code, Server, Smartphone, Database, Terminal, Globe, Star } from 'lucide-react';

export default function InteractiveSkills() {
  const { language, data } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoriesRaw = ['All', 'Programming Languages', 'Framework & Technologies', 'Database', 'Tools', 'Concept', 'Design Tools', 'Languages'];

  const categoryMetadata = [
    {
      id: 'Programming Languages',
      titleVi: 'Ngôn ngữ Lập trình Cốt lõi',
      titleEn: 'Core Programming Languages',
      subtitleVi: 'Nền tảng cú pháp mạnh mẽ cho việc phát triển tư duy logic và thuật toán game',
      subtitleEn: 'Robust syntax foundations for constructing gameplay logic and solid backends',
    },
    {
      id: 'Framework & Technologies',
      titleVi: 'Hệ công nghệ & Framework',
      titleEn: 'Framework & Technologies',
      subtitleVi: 'Khai phá Unity Engine cho game, Flutter cho di động và Django cho ứng dụng web',
      subtitleEn: 'Unleashing Unity Engine for games, Flutter for mobile packages, and Django for systems',
    },
    {
      id: 'Database',
      titleVi: 'Hệ quản trị Cơ sở dữ liệu',
      titleEn: 'Database Management Systems',
      subtitleVi: 'Hệ quản trị cơ sở dữ liệu quan hệ SQL Server kết hợp luồng NoSQL linh hoạt với MongoDB',
      subtitleEn: 'Relational storage structures with SQL Server and flexible NoSQL models with MongoDB',
    },
    {
      id: 'Tools',
      titleVi: 'Hệ sinh thái Công cụ & IDE',
      titleEn: 'Tools & Development Workspace',
      subtitleVi: 'Các môi trường phát triển chính VS Code, Android Studio, IntelliJ và hệ kiểm soát Git',
      subtitleEn: 'Modern development suites (Android Studio, VS Code, IntelliJ) and Git code versioning',
    },
    {
      id: 'Concept',
      titleVi: 'Học thuyết & Tư duy cốt lõi',
      titleEn: 'Core Architecture Concepts',
      subtitleVi: 'Khai phóng mô hình hướng đối tượng OOP và tích hợp truyền tải chuẩn REST API',
      subtitleEn: 'Object-Oriented Programming principles and structured RESTful data architectures',
    },
    {
      id: 'Design Tools',
      titleVi: 'Mỹ thuật số & Công cụ Thiết kế',
      titleEn: 'Creative Design Tools Suite',
      subtitleVi: 'Bộ công cụ sáng tạo Adobe Photoshop, Illustrator, các phần mềm dựng video, bảng vẽ số',
      subtitleEn: 'Digital illustrations, dynamic visual banners, and video edit environments',
    },
    {
      id: 'Languages',
      titleVi: 'Năng lực Định danh Ngoại ngữ',
      titleEn: 'Linguistic Talents Network',
      subtitleVi: 'Khả năng học liệu toàn cầu và làm việc nhóm với Tiếng Anh, Nhật N5, Trung HSK 3',
      subtitleEn: 'Facilitating international collaboration with English, Japanese, and Chinese competencies',
    }
  ];

  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return language === 'vi' ? 'Tất cả' : 'All';
    switch (cat) {
      case 'Programming Languages': return language === 'vi' ? 'Ngôn ngữ Lập trình' : 'Programming Languages';
      case 'Framework & Technologies': return language === 'vi' ? 'Khung công nghệ' : 'Framework & Tech';
      case 'Database': return language === 'vi' ? 'Cơ sở dữ liệu' : 'Database';
      case 'Tools': return language === 'vi' ? 'Công cụ' : 'Tools';
      case 'Concept': return language === 'vi' ? 'Tư duy Độc lập' : 'Concepts';
      case 'Design Tools': return language === 'vi' ? 'Công cụ Thiết kế' : 'Design Tools';
      case 'Languages': return language === 'vi' ? 'Ngoại ngữ' : 'Languages';
      default: return cat;
    }
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'Programming Languages': return <Code className="w-4 h-4 text-white/70 group-hover:text-emerald-400 group-hover:rotate-6 transition-all duration-300" />;
      case 'Framework & Technologies': return <Server className="w-4 h-4 text-white/70 group-hover:text-amber-400 group-hover:-translate-y-0.5 transition-all duration-300" />;
      case 'Database': return <Database className="w-4 h-4 text-white/70 group-hover:text-indigo-400 group-hover:scale-115 transition-all duration-300" />;
      case 'Tools': return <Terminal className="w-4 h-4 text-white/70 group-hover:text-purple-400 group-hover:rotate-12 transition-all duration-300" />;
      case 'Concept': return <Star className="w-4 h-4 text-white/70 group-hover:text-amber-400 transition-all duration-300" />;
      case 'Design Tools': return <Smartphone className="w-4 h-4 text-white/70 group-hover:text-sky-400 group-hover:scale-110 transition-all duration-300" />;
      case 'Languages': return <Globe className="w-4 h-4 text-white/70 group-hover:text-pink-400 group-hover:animate-spin-slow transition-all duration-300" />;
      default: return <Star className="w-4 h-4 text-white/70" />;
    }
  };

  // Helper to make marquee seamless by ensuring high count and mirroring the items
  const getMarqueeItems = (skills: any[]) => {
    if (!skills || skills.length === 0) return [];
    const minItems = 15;
    const repeatCount = Math.ceil(minItems / skills.length);
    const singleSet = Array(repeatCount).fill(skills).flat();
    return [...singleSet, ...singleSet];
  };

  const categoriesToRender = selectedCategory === 'All'
    ? categoriesRaw.filter(cat => cat !== 'All')
    : [selectedCategory];

  const marqueeStyles = `
    @keyframes marquee-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes marquee-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-marquee-left {
      animation: marquee-left 32s linear infinite;
    }
    .animate-marquee-right {
      animation: marquee-right 32s linear infinite;
    }
    .pause-on-hover:hover .marquee-content {
      animation-play-state: paused;
    }
    .animate-spin-slow {
      animation: spin 8s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;

  return (
    <div className="w-full relative">
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      {/* Interactive Category Selector (Pills) */}
      <div className="flex flex-nowrap overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 mb-14 w-full max-w-5xl mx-auto px-4 z-20 relative pb-2 md:pb-0">
        {categoriesRaw.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              id={`skill-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedCategory(category)}
              className={`px-4.5 py-2.5 text-xs font-title font-bold tracking-wide rounded-full border transition-all duration-300 shadow-sm cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-white text-black border-transparent scale-105 shadow-primary'
                  : 'liquid-glass hover:bg-white/10 text-white/60 hover:text-white border-white/5'
              }`}
            >
              {getCategoryLabel(category)}
            </button>
          );
        })}
      </div>

      {/* Structured Lanes with Scrolling Marquees */}
      <div className="space-y-12 max-w-7xl mx-auto pb-4">
        {categoriesToRender.map((catId, index) => {
          const metadata = categoryMetadata.find(m => m.id === catId);
          if (!metadata) return null;

          const categorySkills = data.skillDetails.filter(skill => skill.category === catId);
          if (categorySkills.length === 0) return null;

          const title = language === 'vi' ? metadata.titleVi : metadata.titleEn;
          const subtitle = language === 'vi' ? metadata.subtitleVi : metadata.subtitleEn;
          const direction = index % 2 === 0 ? 'left' : 'right';

          const marqueeItems = getMarqueeItems(categorySkills);

          return (
            <div 
              key={catId} 
              id={`skill-section-${catId.toLowerCase().replace(/\s+/g, '-')}`}
              className="relative animate-fade-rise"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Category Header with localized descriptions */}
              <div className="px-6 mb-5 flex flex-col md:flex-row md:items-end justify-between gap-2 border-l-2 border-white/20 pl-4.5">
                <div>
                  <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase block">
                    {getCategoryLabel(catId)}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-title font-bold text-white tracking-tight mt-0.5">
                    {title}
                  </h3>
                  <p className="text-xs text-white/60 font-light mt-1">
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* Infinite Carousel lane wrapper */}
              <div className="relative w-full overflow-hidden py-4 select-none pause-on-hover">
                {/* Visual fade masks on edges */}
                <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-black via-black/30 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-black via-black/30 to-transparent z-10 pointer-events-none" />

                {/* Alternating directions marquee content */}
                <div className="flex gap-4 w-max">
                  <div 
                    className={`flex gap-4 pr-4 shrink-0 marquee-content min-w-full ${
                      direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
                    }`}
                  >
                    {marqueeItems.map((skill, idx) => (
                      <div
                        key={`${catId}-${idx}`}
                        id={`skill-card-${catId.toLowerCase()}-${skill.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`}
                        className="p-4 sm:p-5 liquid-glass rounded-bento border border-white/5 w-[240px] sm:w-[280px] shrink-0 relative group overflow-hidden select-none transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:scale-102 flex items-center gap-3.5"
                      >
                        <div className="p-2 sm:p-2.5 bg-white/5 border border-white/5 rounded-xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                          {getIconForCategory(skill.category)}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                            {getCategoryLabel(skill.category)}
                          </span>
                          <h3 className="text-sm sm:text-base font-title font-bold text-white tracking-tight">
                            {skill.name}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

