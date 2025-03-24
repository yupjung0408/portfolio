document.addEventListener("DOMContentLoaded", () => {
    // work.html

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // 글리치 효과

    const glitchElement = document.querySelector(".glitch");

    function startGlitchEffect() {
        glitchElement.classList.add("on"); // 글리치 효과 켜기

        setTimeout(() => {
            glitchElement.classList.remove("on"); // 글리치 효과 끄기
        }, 300); // 글리치 효과 지속 시간 (0.3초)

        setTimeout(startGlitchEffect, 1000); // 1초 후 다시 효과 시작
    }

    // 1초 후 글리치 효과 시작
    setTimeout(startGlitchEffect, 1000);

    // 첫 번째 글리치 효과는 0.5초 후 시작
    startGlitchEffect(500);

    //e: 글리치 효과

    // //s: 이미지 박스
    const title = $(".work-list-wrap h1");

    // 대상을 변수에 저장
    const workList = $(".work-list");
    const list = workList.find("li");
    const imgBox = $(".img-box");

    gsap.set(imgBox, { opacity: 0, scale: 0.8 });

    // 사진 나오게 하기
    function showImage() {
        list.on("mouseenter", function () {
            const imgIndex = $(this).index();

            // 인덱스에 해당하는 이미지 보여주기
            imgBox.html(`<img src="./images/img-box/imgbox${imgIndex + 1}.png" />`);

            // 이미지 박스 보여주기
            gsap.to(imgBox, { opacity: 1, scale: 1 });
        });

        // 이미지 박스 숨기기
        workList.on("mouseleave", () => {
            gsap.to(imgBox, { opacity: 0, scale: 0.8 });
        });
    }

    // 이미지가 마우스 따라다니게 만들기
    function followImage() {
        let x = 0,
            y = 0;
        let mx = 0,
            my = 0;
        const speed = 0.09;

        workList.on("mousemove", (e) => {
            x = e.pageX;
            y = e.pageY;
        });

        function moving() {
            mx += (x - mx) * speed;
            my += (y - my) * speed;

            gsap.to(imgBox, {
                left: mx,
                top: my,
                rotation: -mx * 0.02,
                transformOrigin: "0 0",
                scale: mx * 0.001, // x값에 따라서 크기 조절
            });

            requestAnimationFrame(moving);
        }

        moving();
    }

    // 이미지 박스 클릭 시 card의 ID 값 변경
    function clickImageBox() {
        imgBox.on("click", function () {
            const currentImg = imgBox.find("img"); // 현재 표시된 이미지 가져오기

            if (currentImg.length) {
                // 현재 img의 src에서 인덱스 번호 추출
                const imgSrc = currentImg.attr("src");
                const match = imgSrc.match(/imgbox(\d+)\.png/); // imgbox1.png, imgbox2.png 같은 패턴 찾기

                if (match) {
                    const imgIndex = match[1]; // 인덱스 값 가져오기

                    // img-box 내부의 a 태그 href 변경
                    imgBox.find("a").attr("href", `#card${imgIndex}`);
                    imgBox.attr("id", `card${imgIndex}`); // img-box에 ID 부여
                }
            }
        });
    }

    showImage();
    followImage();
    clickImageBox();

    // //e: 이미지 박스

    // 수정코드

    // 카드 등장 효과 (clipPath)
    function createCardAnimation(cardClass, gridClass, isLastCard = false) {
        const cardSelector = `.${cardClass}, .${gridClass}`;

        // 처음 등장 시 clipPath 효과
        gsap.from(cardSelector, {
            clipPath: "inset(50% 0)",
            scrollTrigger: {
                trigger: cardSelector,
                start: "top 30%",
                once: true, // 첫 등장 시 한 번만 clipPath 적용
                // onLeaveBack: (self) => self.disable(), // 뷰포트를 벗어나면 비활성화
            },
        });

        // 스크롤 시 카드 축소/사라짐 효과
        gsap.to(cardSelector, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
                trigger: cardSelector,
                start: "top 15%",
                end: "bottom 15%",
                scrub: 1,
                toggleActions: isLastCard ? "play none none none" : "play reverse play reverse",
            },
        });
    }

    // // 다시 영역에 진입하면 clipPath 효과 활성화
    // ScrollTrigger.create({
    //     trigger: cardSelector,
    //     start: 'top bottom',
    //     onEnter: () => ScrollTrigger.refresh(true),
    // });

    // 각 카드 애니메이션 설정
    createCardAnimation("card1", "grid1");
    createCardAnimation("card2", "grid2");
    createCardAnimation("card3", "grid3");
    createCardAnimation("card4", "grid4");
    createCardAnimation("card5", "grid5");
    createCardAnimation("card6", "grid6");
    createCardAnimation("card7", "grid7", true); // 마지막 카드는 사라지지 않음

    // e: 수정코드

    // // 카드 효과
    // gsap.from('.card1, .grid1', {
    //     clipPath: 'inset(50% 0)',
    //     scrollTrigger: {
    //         trigger: '.card1, .grid1',
    //         start: 'top 30%',
    //         // markers: true,
    //     },
    // });

    // gsap.to('.card1, .grid1', {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.card1, .grid1',
    //         start: 'top 15%',
    //         // markers: true,
    //         end: 'bottom 15%',
    //         scrub: 1,
    //         toggleActions: 'play reverse play reverse', // 위/아래 스크롤 시 애니메이션 반전
    //     },
    // });

    // gsap.to('.card2, .grid2', {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.card2, .grid2',
    //         start: 'top 15%',
    //         end: 'bottom 15%',
    //         scrub: 1,
    //         toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
    //     },
    // });

    // gsap.to('.card3, .grid3', {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.card3, .grid3',
    //         start: 'top 15%',
    //         end: 'bottom 15%',
    //         scrub: 1,
    //         toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
    //     },
    // });

    // gsap.to('.card4, .grid4', {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.card4 , .grid4',
    //         start: 'top 15%',
    //         end: 'bottom 15%',
    //         scrub: 1,
    //         toggleActions: 'play reverse play reverse', // 스크롤 위/아래 시 애니메이션 반전
    //     },
    // });

    // gsap.to('.card5, .grid5', {
    //     scale: 0.5,
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'none',
    //     scrollTrigger: {
    //         trigger: '.card5, .grid5',
    //         start: 'top 15%',
    //         // markers: true,
    //         end: 'bottom bottom',
    //         scrub: 1,
    //         toggleActions: 'play none none none', //  마지막 카드 사라지지 않음
    //     },
    // });

    // Scroll-down 버튼: card5에 도달하면 사라지고 다시 위로 올라가면 나타남
    const scrollDownBtn = document.querySelector(".scroll-down");
    gsap.to(scrollDownBtn, {
        opacity: 0,
        scrollTrigger: {
            trigger: ".card7",
            start: "top 100%",
            end: "bottom 100%",
            scrub: 1,
            onEnter: () => (scrollDownBtn.style.opacity = "0"),
            onLeaveBack: () => (scrollDownBtn.style.opacity = "1"),
        },
    });

    // 부드러운 스크롤
    // Initialize Lenis
    const lenis = new Lenis();

    // Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    //e: Lenis

    // // TOP버튼

    // TOP 버튼: card5에 도달하면 나타나고 클릭 시 맨 위로 이동
    const btnTop = document.querySelector(".btn-top");

    // TOP 버튼 애니메이션
    gsap.from(btnTop, {
        autoAlpha: 0,
        scrollTrigger: {
            trigger: ".card7",
            start: "bottom 100%",
            toggleActions: "play none play reverse",
        },
    });

    // 클릭했을 때 상단으로 이동
    btnTop.addEventListener("click", () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
});
