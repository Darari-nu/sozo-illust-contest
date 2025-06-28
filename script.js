// --- PRELOADER LOGIC ---
window.onload = function() {
    const preloader = document.getElementById('preloader');
    const pageWrapper = document.getElementById('page-wrapper');

    // 4秒後（両方のテキストが表示された後）にメインページを表示
    setTimeout(() => {
        if(preloader) {
            preloader.classList.add('hidden');
        }
        if(pageWrapper) {
            pageWrapper.classList.add('loaded');
        }
    }, 4000); // 4秒待ってから表示開始

    // プリローダーのトランジションが終わったら、要素をDOMから消す
    setTimeout(() => {
        if(preloader) {
            preloader.style.display = 'none';
        }
    }, 5000); // 5秒後に完全に削除
};

document.addEventListener('DOMContentLoaded', () => {

    // --- カウントダウン機能 ---
    function initCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const deadline = new Date('2025-07-06T23:59:59').getTime();

        const update = () => {
            const now = new Date().getTime();
            const timeLeft = deadline - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `
                    <div class="countdown-item">
                        <span class="countdown-number">${days}</span><span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${hours}</span><span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${minutes}</span><span class="countdown-label">Mins</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number">${seconds}</span><span class="countdown-label">Secs</span>
                    </div>
                `;
            } else {
                countdownElement.innerHTML = '<span style="color: #f59e0b; font-weight: 700;">THE APPLICATION PERIOD HAS ENDED.</span>';
                clearInterval(countdownInterval);
            }
        };

        const countdownInterval = setInterval(update, 1000);
        update();
    }

    // --- FAQ アコーディオン機能 ---
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        });
    }
    
    // --- スクロール時のヘッダー背景変更 ---
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- スクロールアニメーション機能 ---
    function initScrollAnimation() {
        const targets = document.querySelectorAll('.section, .overview-item, .sample-item, .step, .faq-item');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        targets.forEach(target => {
            observer.observe(target);
        });
    }

    // --- スムーススクロール ---
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link, .cta-button');
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const headerOffset = document.querySelector('.header').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
            });
        });
    }

    // --- 初期化処理 ---
    initCountdown();
    initFAQ();
    initHeaderScroll();
    initScrollAnimation();
    initSmoothScroll();
});