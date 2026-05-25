/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, MapPin, Phone, Github, Linkedin, Facebook, Settings, Key, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactForm() {
  const { t, data, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Delivery configuration state
  const [deliveryMode, setDeliveryMode] = useState<'api' | 'mailto'>(() => {
    return (localStorage.getItem('portfolio_delivery_mode') as 'api' | 'mailto') || 'api';
  });
  const [web3Key, setWeb3Key] = useState(() => {
    return localStorage.getItem('portfolio_web3_key') || '7f2ede5f-7a05-42ae-89cd-d41f6628b327';
  });
  const [showConfig, setShowConfig] = useState(false);
  const [tempKey, setTempKey] = useState(web3Key);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = tempKey.trim();
    localStorage.setItem('portfolio_web3_key', cleanKey);
    localStorage.setItem('portfolio_delivery_mode', cleanKey ? 'api' : 'mailto');
    setWeb3Key(cleanKey);
    setDeliveryMode(cleanKey ? 'api' : 'mailto');
    setShowConfig(false);
    setErrorMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');
    setErrorMsg(null);

    const emailTo = data.s9.highlights[0] || 'doanxuantoan3524@gmail.com';

    if (deliveryMode === 'api') {
      if (!web3Key) {
        setStatus('idle');
        setErrorMsg(
          language === 'vi'
            ? 'Vui lòng nhấn nút "Cài đặt hòm thư" bên dưới để dán Access Key Web3Forms giúp kích hoạt tính năng gửi thư tự động!'
            : 'Access Key is required for auto-sending mode! Please configure it below.'
        );
        setShowConfig(true);
        return;
      }

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: web3Key,
            name: name,
            email: email,
            subject: subject || `Portfolio Contact from ${name}`,
            message: message,
            from_name: `${name} (Portfolio Website)`,
            to_email: emailTo
          })
        });

        const result = await response.json();
        if (result.success) {
          setStatus('success');
          setName('');
          setEmail('');
          setSubject('');
          setMessage('');
        } else {
          throw new Error(result.message || 'Error occurred during sending');
        }
      } catch (err: any) {
        console.error(err);
        setStatus('idle');
        setErrorMsg(
          language === 'vi'
            ? `Lỗi gửi tự động: ${err.message || 'Mã Access Key lỗi hoặc sự cố mạng'}.`
            : `Transmission failed: ${err.message || 'Invalid key or network problem'}.`
        );
      }
    } else {
      // Mailto mode
      setTimeout(() => {
        const mailtoSubject = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
        const mailtoBody = encodeURIComponent(
          `Họ tên / Name: ${name}\n` +
          `Email liên hệ / Contact Email: ${email}\n` +
          `Tiêu đề / Subject: ${subject || 'N/A'}\n\n` +
          `Nội dung tin nhắn / Message:\n${message}\n\n` +
          `--- Gửi từ Web Portfolio ---`
        );
        
        window.location.href = `mailto:${emailTo}?subject=${mailtoSubject}&body=${mailtoBody}`;

        setStatus('success');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 1000);
    }
  };

  const contactInfos = [
    { label: 'Email', value: data.s9.highlights[0], icon: <Mail className="w-4 h-4 text-white" />, href: `mailto:${data.s9.highlights[0]}` },
    { label: 'Phone', value: data.s9.highlights[4], icon: <Phone className="w-4 h-4 text-white" />, href: `tel:${data.s9.highlights[4].replace(/\s+/g, '')}` },
    { label: 'Location', value: 'Danang City, Vietnam', icon: <MapPin className="w-4 h-4 text-white" />, href: 'https://maps.google.com/?q=Danang' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Github className="w-4 h-4" />, href: 'https://github.com/tooru352' },
    { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://www.linkedin.com/in/tooru352/' },
    { name: 'Facebook', icon: <Facebook className="w-4 h-4" />, href: 'https://www.facebook.com/toandoan.3524' },
  ];

  return (
    <div className="w-full grid lg:grid-cols-12 gap-8 items-stretch animate-fade-rise">
      {/* Contact Channels Card */}
      <div className="lg:col-span-5 liquid-glass-strong rounded-dashboard p-6 xl:p-8 flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -z-10 group-hover:bg-white/10 transition-all duration-700" />
        
        <div>
          <h3 className="text-xl font-title font-bold text-white mb-2">{t('contact.dir')}</h3>
          <p className="text-xs text-white/55 leading-relaxed max-w-sm mb-6 font-light">
            {t('contact.desc')}
          </p>

          <div className="space-y-4">
            {contactInfos.map((info) => (
              <a 
                key={info.label} 
                href={info.href}
                className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl hover:bg-white/5 transition-all group/item"
              >
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl group-hover/item:scale-110 transition-transform">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{info.label}</h4>
                  <p className="text-xs font-medium text-white group-hover/item:text-white/80 transition-colors mt-0.5">{info.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 mx-1">
          <h4 className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-4 font-bold">{t('contact.social')}</h4>
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-white/80 hover:text-white rounded-xl text-center text-xs font-title font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
              >
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="lg:col-span-7 liquid-glass rounded-dashboard p-6 xl:p-8 relative">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/95 rounded-dashboard z-10"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mb-4 animate-scale-up">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-title font-bold text-white mb-2">{t('contact.success')}</h3>
              <p className="text-xs text-white/60 max-w-sm leading-relaxed mb-6 font-light">
                {t('contact.successDesc')}
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-full transition-all cursor-pointer"
              >
                {t('btn.sendAnother')}
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {errorMsg && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-start gap-3 animate-fade-in">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-light leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{t('contact.name')} <span className="text-white/40">*</span></label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Joe Dev"
                className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-white focus:bg-white/10 text-sm rounded-xl outline-none text-white placeholder-white/30 transition-all font-light"
              />
            </div>
            
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{t('contact.email')} <span className="text-white/40">*</span></label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joe@example.com"
                className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-white focus:bg-white/10 text-sm rounded-xl outline-none text-white placeholder-white/30 transition-all font-light"
              />
            </div>
          </div>

          <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{t('contact.subject')}</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Collaboration proposal / Freelance Inquiry"
              className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-white focus:bg-white/10 text-sm rounded-xl outline-none text-white placeholder-white/30 transition-all font-light"
            />
          </div>

          <div className="space-y-1.5 flex flex-col">
            <label className="text-[10px] font-mono text-white/50 uppercase tracking-wider">{t('contact.message')} <span className="text-white/40">*</span></label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={language === 'vi' ? 'Chào Toàn! Tôi muốn làm việc học thuật hoặc đối tác phần mềm...' : "Hi Toàn! I'd love to chat more about your academic MIS or software tracks..."}
              className="w-full px-4 py-3 bg-white/5 border border-white/5 hover:border-white/10 focus:border-white focus:bg-white/10 text-sm rounded-xl outline-none text-white placeholder-white/30 resize-none transition-all font-light"
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full py-4 bg-white hover:bg-white/95 rounded-xl text-black font-title font-bold text-xs shadow-primary flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('btn.sending')}
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-black" />
                {t('btn.submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
