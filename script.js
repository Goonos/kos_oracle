document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. 트러블슈팅 섹션 (1x1 면 분할 슬라이더)
    // ==========================================
    try {
        const troubleContainer = document.getElementById("trouble-container");
        const troubleIndicator = document.getElementById("trouble-indicator");
        const troubleIndicatorMobile = document.getElementById("trouble-indicator-mobile");
        
        if (troubleContainer && DATA.troubleshooting && DATA.troubleshooting.length > 0) {
            const tItemsPerPage = 1; 
            const tTotalItems = DATA.troubleshooting.length;
            const tTotalPages = Math.ceil(tTotalItems / tItemsPerPage);
            let tCurrentPage = 0;

            troubleContainer.innerHTML = ""; // 초기화

            for (let i = 0; i < tTotalPages; i++) {
                const item = DATA.troubleshooting[i];
                if (!item) continue;
                
                let detailsHtml = "";
                if (item.details && item.details.length > 0) {
                    item.details.forEach(det => {
                        detailsHtml += `
                            <div class="mt-4 border-t border-gray-800/80 pt-4">
                                <h4 class="text-xs md:text-sm font-bold text-blue-400 mb-1.5">${det.subtitle}</h4>
                                <p class="text-gray-400 text-xs md:text-sm leading-relaxed">${det.content}</p>
                            </div>
                        `;
                    });
                }

                let phtml = `
                    <div class="w-full shrink-0 px-1 box-border">
                        <div class="bg-gray-800/50 border border-gray-800 rounded-xl p-5 md:p-6 hover:border-gray-700 transition w-full min-w-0 overflow-hidden flex flex-col">
                            <h3 class="text-lg md:text-xl font-bold text-white mb-4 flex flex-col md:flex-row md:items-center gap-2 items-start w-full min-w-0">
                                <span class="text-[10px] md:text-xs bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full font-mono font-normal whitespace-nowrap shrink-0">Issue</span> 
                                <span class="leading-snug break-all">${item.title}</span>
                            </h3>
                            
                            <div class="grid md:grid-cols-2 gap-5 md:gap-6 text-xs md:text-sm leading-relaxed text-gray-300 w-full min-w-0">
                                <div class="min-w-0 w-full">
                                    <p class="mb-3"><strong class="text-blue-400">🚨 현상 (Context):</strong><br>${item.context}</p>
                                    <p class="mb-3"><strong class="text-emerald-400">📈 결과 (Result):</strong><br>${item.result}</p>
                                </div>
                                <div class="min-w-0 w-full overflow-hidden flex flex-col">
                                    <strong class="text-gray-400 block mb-2">💻 수정된 쿼리/코드:</strong>
                                    <pre class="w-full max-w-full block rounded-lg p-3 bg-gray-950 border border-gray-800 overflow-x-auto text-[10px] md:text-xs font-mono"><code class="language-sql">${item.code}</code></pre>
                                </div>
                            </div>

                            <div id="details-${item.id}" class="max-h-0 overflow-hidden transition-all duration-500 ease-in-out">
                                <div class="py-2">
                                    ${detailsHtml}
                                </div>
                            </div>

                            <div class="mt-4 pt-4 border-t border-gray-800/40 flex justify-end">
                                <button data-target="details-${item.id}" class="toggle-detail-btn text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md border border-gray-700 transition inline-flex items-center gap-1 cursor-pointer">
                                    <span>자세히 보기</span> <i class="fas fa-chevron-down text-[10px] transition-transform duration-300"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                troubleContainer.innerHTML += phtml;
            }

            function updateTroubleSlider() {
                const offset = tCurrentPage * 100;
                if (troubleContainer) troubleContainer.style.transform = `translateX(-${offset}%)`;
                
                const indicatorText = `Page ${tCurrentPage + 1} / ${tTotalPages}`;
                if (troubleIndicator) troubleIndicator.innerText = indicatorText;
                if (troubleIndicatorMobile) troubleIndicatorMobile.innerText = indicatorText;
            }

            const tPrevButtons = [document.getElementById("trouble-prev"), document.getElementById("trouble-prev-mobile")];
            const tNextButtons = [document.getElementById("trouble-next"), document.getElementById("trouble-next-mobile")];

            tPrevButtons.forEach(btn => {
                if (btn) {
                    btn.addEventListener("click", () => {
                        if (tCurrentPage > 0) {
                            tCurrentPage--;
                            updateTroubleSlider();
                        }
                    });
                }
            });

            tNextButtons.forEach(btn => {
                if (btn) {
                    btn.addEventListener("click", () => {
                        if (tCurrentPage < tTotalPages - 1) {
                            tCurrentPage++;
                            updateTroubleSlider();
                        }
                    });
                }
            });

            updateTroubleSlider();

            document.querySelectorAll(".toggle-detail-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const currentBtn = e.currentTarget;
                    const targetId = currentBtn.getAttribute("data-target");
                    const targetEl = document.getElementById(targetId);
                    if (!targetEl) return;
                    const icon = currentBtn.querySelector("i");
                    const btnText = currentBtn.querySelector("span");

                    if (targetEl.style.maxHeight === "" || targetEl.style.maxHeight === "0px") {
                        targetEl.style.maxHeight = targetEl.scrollHeight + "px";
                        if (icon) icon.style.transform = "rotate(180deg)";
                        if (btnText) btnText.innerText = "접기";
                        currentBtn.classList.add("bg-blue-500/10", "text-blue-400", "border-blue-500/30");
                    } else {
                        targetEl.style.maxHeight = "0px";
                        if (icon) icon.style.transform = "rotate(0deg)";
                        if (btnText) btnText.innerText = "자세히 보기";
                        currentBtn.classList.remove("bg-blue-500/10", "text-blue-400", "border-blue-500/30");
                    }
                });
            });
        }
    } catch (e) {
        console.error("Troubleshooting Error 예외 처리:", e);
    }

    // ==========================================
    // 2. 아키텍처 백서 섹션 (안전 격리 완료)
    // ==========================================
    try {
        const archContainer = document.getElementById("arch-container");
        if (archContainer && DATA.architecture) {
            archContainer.innerHTML = ""; 
            DATA.architecture.forEach(item => {
                const tagsHtml = item.tags.map(tag => `<span class="text-[10px] md:text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">${tag}</span>`).join("");
                archContainer.innerHTML += `
                    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 md:p-6 flex flex-col justify-between hover:border-blue-500/30 transition">
                        <div>
                            <div class="flex gap-1.5 mb-3 flex-wrap">${tagsHtml}</div>
                            <h3 class="text-base md:text-lg font-bold text-white mb-2 leading-snug">${item.title}</h3>
                            <p class="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">${item.summary}</p>
                        </div>
                        <a href="${item.docLink}" target="_blank" class="text-xs md:text-sm text-blue-400 font-medium hover:underline inline-flex items-center gap-1 mt-auto">
                            백서 전문 보기 <i class="fas fa-arrow-right text-[10px] md:text-xs"></i>
                        </a>
                    </div>
                `;
            });
        }
    } catch (e) {
        console.error("Architecture Error 예외 처리:", e);
    }

    // ==========================================
    // 3. 블로그 로그 및 2x3 슬라이더 알고리즘
    // ==========================================
    try {
        const blogContainer = document.getElementById("blog-container");
        const blogIndicator = document.getElementById("blog-indicator");
        const blogIndicatorMobile = document.getElementById("blog-indicator-mobile");
        
        if (blogContainer && DATA.blogLogs && DATA.blogLogs.length > 0) {
            const itemsPerPage = 6;
            const totalItems = DATA.blogLogs.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            let currentPage = 0;

            blogContainer.innerHTML = "";

            for (let i = 0; i < totalPages; i++) {
                const startIdx = i * itemsPerPage;
                const endIdx = Math.min(startIdx + itemsPerPage, totalItems);
                const chunk = DATA.blogLogs.slice(startIdx, endIdx);

                let pageHtml = `<div class="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 px-1 box-border">`;

                chunk.forEach(item => {
                    const tagsHtml = item.tags.map(tag => `<span class="text-[10px] text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded font-mono break-keep">#${tag}</span>`).join(" ");
                    pageHtml += `
                        <div class="bg-gray-800/30 border border-gray-800 rounded-lg p-4 flex flex-col justify-between hover:bg-gray-800/50 transition h-44">
                            <div>
                                <span class="text-[10px] md:text-xs text-gray-500 font-mono">${item.date}</span>
                                <h3 class="text-sm md:text-base font-bold text-white mt-1 mb-1.5 line-clamp-1">${item.title}</h3>
                                <p class="text-gray-400 text-xs leading-relaxed mb-2 line-clamp-2">${item.summary}</p>
                            </div>
                            <div class="flex justify-between items-center mt-auto pt-2 border-t border-gray-800/50">
                                <div class="flex flex-wrap gap-1">${tagsHtml}</div>
                                <a href="${item.link}" target="_blank" class="text-[10px] md:text-xs text-gray-400 hover:text-blue-400 font-medium flex items-center gap-1 shrink-0 ml-2">
                                    원문 ↗
                                </a>
                            </div>
                        </div>
                    `;
                });

                pageHtml += `</div>`;
                blogContainer.innerHTML += pageHtml;
            }

            function updateSlider() {
                const offset = currentPage * 100;
                if (blogContainer) blogContainer.style.transform = `translateX(-${offset}%)`;

                const indicatorText = `Page ${currentPage + 1} / ${totalPages}`;
                if (blogIndicator) blogIndicator.innerText = indicatorText;
                if (blogIndicatorMobile) blogIndicatorMobile.innerText = indicatorText;
            }

            const prevButtons = [document.getElementById("blog-prev"), document.getElementById("blog-prev-mobile")];
            const nextButtons = [document.getElementById("blog-next"), document.getElementById("blog-next-mobile")];

            prevButtons.forEach(btn => {
                if (btn) {
                    btn.addEventListener("click", () => {
                        if (currentPage > 0) {
                            currentPage--;
                            updateSlider();
                        }
                    });
                }
            });

            nextButtons.forEach(btn => {
                if (btn) {
                    btn.addEventListener("click", () => {
                        if (currentPage < totalPages - 1) {
                            currentPage++;
                            updateSlider();
                        }
                    });
                }
            });

            updateSlider();
        }
    } catch (e) {
        console.error("Blog Logs Error 예외 처리:", e);
    }

    // ==========================================
    // 4. 미니 앨범(Gallery) 및 안전 검증 예외 제어 (철저한 방어선 ⭐️)
    // ==========================================
    try {
        const albumGrid = document.getElementById("album-grid");
        const galleryModal = document.getElementById("gallery-modal");
        const modalImg = document.getElementById("modal-img");
        const modalTitle = document.getElementById("modal-title");
        const modalComment = document.getElementById("modal-comment");
        const modalClose = document.getElementById("modal-close");

        // HTML 내부에서 요소가 실존할 때만 구동되도록 이중 체크 설계
        if (albumGrid && DATA.album) {
            albumGrid.innerHTML = ""; 
            DATA.album.forEach((item) => {
                const itemElement = document.createElement("div");
                itemElement.className = "relative aspect-square bg-gray-900 border border-gray-700/60 rounded-lg overflow-hidden cursor-pointer group hover:border-blue-500 transition shadow-inner";
                
                itemElement.innerHTML = `
                    <div class="absolute inset-0 flex items-center justify-center text-gray-600 text-[10px] font-sans group-hover:text-blue-400 transition">
                        <i class="fas fa-image"></i>
                    </div>
                    <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition duration-300" onerror="this.style.opacity='0';">
                `;

                itemElement.addEventListener("click", () => {
                    if (modalImg) modalImg.src = item.src;
                    if (modalTitle) modalTitle.textContent = item.title;
                    if (modalComment) modalComment.innerHTML = item.comment;
                    
                    if (galleryModal) {
                        galleryModal.classList.remove("hidden");
                        galleryModal.classList.add("flex");
                    }
                    document.body.style.overflow = "hidden";
                });

                albumGrid.appendChild(itemElement);
            });
        }

        if (modalClose && galleryModal) {
            const closeModal = () => {
                galleryModal.classList.add("hidden");
                galleryModal.classList.remove("flex");
                document.body.style.overflow = "";
            };
            modalClose.addEventListener("click", closeModal);
            galleryModal.addEventListener("click", (e) => { if (e.target === galleryModal) closeModal(); });
        }
    } catch (e) {
        console.error("Album & Modal Elements가 HTML에 아직 존재하지 않습니다. (건너뜀)");
    }

    // ==========================================
    // 5. 구문 강조 모듈 로드 검증
    // ==========================================
    try {
        if (typeof hljs !== 'undefined') {
            hljs.highlightAll();
        }
    } catch (e) {
        console.error("Highlight.js 모듈 로드 누락 예외 처리:", e);
    }
});
