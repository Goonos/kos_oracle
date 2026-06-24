document.addEventListener("DOMContentLoaded", () => {
    // 1. 트러블슈팅 렌더링 및 1x1 면 분할 슬라이더 알고리즘 (⭐️ 한 페이지당 1개 사례)
    const troubleContainer = document.getElementById("trouble-container");
    
    if (DATA.troubleshooting && DATA.troubleshooting.length > 0) {
        const tItemsPerPage = 1; // ⭐️ 요구사항 반영: 한 페이지에 딱 1개만 노출
        const tTotalItems = DATA.troubleshooting.length;
        const tTotalPages = Math.ceil(tTotalItems / tItemsPerPage);
        let tCurrentPage = 0;

        // 데이터를 1개씩 쪼개어 가로 슬라이드용 페이지 생성
        for (let i = 0; i < tTotalPages; i++) {
            const item = DATA.troubleshooting[i];
            
            // 상세 항목들을 HTML 문자열로 조립
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

            // w-full shrink-0으로 감싸서 한 장의 슬라이드 페이지로 만듭니다
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

        // 트러블슈팅 슬라이더 업데이트 함수
        function updateTroubleSlider() {
            const offset = tCurrentPage * 100;
            troubleContainer.style.transform = `translateX(-${offset}%)`;
            
            const indicatorText = `Page ${tCurrentPage + 1} / ${tTotalPages}`;
            document.getElementById("trouble-indicator").innerText = indicatorText;
            document.getElementById("trouble-indicator-mobile").innerText = indicatorText;
        }

        // 트러블슈팅 이벤트 리스너 결합
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

        // 디테일 토글 버튼 이벤트 리스너 (기능 보존)
        document.querySelectorAll(".toggle-detail-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const currentBtn = e.currentTarget;
                const targetId = currentBtn.getAttribute("data-target");
                const targetEl = document.getElementById(targetId);
                const icon = currentBtn.querySelector("i");
                const btnText = currentBtn.querySelector("span");

                if (targetEl.style.maxHeight === "" || targetEl.style.maxHeight === "0px") {
                    targetEl.style.maxHeight = targetEl.scrollHeight + "px";
                    icon.style.transform = "rotate(180deg)";
                    btnText.innerText = "접기";
                    currentBtn.classList.add("bg-blue-500/10", "text-blue-400", "border-blue-500/30");
                } else {
                    targetEl.style.maxHeight = "0px";
                    icon.style.transform = "rotate(0deg)";
                    btnText.innerText = "자세히 보기";
                    currentBtn.classList.remove("bg-blue-500/10", "text-blue-400", "border-blue-500/30");
                }
            });
        });
    }

    // 2. 아키텍처 백서 렌더링
    const archContainer = document.getElementById("arch-container");
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

    // 3. 블로그 로그 렌더링 및 2x3 면 분할 슬라이더 알고리즘
    const blogContainer = document.getElementById("blog-container");
    
    if (DATA.blogLogs && DATA.blogLogs.length > 0) {
        const itemsPerPage = 6;
        const totalItems = DATA.blogLogs.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 0;

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
            blogContainer.style.transform = `translateX(-${offset}%)`;

            const indicatorText = `Page ${currentPage + 1} / ${totalPages}`;
            document.getElementById("blog-indicator").innerText = indicatorText;
            document.getElementById("blog-indicator-mobile").innerText = indicatorText;
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

    hljs.highlightAll();
});
