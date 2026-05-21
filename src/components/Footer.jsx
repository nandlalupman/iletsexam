'use client';

import Image from 'next/image';

const footerLinks = {
  'Courses': ['IELTS Reading', 'IELTS Writing', 'IELTS Listening', 'IELTS Speaking', 'Full Course Bundle'],
  'Resources': ['AI Mock Tests', 'Practice Questions', 'Study Materials', 'Blog', 'Free Webinars'],
  'Company': ['About Us', 'Careers', 'Contact', 'Privacy Policy', 'Terms of Service'],
};

const socials = [
  { name: 'Instagram', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { name: 'YouTube', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  { name: 'LinkedIn', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { name: 'Twitter', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

export default function Footer() {
  return (
    <footer className="bg-navy-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy-700" />

      <div className="relative z-10">
        <div className="container-premium section-padding !pb-8">
          <div className="grid lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center shadow-md">
                    <span className="text-white text-lg">🌍</span>
                  </div>
                  <span className="text-2xl font-extrabold text-white tracking-tight">
                    IELTS<span className="text-amber-400">.my</span>
                  </span>
                </div>
              </div>
              <p className="text-amber-400/60 text-sm leading-relaxed mb-2 max-w-sm font-semibold tracking-wide uppercase" style={{ fontSize: '11px', letterSpacing: '0.15em' }}>
                International English Language Training Specialists
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
                Your Gateway to Global Success. Join our 30-day intensive IELTS program with expert trainers. 6 Band Guaranteed or Money Back.
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a key={s.name} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300" aria-label={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/40 hover:text-white transition-colors duration-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center gap-6 py-8 border-t border-white/10 mb-8">
            <a href="mailto:ielts@ielts.my" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ielts@ielts.my
            </a>
            <a href="tel:+393513214649" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +39 351 321 4649
            </a>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>&copy; {new Date().getFullYear()} IELTS.my. All rights reserved.</p>
            <p>Crafted with ❤️ for IELTS aspirants worldwide</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
