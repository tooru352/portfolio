/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HighlightItem {
  name: string;
  icon?: string;
  detail?: string;
}

export interface SectionContent {
  title: string;
  subtitle: string;
  body: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 1 to 5
  category: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  mockupUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  period?: string;
  category: 'mobile' | 'web' | 'game' | 'design';
}

export interface WorkExpItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  skillsGained: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  gpa?: string;
  subjects: string[];
  description: string;
}

export interface ActivityCertificateItem {
  id: string;
  title: string;
  issuerOrCategory: string;
  date: string;
  description: string;
  imageUrl?: string;
  type: 'language' | 'leadership' | 'tech';
}
