document.addEventListener('DOMContentLoaded', () => {
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

    // 탭 메뉴

    $(function () {
        // 대상을 변수에 저장
        const $tabMenu = $('.tab-menu li');
        const $tabItem = $('.tab-item');

        // 첫 번째 탭에 active 클래스 추가 (초기 상태)
        $tabMenu.eq(0).addClass('active');
        $tabItem.eq(0).addClass('initial').show();

        // 탭메뉴를 클릭하면
        $tabMenu.on('click', function (e) {
            // a의 기본동작(링크 이동)을 막기
            e.preventDefault();

            // 초기 상태 클래스 제거
            $tabItem.eq(0).removeClass('initial');

            // 인덱스를 구하기: index()
            const idx = $(this).index();

            tabAction(idx);
        });

        // 중복된 동작을 함수로 정의
        function tabAction(index) {
            // 현재 활성화된 탭 아이템 찾기
            const $currentTab = $tabItem.filter('.active');

            // 이전 활성 탭이 있다면 페이드 아웃 효과 적용
            if ($currentTab.length) {
                $currentTab.addClass('fade-out');
                setTimeout(() => {
                    $currentTab.removeClass('active fade-out').hide();
                }, 500);
            }

            // 새로운 탭 보여주기
            setTimeout(
                () => {
                    $tabItem.eq(index).show().addClass('active');
                },
                $currentTab.length ? 500 : 0
            );

            // 탭 메뉴 활성화 상태 변경
            $tabMenu.removeClass('active');
            $tabMenu.eq(index).addClass('active');
        }
    });

    // skill

    $(function () {
        const $tabMenu = $('.tab-menu li');
        const $tabItem = $('.tab-item');
        const progressPercentages = [85, 75, 85, 80, 95, 90, 80]; // 각 스킬별 퍼센트
        const blockWidth = 14; // 블록 너비
        const gapWidth = 10; // 간격
        const maxWidth = 440; // progress-container 최대 너비
        const maxBlocks = Math.floor(maxWidth / (blockWidth + gapWidth)); // 최대 블록 수

        $tabMenu.eq(0).addClass('active');
        $tabItem.eq(0).addClass('initial').show();

        $tabMenu.on('click', function (e) {
            e.preventDefault();
            $tabItem.eq(0).removeClass('initial');
            const idx = $(this).index();
            tabAction(idx);
        });

        function tabAction(index) {
            const $currentTab = $tabItem.filter('.active');

            if ($currentTab.length) {
                $currentTab.addClass('fade-out');
                setTimeout(() => {
                    $currentTab.removeClass('active fade-out').hide();
                }, 500);
            }

            setTimeout(
                () => {
                    $tabItem.eq(index).show().addClass('active');

                    // Skill 탭이 열릴 때만 애니메이션 실행
                    if (index === 1) {
                        animateProgressBars();
                    } else {
                        resetProgressBars();
                    }
                },
                $currentTab.length ? 500 : 0
            );

            $tabMenu.removeClass('active');
            $tabMenu.eq(index).addClass('active');
        }

        function animateProgressBars() {
            $('.progress-container').each(function (i) {
                const percentage = progressPercentages[i];
                const blocksToShow = Math.floor((percentage / 100) * maxBlocks); // 채워야 할 블록 개수
                const $container = $(this);

                $container.empty(); // 기존 블록 삭제 후 다시 추가

                for (let j = 0; j < blocksToShow; j++) {
                    $("<div class='progress-bar'></div>")
                        .appendTo($container)
                        .delay(j * 100) // 블록별 순차 등장
                        .queue(function (next) {
                            $(this).css({ opacity: 1, transform: 'scaleY(1)' });
                            next();
                        });
                }
            });
        }

        function resetProgressBars() {
            $('.progress-container').empty();
        }
    });
});
