// search.js
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/kangningyuan/scholarship-query@main/data';
const CHUNK_COUNT = 10;
const DEBOUNCE_TIME = 300;

let allData = [];
let isLoading = false;

async function initialize() {
    showLoading();
    await loadAllData();
    hideLoading();
    document.getElementById('searchInput').focus();
}

async function loadAllData() {
    try {
        const promises = [];
        for (let i = 0; i < CHUNK_COUNT; i++) {
            const chunkId = i.toString().padStart(3, '0');
            promises.push(fetch(`${CDN_BASE}/chunk_${chunkId}.json`).then(r => r.json()));
        }
        const chunks = await Promise.all(promises);
        allData = chunks.flat();
        updateStats();
    } catch (error) {
        console.error('数据加载失败:', error);
        showError('数据加载失败，请刷新重试');
    }
}

function search(keyword) {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return [];

    return allData.filter(item => {
        return (
            item.base_id.startsWith(cleanKeyword) ||
            item.name.toLowerCase().includes(cleanKeyword) ||
            item.pinyin.includes(cleanKeyword) ||
            item.pinyin_initials.includes(cleanKeyword) ||  // 新增拼音缩写匹配
            (item.school && item.school.toLowerCase().includes(cleanKeyword))
        );
    });
}

function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = results.map(item => `
        <div class="result-card">
            <h3>${item.name} <span class="id-tag">${item.full_id}</span></h3>
            <p>🏫 ${item.school || '未知学校'}</p>
            <p>📅 ${item.year || '未知年份'}年获奖 | 期数：${item.period}</p>
        </div>
    `).join('');
    updateStats(results.length);
}

function updateStats(resultCount) {
    document.getElementById('stats').innerHTML = 
        `共加载 ${allData.length} 条记录，找到 ${resultCount || 0} 条结果`;
}

let debounceTimer;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        displayResults(search(e.target.value));
    }, DEBOUNCE_TIME);
});

function showLoading() {
    isLoading = true;
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    isLoading = false;
    document.getElementById('loading').style.display = 'none';
}

function showError(msg) {
    document.getElementById('results').innerHTML = 
        `<div class="error-box">⚠️ ${msg}</div>`;
}

initialize();