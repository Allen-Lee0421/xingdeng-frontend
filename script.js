const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", sub: "V4.0 全球化防護與偵測系統", scan: "🔍 網址詐騙掃描", report: "📢 詐騙網址通報", btnS: "開始掃描", btnR: "提交通報" },
    "en": { title: "🛡️ XingDeng Security", sub: "V4.0 Global Protection System", scan: "🔍 URL Fraud Scan", report: "📢 Report Scam", btnS: "Start Scan", btnR: "Submit" },
    "ko": { title: "🛡️ 성등 보이스피싱 방지", sub: "V4.0 글로벌 보안 시스템", scan: "🔍 URL 사기 검사", report: "📢 사기 신고", btnS: "검사 시작", btnR: "제출" },
    "ja": { title: "🛡️ 星燈詐欺対策", sub: "V4.0 グローバル防衛", scan: "🔍 URLスキャン", report: "📢 詐欺通報", btnS: "スキャン開始", btnR: "送信" }
    // 越南、印尼、菲律賓語可依此格式補齊...
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang] || translations["en"];
    document.getElementById('mainTitle').innerText = t.title;
    document.getElementById('subTitle').innerText = t.sub;
    document.getElementById('scanTitle').innerText = t.scan;
    document.getElementById('reportTitle').innerText = t.report;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnReport').innerText = t.btnR;
}

function isValidUrl(s) { try { new URL(s); return true; } catch(e) { return false; } }

function mockApi(endpoint) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (Math.random() < 0.1) rej();
            const isScam = Math.random() < 0.3;
            res({
                status: isScam ? 'Danger' : 'Safe',
                detail: isScam ? '高風險：網址與詐騙特徵高度吻合。' : '低風險：安全。',
                risk_score: Math.floor(Math.random() * 100)
            });
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('scanForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const url = document.getElementById('url_to_scan').value;
        const resBox = document.getElementById('scan_result');
        if (!isValidUrl(url)) { resBox.innerText = "❌ 格式錯誤"; return; }
        
        resBox.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 分析中...';
        try {
            const data = await mockApi('scan');
            resBox.style.backgroundColor = data.status === 'Danger' ? '#f44336' : '#4CAF50';
            resBox.innerHTML = `**${data.status}** (風險值: ${data.risk_score})<br>${data.detail}`;
        } catch { resBox.innerText = "⚠️ 系統忙碌中"; }
    });

    document.getElementById('reportForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('message');
        msg.style.display = 'block'; msg.innerText = "⏳ 提交中...";
        try {
            const data = await mockApi('report');
            msg.innerText = `✅ 通報成功！ID: ${Date.now()}`;
        } catch { msg.innerText = "❌ 提交失敗"; }
    });
});
