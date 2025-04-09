document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // 커서에서 큰 원과 작은 원에 대한 변수선언
    const cursorBig = document.querySelector('.big');
    const cursorSmall = document.querySelector('.small');
    const a = document.querySelectorAll('a');

    // 두 개의 원을 원하는 위치에 배치
    document.addEventListener('mousemove', function (e) {
        const x = e.clientX;
        const y = e.clientY;

        cursorBig.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;

        cursorSmall.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
    });

    // 커서를 클릭하면 클래스가 추가됨
    document.addEventListener('mousedown', function () {
        cursorBig.classList.add('click');
        cursorSmall.classList.add('hover__small');
    });

    // 커서가 클릭을 멈추면 클래스를 제거함
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

    // 마우스가 호버링되고 호버링이 중단되면 클래스를 추가하고 제거함
    // a 태그에 마우스 호버시 클래스 추가
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
