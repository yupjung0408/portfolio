document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

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

    // Matter.js 모듈 설정
    const { Engine, Render, World, Bodies, Body, Composite, Constraint, Events, Query, Mouse, MouseConstraint } =
        Matter;

    // 엔진 생성
    const engine = Engine.create();
    const world = engine.world;

    // 키워드 배열
    const keywords = [
        '꾸준한',
        '신중한',
        '배려',
        '상상력',
        '계획적인',
        '노력',
        '끈기있는',
        '섬세한',
        '일관성',
        '소통하는',
        '창의적인',
        '집중력',
    ];

    // Matter.js 관련 변수들
    let render;
    let matterContainer;
    let bounds;
    let isPersonalityActive = false;
    let mouse;
    let mouseConstraint;

    // Matter.js 초기화 함수
    function initMatter() {
        matterContainer = document.getElementById('matter-container');
        const containerRect = matterContainer.getBoundingClientRect();

        // 엔진 설정 업데이트
        engine.world.gravity.y = 0.5;
        engine.timing.timeScale = 1;

        // 렌더러 설정
        render = Render.create({
            element: matterContainer,
            engine: engine,
            options: {
                width: containerRect.width,
                height: containerRect.height,
                wireframes: false,
                background: 'transparent',
                showDebug: false,
                showBroadphase: false,
                showBounds: false,
                showVelocity: false,
                showSeparations: false,
                showAxes: false,
                showPositions: false,
                showShadows: false,
            },
        });

        // 마우스 설정 개선
        mouse = Mouse.create(render.canvas);
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });

        // 마우스 이벤트 처리 개선
        render.canvas.addEventListener('mousedown', function (event) {
            const mousePosition = {
                x: event.offsetX,
                y: event.offsetY,
            };
            const bodies = Query.point(world.bodies, mousePosition);

            if (bodies.length > 0) {
                const body = bodies[0];
                if (body.label === 'keyword') {
                    const force = {
                        x: (Math.random() - 0.5) * 0.5,
                        y: (Math.random() - 0.5) * 0.5,
                    };

                    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.5);
                    Body.applyForce(body, body.position, force);
                    Body.setVelocity(body, {
                        x: (Math.random() - 0.5) * 20,
                        y: (Math.random() - 0.5) * 20,
                    });
                }
            }
        });

        // 우클릭 이벤트 처리
        render.canvas.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            const mousePosition = {
                x: event.offsetX,
                y: event.offsetY,
            };
            const bodies = Query.point(world.bodies, mousePosition);

            if (bodies.length > 0) {
                const body = bodies[0];
                if (body.label === 'keyword') {
                    const force = {
                        x: (Math.random() - 0.5) * 0.8,
                        y: (Math.random() - 0.5) * 0.8,
                    };

                    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.8);
                    Body.applyForce(body, body.position, force);
                    Body.setVelocity(body, {
                        x: (Math.random() - 0.5) * 30,
                        y: (Math.random() - 0.5) * 30,
                    });
                }
            }
        });

        World.add(world, mouseConstraint);

        // 경계 생성
        bounds = {
            left: Bodies.rectangle(0, containerRect.height / 2, 20, containerRect.height, {
                isStatic: true,
                render: { visible: false },
            }),
            right: Bodies.rectangle(containerRect.width, containerRect.height / 2, 20, containerRect.height, {
                isStatic: true,
                render: { visible: false },
            }),
            top: Bodies.rectangle(containerRect.width / 2, 0, containerRect.width, 20, {
                isStatic: true,
                render: { visible: false },
            }),
            bottom: Bodies.rectangle(containerRect.width / 2, containerRect.height, containerRect.width, 20, {
                isStatic: true,
                render: { visible: false },
            }),
        };

        // 경계를 월드에 추가
        World.add(world, [bounds.left, bounds.right, bounds.top, bounds.bottom]);

        // 키워드 생성
        keywords.forEach((keyword, index) => {
            const x = Math.random() * (containerRect.width - 200) + 100;
            const y = Math.random() * (containerRect.height - 100) + 50;

            const keywordBody = Bodies.rectangle(x, y, 220, 80, {
                render: {
                    fillStyle: '#05c7f2',
                    strokeStyle: '#05c7f2',
                    lineWidth: 2,
                    sprite: {
                        texture: createKeywordTexture(keyword),
                    },
                },
                friction: 0.3,
                restitution: 0.6,
                label: 'keyword',
                chamfer: { radius: 20 },
                density: 0.001,
                frictionAir: 0.001,
                collisionFilter: {
                    group: 0,
                    category: 0x0001,
                    mask: 0xffffffff,
                },
            });

            World.add(world, keywordBody);
        });

        // 키워드 텍스처 생성 함수
        function createKeywordTexture(text) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 220;
            canvas.height = 80;

            // 배경 그리기
            ctx.fillStyle = '#05c7f2';
            ctx.beginPath();
            ctx.roundRect(0, 0, 220, 80, 20);
            ctx.fill();

            // 텍스트 스타일 설정
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px pretendard';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // 텍스트 그리기
            ctx.fillText(text, 110, 40);

            return canvas.toDataURL();
        }

        // 물리 엔진과 렌더러 실행
        Matter.Runner.run(engine);
        Render.run(render);
    }

    // Matter.js 정리 함수
    function cleanupMatter() {
        if (render) {
            Render.stop(render);
            World.clear(world);
            render.canvas.remove();
        }
    }

    // 탭 전환 시 Matter.js 처리
    function handleTabChange(index) {
        if (index === 2) {
            // Personality 탭
            if (!isPersonalityActive) {
                initMatter();
                isPersonalityActive = true;
            }
        } else {
            if (isPersonalityActive) {
                cleanupMatter();
                isPersonalityActive = false;
            }
        }
    }

    // 기존 탭 메뉴 코드 수정
    $(function () {
        const $tabMenu = $('.tab-menu li');
        const $tabItem = $('.tab-item');

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
                    handleTabChange(index); // 탭 변경 시 Matter.js 처리
                },
                $currentTab.length ? 500 : 0
            );

            $tabMenu.removeClass('active');
            $tabMenu.eq(index).addClass('active');
        }
    });
});
