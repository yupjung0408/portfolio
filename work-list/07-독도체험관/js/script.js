$(function () {
    AOS.init();

    // GNB
    // 대상을 변수에 저장
    const $window = $(window);
    const $header = $("header");
    const $subMenu = $(".submenu");
    const $menu = $(".gnb > li");
    const duration = 300;

    let lastScrollTop = 0;

    function toggleHeaderVisibility(isVisible) {
        if (isVisible) {
            $header.removeClass("hide");
        } else {
            $header.addClass("hide");
        }
    }

    // 메뉴 영역에 마우스가 들어오면(event: mouseenter)
    $menu.on("mouseenter", function () {
        // 그 영역 하위 요소 중에서 submenu 찾아서 페이드인
        $(this).find($subMenu).stop().fadeIn(duration);

        // 메뉴 활성화 표시: on클래스 부여
        $(this).addClass("on");
    });

    // 메뉴 영역에 마우스가 나가면
    $menu.on("mouseleave", function () {
        // submenu 찾아서 페이드아웃
        $subMenu.stop().fadeOut(duration);
        $menu.removeClass("on");
    });

    // 마우스 휠을 조작했을 때
    $window.on("wheel", (e) => {
        // console.log(e);

        if (e.originalEvent.deltaY < 0) {
            // 휠을 올렸을 때 header가 보임(hide클래스 삭제)
            toggleHeaderVisibility(true);
        } else {
            toggleHeaderVisibility(false);
        }
    });

    // 스크롤 이벤트가 일어나면
    $window.on("scroll", () => {
        const scrollTop = $window.scrollTop();
        console.log(scrollTop);

        // 스크롤한 값이 저장된(마지막에 위치했던) 스크롤 값보다 작다면
        if (scrollTop < lastScrollTop) {
            toggleHeaderVisibility(true);
        } else {
            toggleHeaderVisibility(false);
        }

        // 마지막 스크롤 값을 갱신
        lastScrollTop = scrollTop;
    });
    // e: GNB

    // s: visual-slider

    const swiper1 = new Swiper(".visual-slider", {
        // Optional parameters
        direction: "horizontal",
        loop: true,
        speed: 1000,

        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
        },

        // And if we need scrollbar
        scrollbar: {
            el: ".swiper-scrollbar",
        },
    });

    // s: notice-slider

    const swiper2 = new Swiper(".notice-slider", {
        // Optional parameters
        direction: "horizontal",
        loop: false,
        speed: 300,

        // Navigation arrows
        navigation: {
            nextEl: ".btn-next2",
            prevEl: ".btn-prev2",
        },

        slidesPerView: "auto",

        autoplay: false,
    });

    // 자동재생 상태 체크 변수
    let isPlaying = false;

    // jQuery 방식으로 버튼 선택
    const $autoBtn = $(".swiper-auto");

    $autoBtn.on("click", function () {
        if (!isPlaying) {
            // 자동재생 시작
            swiper2.params.autoplay = {
                delay: 3000,
                disableOnInteraction: false,
            };
            swiper2.autoplay.start();

            $autoBtn.addClass("paused"); // paused 클래스 추가
            $autoBtn.find("span").text("공지사항 슬라이드 자동재생정지");
            isPlaying = true;
        } else {
            // 자동재생 멈춤
            swiper2.autoplay.stop();
            swiper2.params.autoplay = false;

            $autoBtn.removeClass("paused"); // paused 클래스 제거
            $autoBtn.find("span").text("공지사항 슬라이드 자동재생시작");
            isPlaying = false;
        }
    });
});
