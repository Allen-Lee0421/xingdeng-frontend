// 多國語言辭典
const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", sub: "V4.0 全球化防護與偵測", scan: "🔍 網址詐騙掃描", report: "📢 詐騙網址通報", btnS: "開始掃描", btnR: "提交通報" },
    "en": { title: "🛡️ XingDeng Security", sub: "V4.0 Global Protection", scan: "🔍 URL Fraud Scan", report: "📢 Report Scam", btnS: "Start Scan", btnR: "Submit" },
    "ko": { title: "🛡️ 성등 보이스피싱 방지", sub: "V4.0 글로벌 보안", scan: "🔍 URL 사기 검사", report: "📢 사기 신고", btnS: "검사 시작", btnR: "제출" },
    // 可依此類推增加其他語系...
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

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (e) { return false; }
}

function mockBackendApi(url, endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.15) {
                return reject({ status: 500, data: { error: "伺服器忙碌。" } });
            }
            const isScam = Math.random() < 0.3;
            resolve({
                status: 200,
                data: endpoint === 'scan' ? {
                    status: isScam ? 'Danger' : 'Safe',
                    detail: isScam ? '高風險：與詐騙特徵吻合。' : '低風險：安全。',
                    risk_score: Math.floor(Math.random() * 100)
                } : { report_id: Date.now() }
            });
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 掃描邏輯
    const scanForm = document.getElementById('scanForm');
    const scanResult = document.getElementById('scan_result');

    scanForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const url = document.getElementById('url_to_scan').value;
        if (!isValidUrl(url)) {
            scanResult.innerHTML = "❌ 請輸入正確網址";
            return;
        }
        scanResult.innerHTML = '<i class="fas fa-spinner fa-spin"></i> AI 分析中...';
        
        mockBackendApi(url, 'scan').then(res => {
            const d = res.data;
            scanResult.style.backgroundColor = d.status === 'Danger' ? '#f44336' : '#4CAF50';
            scanResult.innerHTML = `**${d.status}** (風險值: ${d.risk_score})<br>${d.detail}`;
        }).catch(() => {
            scanResult.innerHTML = "⚠️ 連線暫時失敗，請稍後再試";
        });
    });

    // 通報邏輯
    const reportForm = document.getElementById('reportForm');
    const msg = document.getElementById('message');

    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.style.display = 'block';
        msg.innerText = "⏳ 提交中...";
        
        mockBackendApi("", 'report').then(res => {
            msg.innerText = `✅ 通報成功！ID: ${res.data.report_id}`;
            reportForm.reset();
        }).catch(() => {
            msg.innerText = "❌ 提交失敗";
        });
    });
});
