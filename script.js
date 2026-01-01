/* ---------------------------------------------------------------------- */
/* file: script.js (V3.1 商業正式版 - 連結雲端 API xingdeng.tw) */
/* 網站邏輯：表單處理、驗證與 API 呼叫 */
/* ---------------------------------------------------------------------- */

// *** 正式環境 API 基礎 URL (由 Render 託管並透過 Cloudflare 轉發) ***
const BACKEND_URL = 'https://api.xingdeng.tw/api';

// *** 輔助函數：URL 驗證函數：檢查網址是否有效 (需包含 http/https) ***
function isValidUrl(string) {
    try {
        const url = new URL(string);
        // 確保協議是 http 或 https
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (e) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------------------------
    // --- 1. 詐騙掃描處理邏輯 (scanForm) ---
    // ----------------------------------------------------------------------
    const scanForm = document.getElementById('scanForm');
    const scanResult = document.getElementById('scan_result');

    if (scanForm) {
        scanForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const urlInput = document.getElementById('url_input').value.trim();

            if (!isValidUrl(urlInput)) {
                scanResult.innerHTML = '❌ 請輸入有效的 URL (需包含 http:// 或 https://)。';
                scanResult.style.backgroundColor = '#f44336';
                scanResult.style.color = 'white';
                scanResult.style.display = 'block';
                return;
            }

            // 顯示載入狀態
            scanResult.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 正在連線星燈雲端 AI 分析網址風險...`;
            scanResult.style.backgroundColor = '#64B5F6';
            scanResult.style.color = 'white';
            scanResult.style.display = 'block';

            // 呼叫雲端 API
            fetch(`${BACKEND_URL}/check-url`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: urlInput }),
            })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    const isRisky = body.is_fraudulent;
                    const resultText = isRisky ? "🚨 高風險警報 (High Risk)" : "✅ 安全 (Safe)";
                    const bgColor = isRisky ? '#f44336' : '#4CAF50';
                    
                    scanResult.innerHTML = `
                        <p style="font-weight: bold; font-size: 1.2em;">${resultText}</p>
                        <p><strong>偵測目標:</strong> ${urlInput}</p>
                        <p><strong>系統狀態:</strong> 已完成雲端數據庫比對</p>
                    `;
                    scanResult.style.backgroundColor = bgColor;
                } else {
                    scanResult.innerHTML = `❌ 掃描失敗：伺服器暫時無法回應。`;
                    scanResult.style.backgroundColor = '#757575';
                }
            })
            .catch(() => {
                scanResult.innerHTML = `🚨 連線錯誤：無法連接到 api.xingdeng.tw。`;
                scanResult.style.backgroundColor = '#757575';
            });
        });
    }

    // ----------------------------------------------------------------------
    // --- 2. 通報表單處理邏輯 (reportForm) ---
    // ----------------------------------------------------------------------
    const reportForm = document.getElementById('reportForm');
    const reportResult = document.getElementById('report_result');

    if (reportForm) {
        reportForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const reportUrl = document.getElementById('report_url').value.trim();
            const contactEmail = document.getElementById('contact_email').value.trim();

            if (!isValidUrl(reportUrl)) {
                reportResult.innerHTML = '❌ 請輸入有效的 URL。';
                reportResult.style.backgroundColor = '#f44336';
                reportResult.style.display = 'block';
                return;
            }

            reportResult.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 正在傳送通報至星燈防護中心...`;
            reportResult.style.backgroundColor = '#64B5F6';
            reportResult.style.display = 'block';

            // 這裡假設您的 API 有提供 /report 接口
            fetch(`${BACKEND_URL}/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ report_url: reportUrl, contact_email: contactEmail }),
            })
            .then(response => response.json())
            .then(data => {
                reportResult.innerHTML = `✅ 通報成功！感謝您為台灣資安環境做出貢獻。`;
                reportResult.style.backgroundColor = '#4CAF50';
                reportForm.reset();
            })
            .catch(() => {
                reportResult.innerHTML = `🚨 連線失敗，請檢查網路連線。`;
                reportResult.style.backgroundColor = '#757575';
            });
        });
    }

    // --- (其餘金流與 Pro 檢查邏輯保留，並導向雲端網址) ---
    // ... 原本的 checkoutForm 與 proCheckForm 程式碼會自動使用新的 BACKEND_URL ...
});