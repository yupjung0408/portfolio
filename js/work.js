document.addEventListener('DOMContentLoaded', () => {
    // work.html
    gsap.registerPlugin(ScrollTrigger);

    // 카드 효과
    gsap.to('.card1, .grid1', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.card1, .grid1',
            start: 'top 15%',
            // markers: true,
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse', // 위/아래 스크롤 시 애니메이션 반전
        },
    });

    gsap.to('.card2, .grid2', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.card2, .grid2',
            start: 'top 15%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
        },
    });

    gsap.to('.card3, .grid3', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.card3, .grid3',
            start: 'top 15%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
        },
    });

    gsap.to('.card4, .grid4', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.card4 , .grid4',
            start: 'top 15%',
            end: 'bottom 15%',
            scrub: 1,
            toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
        },
    });

    gsap.to('.card5, .grid5', {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
            trigger: '.card5, .grid5',
            start: 'top 15%',
            // markers: true,
            end: 'bottom 100%',
            scrub: 1,
            toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
        },
    });
});
