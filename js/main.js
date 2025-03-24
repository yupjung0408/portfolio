document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // 로딩효과

    const loader = document.querySelector('.loader');
    const progressText = document.getElementById('progress');
    const enterButton = document.getElementById('enter-btn');
    const loadingText = document.querySelector('.loading-text');

    // 로딩 막대 45개 생성
    for (let i = 0; i < 45; i++) {
        const section = document.createElement('div');
        section.classList.add('progress-bar');
        section.style.transform = `rotate(${i * 8}deg) translate(0, -220px)`;
        loader.appendChild(section);
    }

    const sections = document.querySelectorAll('.progress-bar');
    let progress = 0;
    const speed = 30; // 로딩 속도

    // 로딩 진행률 업데이트
    function updateProgress() {
        // progress++;
        progress++;
        progressText.innerText = `${progress}%`;

        sections.forEach((section, index) => {
            if (index < progress / 2.22) {
                section.style.backgroundColor = '#fff';
                // section.style.boxShadow = '0 0 5px #56f1ff, 0 0 25px #56f1ff, 0 0 50px #56f1ff, 0 0 200px #56f1ff';
                section.style.boxShadow = 'inset 0 0 10px #56f1ff, 0 0 20px #56f1ff ';
            }
        });

        if (progress < 100) {
            requestAnimationFrame(updateProgress, speed); // 로딩 속도
        } else {
            setTimeout(() => {
                loadingText.style.display = 'none';
                loader.style.transform = 'scale(0.5)';
                // loader.style.backgroundColor = '#fff';
                progressText.style.display = 'none';
                enterButton.style.display = 'flex';
            }, 500);
        }
    }

    // 로딩 시작
    updateProgress();

    // 엔터 버튼 클릭 시 포트폴리오 표시
    enterButton.addEventListener('click', () => {
        const loadingWrap = document.querySelector('.loader-warp');
        const mainWrap = document.querySelector('.main-wrap');
        gsap.set(loadingWrap, {
            autoAlpha: 0,
        });

        gsap.from(mainWrap, {
            duration: 0.7,
            clipPath: 'inset(50% 0)',
            ease: 'power4.inOut',
            onComplete: () => {
                const glitchElement = document.querySelector('.glitch');

                function startGlitchEffect() {
                    glitchElement.classList.add('on'); // 글리치 효과 켜기

                    setTimeout(() => {
                        glitchElement.classList.remove('on'); // 글리치 효과 끄기
                    }, 300); // 글리치 효과 지속 시간 (0.3초)

                    setTimeout(startGlitchEffect, 1000); // 1초 후 다시 효과 시작
                }

                // 1초 후 글리치 효과 시작
                setTimeout(startGlitchEffect, 1000);

                // 첫 번째 글리치 효과는 0.5초 후 시작
                startGlitchEffect(500);
            },
        });
    });
});
