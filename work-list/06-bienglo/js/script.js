document.addEventListener('DOMContentLoaded', () => {
    // GNB
    const header = document.querySelector('#header');
    const gnb = document.querySelector('.gnb');

    gnb.addEventListener('mouseenter', () => {
        header.classList.add('active');
    });
    gnb.addEventListener('mouseleave', () => {
        header.classList.remove('active');
    });

    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // visual slider
    const visualSlider = new Swiper('.visual-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false /* 마우스가 올라오면 멈춤 */,
        },

        effect: 'fade',
        speed: 2000,

        on: {
            slideNextTransitionStart: () => {
                gsap.from('.swiper-slide-active .visual-text', {
                    autoAlpha: 0,
                    y: 100,
                    duration: 1.6,
                    ease: 'power2.inOut',
                    delay: 1,
                });
            },
        },
    });

    // products slider
    const productsSlider = new Swiper('.products-slider', {
        // slidesPerView: 4.5,
        slidesPerView: 'auto', // css에서 가로크기를 부여
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 1000,
        },
        speed: 2600,
    });

    // GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    gsap.from('.scroll-down b', {
        y: -10,
        duration: 2,
        ease: 'elastic.out(1,0.3)',
        repeat: -1,
        // yoyo: true,
        repeatDelay: 1.5,
    });

    // visual
    const visualTL = gsap.timeline({
        defaults: { duration: 1.6, ease: 'power2.inOut' },
    });

    visualTL.from('.visual-slider-wrap', { scale: 0.9 });
    visualTL.from('.visual-slider', { scale: 1.3 }, '<');
    visualTL.from('.visual-text', { y: 100, autoAlpha: 0, duration: 1 });

    // 커서 움직이기
    let x = 0,
        y = 0;

    const visual = document.querySelector('.visual');
    const cursor = document.querySelector('.cursor');

    gsap.set(cursor, { autoAlpha: 0, scale: 0.3 });

    visual.addEventListener('mousemove', (e) => {
        // console.log(e);
        x = e.pageX;
        y = e.pageY;

        gsap.to(cursor, { left: x, top: y });
    });

    visual.addEventListener('mouseenter', () => {
        gsap.to(cursor, { autoAlpha: 1, scale: 1 });
    });
    visual.addEventListener('mouseleave', () => {
        gsap.to(cursor, { autoAlpha: 0, scale: 0.3 });
    });

    // about
    // 공통의 움직임을 위한 정의
    const leftTitles = gsap.utils.toArray('.about-con h3 span:first-child');
    // leftTitles.forEach(()=>{})
    leftTitles.forEach((title) => {
        gsap.to(title, {
            x: -300,
            ease: 'none',
            scrollTrigger: {
                trigger: title,
                // markers: true,
                start: 'top 70%', // trigger/viewport(scroller)
                scrub: 1,
            },
        });
    });

    const rightTitles = gsap.utils.toArray('.about-con h3 span:last-child');
    rightTitles.forEach((title) => {
        gsap.to(title, {
            x: 300,
            ease: 'none',
            scrollTrigger: {
                trigger: title,
                // markers: true,
                start: 'top 70%', // trigger/viewport(scroller)
                scrub: 1,
            },
        });
    });

    // 이미지 애니메이션 공통 정의
    const images = gsap.utils.toArray('.about-con-item figure');
    images.forEach((image) => {
        // gsap.from(image, { scale: 0.8, duration: 1 });

        const tl = gsap.timeline({
            defaults: { duration: 1.6, ease: 'power2.inOut' },
            scrollTrigger: {
                trigger: image,
                // markers: true,
                start: 'top 70%',
                toggleActions: 'play none reverse none', // Enter, Leave, EnterBack, LeaveBack
            },
        });
        tl.from(image, { scale: 0.8, autoAlpha: 0 });
        tl.from(image.querySelector('img'), { scale: 1.5 }, '<');
    });

    // 글자 애니메이션 공통 정의
    const titles = gsap.utils.toArray('.text-box h4, .text-box p');
    titles.forEach((title) => {
        gsap.from(title, {
            autoAlpha: 0,
            y: 100,
            duration: 1.6,
            ease: 'power2.inOut',

            scrollTrigger: {
                trigger: title,
                // markers: true,
                start: 'top 70%',
                toggleActions: 'play none reverse none',
            },
        });
    });

    // get in touch
    gsap.from('.get-in-touch-banner', {
        clipPath: 'inset(50% 0)',
        duration: 1.6,
        ease: 'power2.inOut',

        scrollTrigger: {
            trigger: '.get-in-touch-banner',
            // markers: true,
            start: 'top 70%',
            toggleActions: 'play none reverse none',
        },
    });

    // TOP버튼
    const btnTop = document.querySelector('.btn-top');
    gsap.from(btnTop, {
        autoAlpha: 0,
        scrollTrigger: {
            trigger: '.about-con-wrap',
            // markers: true,
            start: 'top 70%',
            toggleActions: 'play none play reverse',
        },
    });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
});
