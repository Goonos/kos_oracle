document.addEventListener("DOMContentLoaded", () => {
    // 1. 트러블슈팅 렌더링
    const troubleContainer = document.getElementById("trouble-container");
    DATA.troubleshooting.forEach(item => {
        troubleContainer.innerHTML += `
            <div class="bg-gray-800/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition">
                <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span class="text-xs bg-red-500/10 text-red-400 px-2.5 py-1 rounded-full font-mono font-normal">Issue</span> ${item.title}
                </h3>
                <div class="grid md:grid-cols-2 gap-6 text-sm leading-relaxed text-gray-300">
                    <div>
                        <p class="mb-3"><strong class="text-blue-400">🚨 현상 (Context):</strong><br>${item.context}</p>
                        <p class="mb-3"><strong class="text-blue-400">🔍 원인 분석 (Analysis):</strong><br>${item.analysis}</p>
                        <p><strong class="text-blue-400">💡 해결 조치 (Action):</strong><br>${item.action}</p>
                    </div>
                    <div>
                        <p class="mb-3"><strong class="text-emerald-400">📈 결과 (Result):</strong><br>${item.result}</p>
                        <strong class="text-gray-400 block mb-1">💻 수정된 쿼리/코드:</strong>
                        <pre class="rounded-lg p-3 bg-gray-950 border border-gray-800 overflow-x-auto"><code class="language-sql">${item.code}</code></pre>
                    </div>
                </div>
            </div>
        `;
    });

    // 2. 아키텍처 백서 렌더링
    const archContainer = document.getElementById("arch-container");
    DATA.architecture.forEach(item => {
        const tagsHtml = item.tags.map(tag => `<span class="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">${tag}</span>`).join("");
        archContainer.innerHTML += `
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition">
                <div>
                    <div class="flex gap-1.5 mb-3 flex-wrap">${tagsHtml}</div>
                    <h3 class="text-lg font-bold text-white mb-2">${item.title}</h3>
                    <p class="text-gray-400 text-sm leading-relaxed mb-4">${item.summary}</p>
                </div>
                <a href="${item.docLink}" target="_blank" class="text-sm text-blue-400 font-medium hover:underline inline-flex items-center gap-1 mt-auto">
                    백서 전문 보기 <i class="fas fa-arrow-right text-xs"></i>
                </a>
            </div>
        `;
    });

    // 3. 블로그 로그 렌더링 (⭐️ 추가된 요청 기능)
    const blogContainer = document.getElementById("blog-container");
    DATA.blogLogs.forEach(item => {
        const tagsHtml = item.tags.map(tag => `<span class="text-xs text-blue-400 bg-blue-500/5 px-2 py-0.5 rounded font-mono">#${tag}</span>`).join(" ");
        blogContainer.innerHTML += `
            <div class="bg-gray-800/30 border border-gray-800 rounded-lg p-5 flex flex-col justify-between hover:bg-gray-800/50 transition">
                <div>
                    <span class="text-xs text-gray-500 font-mono">${item.date}</span>
                    <h3 class="text-base font-bold text-white mt-1 mb-2 line-clamp-1">${item.title}</h3>
                    <p class="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">${item.summary}</p>
                </div>
                <div class="flex justify-between items-center mt-auto pt-2 border-t border-gray-800/50">
                    <div class="flex gap-1">${tagsHtml}</div>
                    <a href="${item.link}" target="_blank" class="text-xs text-gray-400 hover:text-blue-400 font-medium flex items-center gap-1">
                        원문 ↗
                    </a>
                </div>
            </div>
        `;
    });

    // 코드 하이라이팅 초기화
    hljs.highlightAll();
});
