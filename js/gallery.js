import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe/dist/photoswipe-lightbox.esm.js';

// 갤러리 초기화 함수
function initializeGallery(galleryId) {
    const lightbox = new PhotoSwipeLightbox({
        gallery: galleryId,
        children: 'a',
        pswpModule: () => import('https://unpkg.com/photoswipe'),
        closeOnVerticalClick: true,
        closeOnClick: false,
    });
    lightbox.init();
}

// 첫 번째 갤러리 초기화
initializeGallery('#haribo-gallery');

// 두 번째 갤러리 초기화
initializeGallery('#fcseoul-gallery');
initializeGallery('#homefood-gallery');
initializeGallery('#attendance-gallery');
initializeGallery('#roulette-gallery');
initializeGallery('#christmas-gallery');
initializeGallery('#yes24-gallery');
initializeGallery('#bccard-gallery');
