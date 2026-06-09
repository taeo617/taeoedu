/* ── 인터랙티브 도트 캔버스 애니메이션 ── */
const popupCanvas = document.getElementById('popup-canvas');
if (popupCanvas) {
    const ctx = popupCanvas.getContext('2d');
    let dots = [];
    let mouse = { x: -1000, y: -1000 };
    let lastMouseTime = Date.now();
    let isPopupVisible = true;

    function initCanvas() {
        popupCanvas.width = window.innerWidth;
        popupCanvas.height = window.innerHeight;
        dots = [];
        const spacing = 20; 
        for (let x = 0; x <= popupCanvas.width + spacing; x += spacing) {
            for (let y = 0; y <= popupCanvas.height + spacing; y += spacing) {
                dots.push({ 
                    baseX: x, baseY: y, 
                    x: x, y: y, 
                    r: 1, targetR: 1 
                });
            }
        }
    }

    window.addEventListener('resize', () => {
        if (isPopupVisible) initCanvas();
    });

    const introPopup = document.getElementById('intro-popup');
    if(introPopup) {
        introPopup.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            lastMouseTime = Date.now(); 
        });
        introPopup.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        // Watch for popup visibility changes (React might add 'hidden' class)
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    if (introPopup.classList.contains('hidden')) {
                        isPopupVisible = false;
                    }
                }
            });
        });
        observer.observe(introPopup, { attributes: true });
    }

    function animateCanvas(time) {
        if (!isPopupVisible) return; 
        requestAnimationFrame(animateCanvas);

        ctx.clearRect(0, 0, popupCanvas.width, popupCanvas.height);

        const now = Date.now();
        const idleTime = now - lastMouseTime;
        const isIdle = idleTime > 3000; 
        const idleProgress = Math.min((idleTime - 3000) / 1000, 1); 

        for (let i = 0; i < dots.length; i++) {
            let dot = dots[i];
            let dx = dot.baseX - mouse.x;
            let dy = dot.baseY - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 180 && !isIdle) {
                const force = (180 - dist) / 180;
                dot.targetR = 1.5 + force * 3.5; 
                dot.x = dot.baseX + (dx / dist) * force * 5; 
                dot.y = dot.baseY + (dy / dist) * force * 5;
            } else {
                dot.targetR = 1.2;
                dot.x += (dot.baseX - dot.x) * 0.1;
                dot.y += (dot.baseY - dot.y) * 0.1;
            }

            if (isIdle && idleProgress > 0) {
                const wave = Math.sin(time * 0.002 + dot.baseX * 0.01 + dot.baseY * 0.01);
                dot.targetR = 1.2 + wave * 0.6 * idleProgress; 
                dot.x = dot.baseX + Math.cos(time * 0.001 + dot.baseY * 0.01) * 3 * idleProgress; 
                dot.y = dot.baseY + Math.sin(time * 0.001 + dot.baseX * 0.01) * 3 * idleProgress;
            }

            dot.r += (dot.targetR - dot.r) * 0.2;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, Math.max(0.1, dot.r), 0, Math.PI * 2);
            
            if (dot.r > 2 && !isIdle) {
                ctx.fillStyle = `rgba(202, 255, 51, ${Math.min(0.9, dot.r / 5)})`;
            } else {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.08, dot.r / 3)})`;
            }
            ctx.fill();
        }
    }

    initCanvas();
    animateCanvas(0);
}

/* ── 메인 화면(히어로) 미세 도트 캔버스 애니메이션 ── */
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
    const heroCtx = heroCanvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    let heroDots = [];
    let heroMouse = { x: -1000, y: -1000 };
    let heroLastMouseTime = Date.now();

    function initHeroCanvas() {
        if(!heroSection) return;
        heroCanvas.width = heroSection.offsetWidth;
        heroCanvas.height = heroSection.offsetHeight;
        heroDots = [];
        const spacing = 18; 
        for (let x = 0; x <= heroCanvas.width + spacing; x += spacing) {
            for (let y = 0; y <= heroCanvas.height + spacing; y += spacing) {
                heroDots.push({ 
                    baseX: x, baseY: y, 
                    x: x, y: y, 
                    r: 0.8, targetR: 0.8 
                });
            }
        }
    }

    window.addEventListener('resize', initHeroCanvas);

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            heroMouse.x = e.clientX - rect.left;
            heroMouse.y = e.clientY - rect.top;
            heroLastMouseTime = Date.now();
        });
        heroSection.addEventListener('mouseleave', () => {
            heroMouse.x = -1000;
            heroMouse.y = -1000;
        });
    }

    function animateHeroCanvas(time) {
        requestAnimationFrame(animateHeroCanvas);

        heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

        const now = Date.now();
        const idleTime = now - heroLastMouseTime;
        const isIdle = idleTime > 3000; 
        const idleProgress = Math.min((idleTime - 3000) / 1000, 1);
        
        const isDark = document.body.classList.contains('dark-mode');
        const baseRGB = isDark ? '255, 255, 255' : '0, 0, 0';

        for (let i = 0; i < heroDots.length; i++) {
            let dot = heroDots[i];
            let dx = dot.baseX - heroMouse.x;
            let dy = dot.baseY - heroMouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120 && !isIdle) {
                const force = (120 - dist) / 120;
                dot.targetR = 1.0 + force * 2.0; 
                dot.x = dot.baseX + (dx / dist) * force * 3; 
                dot.y = dot.baseY + (dy / dist) * force * 3;
            } else {
                dot.targetR = 0.8;
                dot.x += (dot.baseX - dot.x) * 0.1;
                dot.y += (dot.baseY - dot.y) * 0.1;
            }

            if (isIdle && idleProgress > 0) {
                const wave = Math.sin(time * 0.002 + dot.baseX * 0.015 + dot.baseY * 0.015);
                dot.targetR = 0.8 + wave * 0.4 * idleProgress; 
                dot.x = dot.baseX + Math.cos(time * 0.001 + dot.baseY * 0.015) * 1.5 * idleProgress; 
                dot.y = dot.baseY + Math.sin(time * 0.001 + dot.baseX * 0.015) * 1.5 * idleProgress;
            }

            dot.r += (dot.targetR - dot.r) * 0.2;

            heroCtx.beginPath();
            heroCtx.arc(dot.x, dot.y, Math.max(0.1, dot.r), 0, Math.PI * 2);
            
            if (dot.r > 1.2 && !isIdle) {
                heroCtx.fillStyle = `rgba(202, 255, 51, ${Math.min(0.8, dot.r / 3)})`;
            } else {
                heroCtx.fillStyle = `rgba(${baseRGB}, ${Math.min(0.15, dot.r / 3)})`;
            }
            heroCtx.fill();
        }
    }

    initHeroCanvas();
    animateHeroCanvas(0);
}

/* ── 상담 카운터 ── */
(function() {
    var current = Math.random() < 0.5 ? 3 : 4;
    var MAX     = 6;
    var el      = document.getElementById('counter');
    if (el) {
        el.textContent = current;

        var timer = setInterval(function() {
            if (current >= MAX) { clearInterval(timer); return; }
            current++;
            el.textContent = current;
        }, 9000); 
    }
})();
