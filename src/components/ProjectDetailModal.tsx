/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { X, Github, ExternalLink, Cpu, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const { language, t } = useLanguage();

  // Prevent click-throughs to the body scroll
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isDesignProject = project.category === 'design';

  return (
    <div 
      className="fixed inset-0 bg-bg-primary/90 backdrop-blur-md z-50 overflow-y-auto px-4 py-8 flex items-center justify-center transition-all duration-300"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="liquid-glass-strong rounded-[20px] sm:rounded-[24px] md:rounded-[28px] max-w-4xl w-full overflow-hidden shadow-primary relative flex flex-col xl:flex-row max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all z-10 cursor-pointer"
          aria-label={t('btn.close')}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left column (Mockup Hero & Basic Info) */}
        <div className="w-full xl:w-[45%] bg-black/50 p-4 sm:p-6 border-b xl:border-b-0 xl:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="relative aspect-video xl:aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-white/5 mb-4 sm:mb-6 flex items-center justify-center text-center">
              {project.mockupUrl.startsWith('http') || project.mockupUrl.startsWith('/src') ? (
                <img 
                  src={project.mockupUrl} 
                  alt={project.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center p-4 sm:p-6 bg-glass-surface">
                  <span className="text-white font-title text-lg sm:text-2xl font-bold mb-2">🎮 ARCADE GAME</span>
                  <p className="text-[10px] sm:text-xs text-white/50 max-w-xs leading-relaxed">Dynamic Retro Chronicles Physics Simulation</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] font-mono text-white tracking-wider uppercase">
                {isDesignProject ? (language === 'vi' ? 'Truyền thông cá nhân' : 'Personal Media Project') : (t(project.category as any) || project.category)}
              </span>
              {project.period && (
                <span className="text-xs font-mono text-white/40 font-medium">
                  {project.period}
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-title font-bold text-white mt-3 block">
              {project.title}
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-white/40 mt-1">
              {project.subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white rounded-xl text-center text-xs font-title font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                GitHub Code
              </a>
            )}
            
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-[#1877F2]/90 hover:bg-[#1877F2] text-white shadow-[#1877F2]/20 shadow-lg rounded-xl text-center text-xs font-title font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-transparent"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
                {language === 'vi' ? 'Xem Bài Viết FB' : 'View FB Post'}
              </a>
            )}

            <a
              href="#s9"
              onClick={onClose}
              className="flex-1 py-3 bg-white hover:bg-white/95 rounded-xl text-black text-center text-xs font-title font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4 text-black" />
              {t('btn.discuss')}
            </a>
          </div>
        </div>

        {/* Right column (Detailed Description & Spec Sheets) */}
        <div className="w-full xl:w-[55%] p-4 sm:p-6 xl:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] xl:max-h-[600px]">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <BookOpen className="w-4 h-4 text-white/80" />
              <span className="text-xs font-title font-bold uppercase tracking-wider">{t('project.narrative')}</span>
            </div>
            
            <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
              {project.longDescription}
            </p>

            <div className="border-t border-white/10 pt-6 mb-6">
              <div className="flex items-center gap-2 mb-3 text-white">
                <Cpu className="w-4 h-4 text-white/80" />
                <span className="text-xs font-title font-bold uppercase tracking-wider">{t('project.architecture')}</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed font-light">
                {t('project.architectureDesc')}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3.5 text-white/80">
                <Layers className="w-4 h-4" />
                <span className="text-xs font-title font-bold uppercase tracking-wider">{t('project.stack')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-white/70 hover:text-white hover:border-white/20 transition-all font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-start gap-3 mt-4">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-title font-bold text-white uppercase">{t('project.checked')}</h4>
              <p className="text-white/50 text-[10px] leading-relaxed mt-1 font-light">
                {t('project.checkedDesc')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
