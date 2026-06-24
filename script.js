document.addEventListener("DOMContentLoaded", () => {
    // 1. 트러블슈팅 슬라이더 로직
    const troubleContainer = document.getElementById("trouble-container");
    const troublePrev = document.getElementById("trouble-prev");
    const troubleNext = document.getElementById("trouble-next");
    const troublePrevMobile = document.getElementById("trouble-prev-mobile");
    const troubleNextMobile = document.getElementById("trouble-next-mobile");
    const troubleIndicator = document.getElementById("trouble-indicator");
    const troubleIndicatorMobile = document.getElementById("trouble-indicator-mobile");

    let troubleIndex = 0;
    const itemsPerTroublePagePC = 1;
    const itemsPerTroublePageMobile = 1;

    function renderTroubleshooting() {
        if (!troubleContainer || !DATA.troubleshooting) return;
        troubleContainer.innerHTML = DATA.troubleshooting.map(item => `
            <div class="w-full shrink-0 px-2">
                <div class="bg-gray-800/40 p-5 md:p-6 rounded-2xl border border-gray-800 space-y-4 text-left">
                    <span class="inline-block bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-mono px-2.5 py-1 rounded-full border border-blue-500/20 font-medium">CASE STUDY</span>
                    <h3 class="text-base md:text-lg font-bold text-white tracking-tight leading-snug">${item.title}</h3>
                    <div class="space-y-2 text-xs md:text-sm">
                        <p class="text-gray-300 leading-relaxed"><strong class="text-blue-400 font-medium">[현상 및 배경]</strong> <br class="md:hidden">${item.context}</p>
                        <p class="text-gray-300 leading-relaxed"><strong class="text-emerald-400 font-medium">[해결 및 결과]</strong> <br class="md:hidden">${item.result}</p>
                    </div>
                    <div class="bg-gray-950 p-3 md:p-4 rounded-xl border border-gray-800 text-left overflow-x-auto font-mono text-[11px] md:text-xs text-blue-300 leading-normal">
                        <pre><code>${item.code}</code></pre>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 2. 아키텍처 백서 렌더링 로직 (독립 분리 ⭐️)
    const archContainer = document.getElementById("arch-container");
    function renderArchitecture() {
        if (!archContainer || !DATA.architecture) return;
        archContainer.innerHTML = DATA.architecture.map(item => `
            <div class="bg-gray-800/20 p-5 md:p-6 rounded-2xl border border-gray-800/80 hover:border-gray-700/80 transition flex flex-col justify-between items-start text-left space-y-4">
                <div class="space-y-2 w-full">
                    <h3 class="text-sm md:text-base font-bold text-white tracking-tight leading-snug">${item.title}</h3>
                    <p class="text-gray-400 text-xs md:text-sm leading-relaxed">${item.summary}</p>
                </div>
                <div class="w-full space-y-3 pt-2">
                    <div class="flex flex-wrap gap-1">
                        ${item.tags.map(tag => `<span class="bg-gray-800 text-gray-400 font-mono text-[10px] px-2 py-0.5 rounded border border-gray-700/50">${tag}</span>`).join('')}
                    </div>
                    <a href="${item.docLink}" target="_blank" class="text-blue-400 hover:text-blue-300 text-xs font-medium inline-flex items-center gap-1 font-mono transition">
                        VIEW BLUEPRINT <i class="fas fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    // 3. 블로그 로그 슬라이더 로직
    const blogContainer = document.getElementById("blog-container");
    const blogPrev = document.getElementById("blog-prev");
    const blogNext = document.getElementById("blog-next");
    const blogPrevMobile = document.getElementById("blog-prev-mobile");
    const blogNextMobile = document.getElementById("blog-next-mobile");
    const blogIndicator = document.getElementById("blog-indicator");
    const blogIndicatorMobile = document.getElementById("blog-indicator-mobile");

    let blogIndex = 0;
    const itemsPerBlogPagePC = 6;
    const itemsPerBlogPageMobile = 3;

    function renderBlogLogs() {
        if (!blogContainer || !DATA.blogLogs) return;
        blogContainer.innerHTML = DATA.blogLogs.map(item => `
            <div class="w-full md:w-1/2 shrink-0 px-2 mb-4 md:mb-0">
                <a href="${item.link}" target="_blank" class="block bg-gray-800/20 p-4 rounded-xl border border-gray-800/60 hover:border-blue-500/40 transition text-left space-y-2 h-full flex flex-col justify-between">
                    <div class="space-y-1.5">
                        <div class="flex justify-between items-center text-[10px] font-mono text-gray-500">
                            <span>${item.date}</span>
                            <span class="text-blue-400/80"><i class="fab fa-python mr-0.5"></i> ${item.tags[0]}</span>
                        </div>
                        <h3 class="text-xs md:text-sm font-bold text-gray-200 line-clamp-1 group-hover:text-white">${item.title}</h3>
                        <p class="text-gray-400 text-[11px] md:text-xs leading-relaxed line-clamp-2">${item.summary}</p>
                    </div>
                </a>
            </div>
        `).join('');
    }

    // 슬라이더 업데이트 함수
    function updateSlider(type) {
        const isMobile = window.innerWidth < 768;
        if (type === 'trouble') {
            const total = DATA.troubleshooting.length;
            const perPage = isMobile ? itemsPerTroublePageMobile : itemsPerTroublePagePC;
            const maxIdx = Math.max(0, total - perPage);
            if (troubleIndex > maxIdx) troubleIndex = maxIdx;
            
            if (troubleContainer) {
                troubleContainer.style.transform = `translateX(-${troubleIndex * 100}%)`;
            }
            const curPage = troubleIndex + 1;
            const totPage = total;
            if (troubleIndicator) troubleIndicator.textContent = `Page ${curPage} / ${totPage}`;
            if (troubleIndicatorMobile) troubleIndicatorMobile.textContent = `Page ${curPage} / ${totPage}`;
        } else if (type === 'blog') {
            const total = DATA.blogLogs.length;
            const perPage = isMobile ? itemsPerBlogPageMobile : itemsPerBlogPagePC;
            
            if (isMobile) {
                const maxIdx = Math.ceil(total / perPage) - 1;
                if (blogIndex > maxIdx) blogIndex = maxIdx;
                if (blogContainer) blogContainer.style.transform = `translateX(-${blogIndex * 100}%)`;
                if (blogIndicatorMobile) blogIndicatorMobile.textContent = `Page ${blogIndex + 1} / ${maxIdx + 1}`;
            } else {
                const maxIdx = Math.ceil(total / perPage) - 1;
                if (blogIndex > maxIdx) blogIndex = maxIdx;
                if (blogContainer) blogContainer.style.transform = `translateX(-${blogIndex * 100}%)`;
                if (blogIndicator) blogIndicator.textContent = `Page ${blogIndex + 1} / ${maxIdx + 1}`;
            }
        }
    }

    // 슬라이더 이벤트 바인딩
    if (troublePrev) troublePrev.addEventListener("click", () => { if (troubleIndex > 0) { troubleIndex--; updateSlider('trouble'); } });
    if (troubleNext) troubleNext.addEventListener("click", () => { if (troubleIndex < DATA.troubleshooting.length - 1) { troubleIndex++; updateSlider('trouble'); } });
    if (troublePrevMobile) troublePrevMobile.addEventListener("click", () => { if (troubleIndex > 0) { troubleIndex--; updateSlider('trouble'); } });
    if (troubleNextMobile) troubleNextMobile.addEventListener("click", () => { if (troubleIndex < DATA.troubleshooting.length - 1) { troubleIndex++; updateSlider('trouble'); } });

    if (blogPrev) blogPrev.addEventListener("click", () => { if (blogIndex > 0) { blogIndex--; updateSlider('blog'); } });
    if (blogNext) blogNext.addEventListener("click", () => { const perPage = window.innerWidth < 768 ? itemsPerBlogPageMobile : itemsPerBlogPagePC; if (blogIndex < Math.ceil(DATA.blogLogs.length / perPage) - 1) { blogIndex++; updateSlider('blog'); } });
    if (blogPrevMobile) blogPrevMobile.addEventListener("click", () => { if (blogIndex > 0) { blogIndex--; updateSlider('blog'); } });
    if (blogNextMobile) blogNextMobile.addEventListener("click", () => { const perPage = window.innerWidth < 768 ? itemsPerBlogPageMobile : itemsPerBlogPagePC; if (blogIndex < Math.ceil(DATA.blogLogs.length / perPage) - 1) { blogIndex++; updateSlider('blog'); } });

    // 초기 실행
    renderTroubleshooting();
    renderArchitecture(); // 👈 여기서 아키텍처를 독립적으로 정확히 2개만 그립니다.
    renderBlogLogs();
    updateSlider('trouble');
    updateSlider('blog');
    window.addEventListener("resize", () => { updateSlider('trouble'); updateSlider('blog'); });


    // 4. ⭐️ 미니 앨범 (Gallery) 로직 및 모달창 완벽 격리 구현
    const albumGrid = document.getElementById("album-grid");
    const galleryModal = document.getElementById("gallery-modal");
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalComment = document.getElementById("modal-comment");
    const modalClose = document.getElementById("modal-close");

    if (albumGrid && DATA.album) {
        albumGrid.innerHTML = ""; // 잔여 찌꺼기 초기화
        DATA.album.forEach((item) => {
            const itemElement = document.createElement("div");
            itemElement.className = "relative aspect-square bg-gray-900 border border-gray-700/60 rounded-lg overflow-hidden cursor-pointer group hover:border-blue-500 transition shadow-inner";
            
            // 이미지 예외처리 및 기본 앨범 액자 구조화
            itemElement.innerHTML = `
                <div class="absolute inset-0 flex items-center justify-center text-gray-600 text-[10px] font-sans group-hover:text-blue-400 transition">
                    <i class="fas fa-image"></i>
                </div>
                <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-300" onerror="this.style.opacity='0';">
            `;

            // 클릭 시 데이터 매핑 후 모달 팝업 오픈
            itemElement.addEventListener("click", () => {
                if (modalImg) modalImg.src = item.src;
                if (modalTitle) modalTitle.textContent = item.title;
                if (modalComment) modalComment.innerHTML = item.comment;
                
                if (galleryModal) {
                    galleryModal.classList.remove("hidden");
                    galleryModal.classList.add("flex");
                }
                document.body.style.overflow = "hidden"; // 배경 스크ロール 락
            });

            albumGrid.appendChild(itemElement);
        });
    }

    // 모달창 닫기 이벤트 핸들러
    if (modalClose && galleryModal) {
        const closeModal = () => {
            galleryModal.classList.add("hidden");
            galleryModal.classList.remove("flex");
            document.body.style.overflow = ""; // 락 해제
        };
        modalClose.addEventListener("click", closeModal);
        galleryModal.addEventListener("click", (e) => { if (e.target === galleryModal) closeModal(); });
    }
});
