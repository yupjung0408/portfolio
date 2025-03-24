document.addEventListener("DOMContentLoaded", () => {
    const $body = $("body");

    const loadingTag = `        
    <div class="loading-common-bg">
        <div class="loading-common"></div>
    </div>`;

    $body.append(loadingTag);
    const $loading = $(".loading-common-bg");

    window.onload = () => {
        setTimeout(() => {
            $loading.fadeOut(500, () => $loading.remove()); // 로딩 화면 완전히 제거
        }, 500);
    };
});
