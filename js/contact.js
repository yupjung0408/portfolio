document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // contact-card 슬라이드 다운 효과
    const contactCard = document.querySelector('.contact-card');
    setTimeout(() => {
        contactCard.classList.add('slide-down');
    }, 500); // 페이지 로드 후 약간의 지연 시간을 줌

    // text
    (function () {
        var $animate, $container, $message, $paragraph, MESSAGES, animate, initialise, scramble;

        MESSAGES = [];

        MESSAGES.push({
            delay: 0,
            text: 'Name: Kim Jungyup',
        });

        MESSAGES.push({
            delay: 1200,
            text: 'Birth: 2000.04.08',
        });

        MESSAGES.push({
            delay: 2200,
            text: 'Phone: 010-4650-8314',
        });

        MESSAGES.push({
            delay: 3600,
            text: 'E-mail: kjy2782@naver.com',
        });

        MESSAGES.push({
            delay: 5200,
            text: 'Please... contact me...',
        });

        $container = $('#container');

        $message = $('#message');

        $animate = $('#animate');

        $paragraph = null;

        scramble = function (element, text, options) {
            var $element,
                addGlitch,
                character,
                defaults,
                ghostCharacter,
                ghostCharacters,
                ghostLength,
                ghostText,
                ghosts,
                glitchCharacter,
                glitchCharacters,
                glitchIndex,
                glitchLength,
                glitchProbability,
                glitchText,
                glitches,
                i,
                j,
                letter,
                object,
                order,
                output,
                parameters,
                ref,
                settings,
                shuffle,
                target,
                textCharacters,
                textLength,
                wrap;
            // Default properties.
            defaults = {
                probability: 0.2,
                glitches: '-|/\\',
                blank: '',
                duration: text.length * 40,
                ease: 'easeInOutQuad',
                delay: 0.0,
            };
            // Convert the element to a jQuery object and build the settings object.
            $element = $(element);
            settings = $.extend(defaults, options);
            // Convenience methods.
            shuffle = function () {
                if (Math.random() < 0.5) {
                    return 1;
                } else {
                    return -1;
                }
            };
            wrap = function (text, classes) {
                return `<span class="${classes}">${text}</span>`;
            };
            // Glitch values.
            glitchText = settings.glitches;
            glitchCharacters = glitchText.split('');
            glitchLength = glitchCharacters.length;
            glitchProbability = settings.probability;
            glitches = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = glitchCharacters.length; j < len; j++) {
                    letter = glitchCharacters[j];
                    results.push(wrap(letter, 'glitch'));
                }
                return results;
            })();
            // Ghost values.
            ghostText = $element.text();
            ghostCharacters = ghostText.split('');
            ghostLength = ghostCharacters.length;
            ghosts = (function () {
                var j, len, results;
                results = [];
                for (j = 0, len = ghostCharacters.length; j < len; j++) {
                    letter = ghostCharacters[j];
                    results.push(wrap(letter, 'ghost'));
                }
                return results;
            })();
            // Text values.
            textCharacters = text.split('');
            textLength = textCharacters.length;
            // Order and output arrays.
            order = function () {
                var results = [];
                for (var j = 0; 0 <= textLength ? j < textLength : j > textLength; 0 <= textLength ? j++ : j--) {
                    results.push(j);
                }
                return results;
            }
                .apply(this)
                .sort(this.shuffle);
            output = [];
            // Build the output array.
            for (i = j = 0, ref = textLength; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
                glitchIndex = Math.floor(Math.random() * (glitchLength - 1));
                glitchCharacter = glitches[glitchIndex];
                ghostCharacter = ghosts[i] || settings.blank;
                addGlitch = Math.random() < glitchProbability;
                character = addGlitch ? glitchCharacter : ghostCharacter;
                output.push(character);
            }
            // Animate the text.
            object = {
                value: 0,
            };
            target = {
                value: 1,
            };
            parameters = {
                duration: settings.duration,
                ease: settings.ease,
                step: function () {
                    var index, k, progress, ref1;
                    progress = Math.floor(object.value * (textLength - 1));
                    for (i = k = 0, ref1 = progress; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
                        index = order[i];
                        output[index] = textCharacters[index];
                    }
                    return $element.html(output.join(''));
                },
                complete: function () {
                    return $element.html(text);
                },
            };
            // Animate the text.
            return $(object).delay(settings.delay).animate(target, parameters);
        };

        animate = function () {
            var data, element, index, j, len, options;
            for (index = j = 0, len = MESSAGES.length; j < len; index = ++j) {
                data = MESSAGES[index];
                element = $paragraph.get(index);
                element.innerText = '';
                options = {
                    delay: data.delay,
                };
                scramble(element, data.text, options);
            }

            // 마지막 메시지의 delay(5200) + 애니메이션 duration(텍스트 길이 * 40) + 여유시간(500)을 계산
            const lastMessage = MESSAGES[MESSAGES.length - 1];
            const lastMessageDuration = lastMessage.text.length * 40;
            const totalDelay = lastMessage.delay + lastMessageDuration + 500;

            // 애니메이션이 완전히 끝난 후 버튼 추가
            setTimeout(() => {
                // Phone 텍스트 수정 및 버튼 추가
                const phoneText = $paragraph.eq(2);
                const phoneContent = phoneText.text().split(':');
                phoneText.html(`${phoneContent[0]}: <span class="value">${phoneContent[1]}</span>`);
                const phoneBtn = $(`
                    <button class="copy-btn" style="opacity: 0">
                        <img src="./images/copy-icon.svg" alt="copy" class="copy-icon">
                        <img src="./images/check-icon.svg" alt="copied" class="check-icon" style="display: none;">
                    </button>
                `);
                phoneText.find('.value').append(phoneBtn);

                // Email 텍스트 수정 및 버튼 추가
                const emailText = $paragraph.eq(3);
                const emailContent = emailText.text().split(':');
                emailText.html(`${emailContent[0]}: <span class="value">${emailContent[1]}</span>`);
                const emailBtn = $(`
                    <button class="copy-btn" style="opacity: 0">
                        <img src="./images/copy-icon.svg" alt="copy" class="copy-icon">
                        <img src="./images/check-icon.svg" alt="copied" class="check-icon" style="display: none;">
                    </button>
                `);
                emailText.find('.value').append(emailBtn);

                // 버튼 페이드인 효과
                setTimeout(() => {
                    $('.copy-btn').css({
                        opacity: '1',
                        transition: 'opacity 0.5s ease',
                    });
                }, 100);

                // 복사 기능 (기존 코드와 동일)
                phoneBtn.on('click', function () {
                    const btn = $(this);
                    navigator.clipboard.writeText('010-4650-8314').then(() => {
                        btn.find('.copy-icon').hide();
                        btn.find('.check-icon').show();
                        setTimeout(() => {
                            btn.find('.check-icon').hide();
                            btn.find('.copy-icon').show();
                        }, 2000);
                    });
                });

                emailBtn.on('click', function () {
                    const btn = $(this);
                    navigator.clipboard.writeText('kjy2782@naver.com').then(() => {
                        btn.find('.copy-icon').hide();
                        btn.find('.check-icon').show();
                        setTimeout(() => {
                            btn.find('.check-icon').hide();
                            btn.find('.copy-icon').show();
                        }, 2000);
                    });
                });
            }, totalDelay);
        };

        initialise = function () {
            var index, j, len, text;
            $animate.click(animate);
            for (index = j = 0, len = MESSAGES.length; j < len; index = ++j) {
                text = MESSAGES[index];
                $message.append('<p>');
            }
            $paragraph = $container.find('p');
            animate();
        };

        initialise();
    }).call(this);

    //# sourceURL=coffeescript
});
