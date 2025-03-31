document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // // TOP버튼

    // TOP 버튼: footer에 도달하면 나타나고 클릭 시 맨 위로 이동
    const btnTop = document.querySelector('.btn-top');

    // TOP 버튼 애니메이션
    gsap.from(btnTop, {
        autoAlpha: 0,
        scrollTrigger: {
            trigger: 'footer',
            // markers: true,
            start: 'top 100%',
            toggleActions: 'play none play reverse',
        },
    });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
});
