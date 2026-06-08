const fs = require('fs');

let html = fs.readFileSync('/Users/taeo/taeoedu/index.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
    let body = bodyMatch[1];
    body = body.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/for=/g, 'htmlFor=');
    body = body.replace(/style="margin-bottom:clamp\(24px,5vw,48px\);color:var\(--sub\);font-weight:400;font-size:clamp\(15px,1.5vw,17px\);"/g, "style={{marginBottom:'clamp(24px,5vw,48px)', color:'var(--sub)', fontWeight:400, fontSize:'clamp(15px,1.5vw,17px)'}}");
    body = body.replace(/onclick="toggleRow\(this\)"/g, "onClick={(e) => e.currentTarget.classList.toggle('active')}");
    body = body.replace(/stroke-width/g, 'strokeWidth');
    body = body.replace(/stroke-linecap/g, 'strokeLinecap');
    body = body.replace(/stroke-linejoin/g, 'strokeLinejoin');
    body = body.replace(/<br>/g, '<br />');
    body = body.replace(/<!--[\s\S]*?-->/g, ''); // remove comments
    
    // Convert to JSX
    const pageTemplate = `
"use client";
import { useEffect, useState } from "react";
import Script from "next/script";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (!isPopupVisible) {
            document.body.classList.remove('no-scroll');
        } else {
            document.body.classList.add('no-scroll');
        }
    }, [isPopupVisible]);

    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.style.boxShadow = isDarkMode ? '0 10px 40px rgba(255,255,255,.05)' : '0 10px 40px rgba(0,0,0,.04)';
            } else {
                header.style.boxShadow = 'none';
            }

            const infoSection = document.getElementById('info');
            if (infoSection) {
                const infoRect = infoSection.getBoundingClientRect();
                if (infoRect.top < window.innerHeight) {
                    setShowScrollTop(true);
                } else {
                    setShowScrollTop(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isDarkMode]);

    const handleSmoothScroll = (e, id) => {
        e.preventDefault();
        const el = document.querySelector(id);
        if (el) window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' });
    };

    return (
        <main>
            <div id="intro-popup" className={\`intro-popup \${!isPopupVisible ? 'hidden' : ''}\`}>
                <canvas id="popup-canvas" className="popup-canvas"></canvas>
                <div className="popup-content">
                    <p>TAEO.DESIGN MASTERCLASS</p>
                    <h1>
                        <span>현업 디자이너의 AI 활용 워크플로우를</span>
                        <span>직접 경험하는 밀착 과외</span>
                    </h1>
                    <button onClick={() => setIsPopupVisible(false)} className="popup-btn">구경하기</button>
                </div>
            </div>

            <header>
                <div className="logo">Taeo.Design</div>
                <nav id="nav-menu-container" className={isMenuOpen ? 'open' : ''}>
                    <ul className="nav-menu">
                        <li><a href="#mentor" onClick={(e) => { handleSmoothScroll(e, '#mentor'); setIsMenuOpen(false); }} className="nav-item">About Mentor</a></li>
                        <li><a href="#review" onClick={(e) => { handleSmoothScroll(e, '#review'); setIsMenuOpen(false); }} className="nav-item">Review</a></li>
                        <li><a href="#curriculum" onClick={(e) => { handleSmoothScroll(e, '#curriculum'); setIsMenuOpen(false); }} className="nav-item">Curriculum</a></li>
                        <li><a href="#info" onClick={(e) => { handleSmoothScroll(e, '#info'); setIsMenuOpen(false); }} className="nav-item">Information</a></li>
                    </ul>
                </nav>
                <div className="header-btns">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="theme-toggle" aria-label="Toggle Dark Mode">
                        <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </button>
                    <a href="https://open.kakao.com/o/s74wGXki" target="_blank" rel="noopener noreferrer" className="btn-contact">Contact</a>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mobile-menu-btn" aria-label="Toggle Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </header>

            <div dangerouslySetInnerHTML={{ __html: \`${body.replace(/<div id="intro-popup"[\s\S]*?<\/div>\s*<\/div>/, '').replace(/<header>[\s\S]*?<\/header>/, '')}\` }} />

            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={\`scroll-top-btn \${showScrollTop ? 'show' : ''}\`} aria-label="Scroll to top">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            </button>
        </main>
    );
}
`;

    fs.writeFileSync('/Users/taeo/taeoedu_next/src/app/page.js', pageTemplate);
    console.log("Migration script complete");
}
