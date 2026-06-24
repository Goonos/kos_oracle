document.addEventListener("DOMContentLoaded", () => {
    // 1. 트러블슈팅 렌더링
    const troubleContainer = document.getElementById("trouble-container");
    DATA.troubleshooting.forEach(item => {
        troubleContainer.innerHTML += `
            <div class="bg-gray-800/50 border border-gray-800 rounded-xl p-5 md:p-6 hover:border-gray-700 transition w-full min-w-0 overflow-hidden">
                <h3 class="text-lg md:text-xl font-bold text-white mb-4 flex flex-col md:flex-row md:items-center gap-2 items-start w-full min-w-0">
                    <span class="text-[10px] md:text-xs bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full font-mono font-normal whitespace-nowrap shrink-0">Issue</span> 
                    <span class="leading-snug break-all">${item.title}</span>
                </h3>
                <div class="grid md:grid-cols-2 gap-5 md:gap-6 text-xs md:text-sm leading-relaxed text-gray-300 w-full min-w-0">
                    <div class="min-w-0 w-full">
                        <p class="mb-3"><strong class="text-blue-400">🚨 현상 (Context):</strong><br>${item.context}</p>
                        <p class="mb-3"><strong class="text-blue-400">🔍 원인 분석 (Analysis):</strong><br>${item.analysis}</p>
                        <p><strong class="text-blue-400">💡 해결 조치 (Action):</strong><br>${item.action}</p>
                    </div>
                    <div class="min-w-0 w-full overflow-hidden flex flex-col">
                        <p class="mb-3"><strong class="text-emerald-400">📈 결과 (Result):</strong><br>${item.result}</p>
                        <strong class="text-gray-400 block mb-2">💻 수정된 쿼리/코드:</strong>
                        <pre class="w-full max-w-full block rounded-lg p-3 md:p-4 bg-gray-950 border border-gray-800 overflow-x-auto text-[10px] md:text-xs font-mono"><code class="language-sql">${item.code}</code></pre>
                    </div>
                </div>
            </div>
        `;
    });

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

    // 3. 블로그 로그 렌더링 및 2x3 면 분할 슬라이더 알고리즘 (⭐️ 2x3 최적화 반영)
    const blogContainer = document.getElementById("blog-container");
    
    if (DATA.blogLogs && DATA.blogLogs.length > 0) {
        const itemsPerPage = 6; // 변경 완료: 한 페이지에 노출될 최대 카드 개수 (2열 x 3행 = 6)
        const totalItems = DATA.blogLogs.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        let currentPage = 0;

        // 전체 데이터를 6개씩 쪼개어 가로 슬라이드용 '페이지 격자판' 생성
        for (let i = 0; i < totalPages; i++) {
            const startIdx = i * itemsPerPage;
            const endIdx = Math.min(startIdx + itemsPerPage, totalItems);
            const chunk = DATA.blogLogs.slice(startIdx, endIdx);

            // 변경 완료: lg:grid-cols-2 구조로 배치하여 최대 2x3 격자를 이룸
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

        // 페이지 변위 조절 및 인디케이터 상태 매핑
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

    // 코드 하이라이팅 초기화
    hljs.highlightAll();
});
