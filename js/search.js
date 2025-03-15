// 配置参数
const CDN_BASE = 'https://cdn.jsdelivr.net/gh/kangningyuan/scholarship-query@main';
const CHUNK_COUNT = 10; // 根据实际分片数量修改
const DEBOUNCE_TIME = 500; // 防抖时间(ms)

// 全局变量
let allData = [];
let isLoading = false;

// 初始化加载
async function initialize() {
    showLoading();
    await loadAllData();
    hideLoading();
    document.getElementById('searchInput').focus();
}

// 加载所有分片数据
async function loadAllData() {
    try {
        const promises = [];
        for (let i = 0; i < CHUNK_COUNT; i++) {
            const chunkId = i.toString().padStart(3, '0');
            promises.push(
                fetch(`${CDN_BASE}/data/chunk_${chunkId}.json`)
                    .then(r => r.json())
            );
        }
        const chunks = await Promise.all(promises);
        allData = chunks.flat();
        updateStats();
    } catch (error) {
        console.error('数据加载失败:', error);
        showError('数据加载失败，请刷新重试');
    }
}

// 搜索功能
function search(keyword) {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return [];

    return allData.filter(item => {
        return (
            item.base_id.startsWith(cleanKeyword) ||     // 学号前缀匹配
            item.name.includes(cleanKeyword) ||           // 姓名匹配
            item.pinyin.includes(cleanKeyword) ||        // 拼音匹配
            item.school.includes(cleanKeyword)           // 学校匹配
        );
    });
}

// 展示结果
function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = results.map(item => `
        <div class="result-card">
            <h3>${item.name} <span class="id-tag">${item.full_id}</span></h3>
            <p>🏫 ${item.school || '未知学校'}</p>
            <p>📅 ${item.year || '未知年份'} 年获奖 | 期数：${item.period}</p>
        </div>
    `).join('');

    updateStats(results.length);
}

// 更新统计信息
function updateStats(resultCount) {
    const statsEl = document.getElementById('stats');
    statsEl.innerHTML = `共加载 ${allData.length} 条记录，找到 ${resultCount || 0} 条结果`;
}

// 防抖搜索
let debounceTimer;
document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const results = search(e.target.value);
        displayResults(results);
    }, DEBOUNCE_TIME);
});

// 加载状态控制
function showLoading() {
    isLoading = true;
    document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
    isLoading = false;
    document.getElementById('loading').style.display = 'none';
}

// 错误提示
function showError(msg) {
    const container = document.getElementById('results');
    container.innerHTML = `<div class="error-box">⚠️ ${msg}</div>`;
}

// 启动系统
initialize();