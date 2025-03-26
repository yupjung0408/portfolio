document.addEventListener('DOMContentLoaded', () => {
    // 글리치 효과
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

    // e: 글리치 효과

    const swiper = new Swiper('.graphic-slider', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        // slidesPerView: 1.5,
        // spaceBetween: 20,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction', // 숫자로 표시
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Gallery Modal Functionality
    const galleryModal = document.getElementById('gallery-modal');
    const closeGalleryBtn = document.querySelector('.close-gallery');
    const viewMoreButtons = document.querySelectorAll('.buttons a');
    const galleries = document.querySelectorAll('.pswp-gallery');

    // 갤러리 ID 매핑
    const galleryMapping = {
        haribo: 'haribo-gallery',
        fcseoul: 'fcseoul-gallery',
        homefood: 'homefood-gallery',
        attendance: 'attendance-gallery',
        roulette: 'roulette-gallery',
        christmas: 'christmas-gallery',
        yes24: 'yes24-gallery',
        bccard: 'bccard-gallery',
    };

    // Open gallery when clicking View More
    viewMoreButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // 모든 갤러리 숨기기
            galleries.forEach((gallery) => {
                gallery.classList.remove('active');
            });

            // 해당하는 갤러리만 보이기
            const galleryId = Object.values(galleryMapping)[index];
            const targetGallery = document.getElementById(galleryId);
            targetGallery.classList.add('active');

            // 모달 표시
            galleryModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close gallery when clicking close button
    closeGalleryBtn.addEventListener('click', () => {
        galleryModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling

        // 모든 갤러리 숨기기
        galleries.forEach((gallery) => {
            gallery.classList.remove('active');
        });
    });

    // Close gallery when clicking outside
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling

            // 모든 갤러리 숨기기
            galleries.forEach((gallery) => {
                gallery.classList.remove('active');
            });
        }
    });

    // Close gallery with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
            galleryModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling

            // 모든 갤러리 숨기기
            galleries.forEach((gallery) => {
                gallery.classList.remove('active');
            });
        }
    });
});
