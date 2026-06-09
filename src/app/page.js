
"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";

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
            <Script src="/canvas.js" strategy="lazyOnload" />
            <div id="intro-popup" className={`intro-popup ${!isPopupVisible ? 'hidden' : ''}`}>
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

            <div dangerouslySetInnerHTML={{ __html: `

    

    

    <section className="hero">
        <canvas id="hero-canvas" className="hero-canvas"></canvas>

        <h1 className="hero-big-text">
            <span>taeo.design</span>
            <span>Workflow Class</span>
        </h1>
        <div className="hero-description">
            <div className="hero-desc-content">
                <h2>일하는 방식을 배우는<br />산업디자인 실무 워크플로우</h2>
                <p>현업 에이전시 주니어 산업디자이너와 함께 AI 툴을 활용하여 기획 리서치부터 렌더링 연출까지 하나의 완성된 프로젝트를 경험합니다.</p>
            </div>
        </div>
    </section>

    <section id="mentor" className="container section-py">
        <div className="two-col">
            <div className="section-label">About Mentor</div>
            <div className="mentor-content">
                <h3>Agency<br />Industrial Designer.</h3>
                <p className="mentor-text">
                    삼성·제일기획 협업 프로젝트와 글로벌 프로젝트 실무 경험, BMW·LG생활건강 산학 프로젝트 참여 경험을 바탕으로 실제 산업디자인 실무에서 사용하는 사고 방식과 작업 프로세스를
                    전달합니다. 또한 디자인 동아리 프로젝트에서 운영기획을 총괄하며 다양한 프로젝트를 관리하고 협업하는 과정에서 쌓은 실무적인 디자인 사고와 협업 구조를 함께 공유합니다. 단순히 툴을
                    다루는 수업이 아닌 <strong>"왜 이 디자인을 하는가"</strong>를 설명할 수 있는 논리적인 디자인 프로세스, 그리고 실무에서 바로 활용할 수 있는 파일 관리 방식과
                    협업 프로세스까지 함께 배울 수 있도록 돕습니다.
                </p>
            </div>
        </div>
        <div className="stats-grid">
            <div className="stat-item">
                <div className="stat-title">디자인 프로젝트</div>
                <div className="stat-value">20<span className="stat-unit">+ 프로젝트</span></div>
            </div>
            <div className="stat-item">
                <div className="stat-title">브랜드 협업</div>
                <div className="stat-value">4<span className="stat-unit">개 브랜드</span></div>
            </div>
            <div className="stat-item">
                <div className="stat-title">AI 워크샵</div>
                <div className="stat-value">4<span className="stat-unit">회 진행</span></div>
            </div>
            <div className="stat-item">
                <div className="stat-title">디자인 &amp; AI 툴</div>
                <div className="stat-value">10<span className="stat-unit">+ 가지</span></div>
            </div>
        </div>
    </section>

    <section id="review" className="container section-py">
        <div className="two-col">
            <div className="section-label">Review</div>
            <div className="mentor-content">
                <h3>Student's<br />Voice.</h3>
                <div className="reviews-list">
                    <div className="review-item">
                        <div className="review-header">
                            <span className="review-title">AI 워크샵 강의 파트</span>
                            <span className="review-date">2026.03.01</span>
                        </div>
                        <p className="review-text">AI를 디자인에 어떻게 활용해야 하는지 막막했는데, 단순히 이미지를 만드는 수준이 아니라 리서치와 아이디어 확장에 사용하는 방법을
                            배울 수 있어서 좋았습니다. 실제 디자인 프로세스 안에서 AI를 어떻게 활용하는지 알게 되니 작업 속도와 아이디어 정리가 훨씬 수월해졌습니다.</p>
                        <span className="review-author">멘티 김**</span>
                    </div>
                    <div className="review-item">
                        <div className="review-header">
                            <span className="review-title">기획 및 리서치 방법 수업 파트</span>
                            <span className="review-date">2026.02.24</span>
                        </div>
                        <p className="review-text">디자인을 시작할 때 항상 감으로 시작하는 경우가 많았는데, 문제 정의부터 리서치 정리, 컨셉 방향 설정까지 체계적으로 정리하는
                            방법을 배울 수 있었습니다. 특히 디자인을 논리적으로 설명하는 방법을 배울 수 있어서 프로젝트 진행 방식이 많이 달라졌습니다.</p>
                        <span className="review-author">멘티 이**</span>
                    </div>
                    <div className="review-item">
                        <div className="review-header">
                            <span className="review-title">렌더링 연출 방법 수업 파트</span>
                            <span className="review-date">2026.02.10</span>
                        </div>
                        <p className="review-text">렌더링 자체보다 어떻게 연출하고 스토리를 만드는지가 중요하다는 것을 알게 되었습니다. 실제 작업에서 사용하는 연출 방식과 후보정
                            방법을 알려주셔서 결과물의 완성도가 확실히 좋아졌습니다.</p>
                        <span className="review-author">멘티 박**</span>
                    </div>
                    <div className="review-item">
                        <div className="review-header">
                            <span className="review-title">AI 시대에 디자이너로 성장하는 방법 파트</span>
                            <span className="review-date">2026.01.26</span>
                        </div>
                        <p className="review-text">디자인 결과물뿐만 아니라 디자이너로서 어떤 태도와 방식으로 일해야 하는지 들을 수 있어서 인상 깊었습니다. 회사에서 5개월 만에
                            인정받고 신입 대상 최초로 수상하신 이야기를 들으니 왜 그렇게 평가받으셨는지 이해가 될 정도로 열정이 높은 선배님이라고 느꼈습니다. 디자이너로서 어떻게 성장해야
                            하는지 방향을 잡을 수 있는 시간이었습니다.</p>
                        <span className="review-author">멘티 김**</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="curriculum" className="container section-py">
        <div className="two-col">
            <div className="section-label">Curriculum</div>
            <div className="workflow-container">
                <h3>20 Step ID Workflow.</h3>
                <p
                    style={{marginBottom:'clamp(24px,5vw,48px)', color:'var(--sub)', fontWeight:400, fontSize:'clamp(15px,1.5vw,17px)'}}>
                    각 단계를 클릭하여 활용 프로그램과 상세 프로세스를 확인하세요.</p>

                <div className="phase-container">
                    <span className="phase-title">Phase 01. Planning &amp; Research</span>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">01</span>
                            <span className="wf-title">주제선정 (목표설정)</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">방향성과 목표를 수립하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Figma</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">02</span>
                            <span className="wf-title">데스크 리서치</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">시장 트렌드, 경쟁사 제품 분석, 기술 동향 등 기존의 데이터와 자료를 광범위하게 수집하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Figma</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">03</span>
                            <span className="wf-title">리서치 디벨롭</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">핵심 인사이트를 도출하고, 실제 제품 형태나 기능으로 연결될 수 있도록 디자인 기준을 구체화하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Figma</span></div>
                        </div>
                    </div>
                </div>

                <div className="phase-container">
                    <span className="phase-title">Phase 02. Concept &amp; Ideation</span>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">04</span>
                            <span className="wf-title">컨셉 방향성 정리 및 문서화</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">제품의 핵심 컨셉과 방향성을 명확히 정의하고 문서로 정리하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Figma</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">05</span>
                            <span className="wf-title">무드보드 제작</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">시각적 레퍼런스를 수집하여 제품의 전반적인 분위기와 스타일을 설정하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Pinterest</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">06</span>
                            <span className="wf-title">아이디어 러프스케치</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">떠오르는 아이디어를 빠르고 자유롭게 시각화하여 다양한 형태를 탐색하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Vizcom</span><span className="tool-tag">Nano banana</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">07</span>
                            <span className="wf-title">CMFP 기획</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">컨셉에 맞는 색상, 소재, 마감, 패턴을 기획하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Figma</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">08</span>
                            <span className="wf-title">아이디어 디테일 스케치</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">러프스케치를 바탕으로 구조와 비례 등 세부적인 디테일을 정교하게 다듬는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span className="tool-tag">Hand
                                    Sketch / Tablet</span></div>
                        </div>
                    </div>
                </div>

                <div className="phase-container">
                    <span className="phase-title">Phase 03. Visualization &amp; 3D</span>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">09</span>
                            <span className="wf-title">러프 모델링 + 러프 렌더링</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">기본 형태와 비례를 3D로 빠르게 구현하고 가볍게 렌더링하여 전체적인 형태감을 확인하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Rhino</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">10</span>
                            <span className="wf-title">디테일 모델링</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">실제 제품처럼 파팅 라인, 필렛 등 세부적인 디테일과 구조를 정교하게 완성하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Rhino</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">11</span>
                            <span className="wf-title">최종 렌더링</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">실제와 같은 재질, 조명, 환경을 적용하여 고품질의 최종 이미지를 완성하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Keyshot</span></div>
                        </div>
                    </div>
                </div>

                <div className="phase-container">
                    <span className="phase-title">Phase 04. Post-Production &amp; Output</span>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">12</span>
                            <span className="wf-title">렌더링 후보정</span>
                            <span className="wf-difficulty">중급과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">렌더링된 이미지의 색감, 밝기, 대비 등을 디테일하게 보정하여 완성도를 높이는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Lightroom</span><span className="tool-tag">Photoshop</span><span
                                    className="tool-tag">Nano banana</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">13</span>
                            <span className="wf-title">연출샷 합성 및 후보정</span>
                            <span className="wf-difficulty">심화과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">AI를 사용해 제품이 실제 환경에 있는 것처럼 자연스럽게 합성하고 연출하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span className="tool-tag">Nano
                                    banana</span><span className="tool-tag">Krea</span><span
                                    className="tool-tag">Photoshop</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">14</span>
                            <span className="wf-title">프로젝트 정리</span>
                            <span className="wf-difficulty">심화과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">최종 결과물을 포트폴리오나 프레젠테이션 형식으로 보기 좋게 레이아웃하고 마무리하는 단계</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span className="tool-tag">Nano
                                    banana</span><span className="tool-tag">Krea</span><span
                                    className="tool-tag">Photoshop</span></div>
                        </div>
                    </div>
                </div>

                <div className="phase-container">
                    <span className="phase-title">Phase 05. Productivity (일잘러의 습관)</span>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">*</span>
                            <span className="wf-title">업무일지 및 작업파일 정리</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">체계적인 분류 시스템(PARA 등)을 구축하고 매일의 업무 히스토리를 효율적으로 기록하는 습관</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">NotebookLM</span><span className="tool-tag">Cloud Storage</span></div>
                        </div>
                    </div>

                    <div className="workflow-row" onClick={(e) => e.currentTarget.classList.toggle('active')}>
                        <div className="row-header">
                            <span className="wf-num">*</span>
                            <span className="wf-title">레퍼런스 및 데이터 관리</span>
                            <span className="wf-difficulty">기본과정</span>
                        </div>
                        <div className="row-detail">
                            <span className="wf-subtitle">영감을 주는 시각 자료와 중요 데이터를 필요할 때 즉시 꺼내 쓸 수 있도록 아카이빙하는 방법</span>
                            <div className="tool-group"><span className="tool-label">Programs</span><span
                                    className="tool-tag">Pinterest</span><span className="tool-tag">Archive Tools</span><span
                                    className="tool-tag">COSMOS</span></div>
                        </div>
                    </div>

                    <div className="phase-upcoming">- 추가 업데이트 예정</div>
                </div>

                <div className="notice-banner">※ 4~5월 수강생 한정 : 실무 AI 디자인 원데이 워크샵 진행</div>
            </div>
        </div>
    </section>

    <section id="info" className="container section-py">
        <div className="two-col">
            <div className="section-label">Information</div>
            <div className="info-grid">
                <div className="info-box">
                    <h4>Class Type</h4>
                    <ul className="info-list">
                        <li><span className="info-label">대면 수업</span><span>마포구 홍대 망원 인근</span></li>
                        <li><span className="info-label">화상 수업</span><span>구글 미트 실시간 수업</span></li>
                        <li><span className="info-label">일정</span><span>평일 20시~ / 주말 협의</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div className="footer-logo">Taeo.Design</div>
        <div className="footer-bottom">
            <div>
                <p>Industrial Design Masterclass by Taeo</p>
                <p>Current Agency Industrial Designer</p>
            </div>
            <div>
                <p>&copy; 2026 Taeo.Design. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <div className="sticky-bottom-bar">
        <div className="sticky-text">현재 상담 신청 <strong><span id="counter">3</span>명 진행중</strong></div>
        <a href="https://forms.gle/6G1VUJsRBsH34hoo9" target="_blank" rel="noopener noreferrer" className="sticky-btn">무료 상담
            받기</a>
    </div>

    
    <button id="scroll-top-btn" className="scroll-top-btn" aria-label="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    </button>

    
    
` }} />

            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`scroll-top-btn ${showScrollTop ? 'show' : ''}`} aria-label="Scroll to top">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
            </button>
        </main>
    );
}
