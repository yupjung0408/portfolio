document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // declares variables for big circle and small circle in cursor
    const cursorBig = document.querySelector('.big');
    const cursorSmall = document.querySelector('.small');
    const a = document.querySelectorAll('a');

    // positions the two circles in a desired placement
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        cursorBig.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;

        cursorSmall.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
    });

    // adds class when cursor clicks
    document.addEventListener('mousedown', function () {
        cursorBig.classList.add('click');
        cursorSmall.classList.add('hover__small');
    });

    // removes class when cursor stops clicking
    // document.addEventListener('mouseup', function () {
    //     cursorBig.classList.remove('click');
    //     cursorSmall.classList.remove('hover__small');
    // });

    document.addEventListener('mouseup', () => {
        setTimeout(() => {
            cursorBig.classList.remove('click');
        }, 150); // 클릭 효과가 바로 사라지지 않고 살짝 남아있게
        cursorSmall.classList.remove('hover__small');
    });

    // adds and removes class when mouse hovers and stops hovering
    a.forEach((item) => {
        item.addEventListener('mouseover', () => {
            cursorBig.classList.add('hover__big');
            cursorSmall.classList.add('hover__small');
        });
        item.addEventListener('mouseleave', () => {
            cursorBig.classList.remove('hover__big');
            cursorSmall.classList.remove('hover__small');
        });
    });

    // 뷰포트 밖으로 나가면 커서 숨기기
    document.addEventListener('mouseleave', () => {
        cursorBig.style.opacity = '0';
        cursorSmall.style.opacity = '0';
    });

    // 다시 들어오면 커서 보이기
    document.addEventListener('mouseenter', () => {
        cursorBig.style.opacity = '1';
        cursorSmall.style.opacity = '1';
    });
});
