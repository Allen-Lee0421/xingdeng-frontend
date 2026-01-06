// 1. 核心通訊地址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 多語系與背景連動文案
const translations = {
    "zh-TW": { 
        title: "易鑒星科 · 命理顧問", 
        btnS: "觀象演繹 · 開始推演", 
        btnP: "解鎖天機報告 (NT$ 30)", 
        bg: "bg3.jpg",
        payAlert: "【易鑒星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n完成後截圖傳至 LINE 客服。" 
    },
    "en": { 
        title: "EdisonStar · Strategy & Destiny", 
        btnS: "Analyze Patterns", 
        btnP: "Unlock Report (NT$ 30)", 
        bg: "bg4.jpg",
        payAlert: "【Payment Info】\nBank: (822) CTBC\nAcc: [Your Account]\nAmount: NT$ 30" 
    }
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang] || translations["zh-TW"];
    document.getElementById('mainTitle').innerText = t.title;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnPayPersonal').innerText = t.btnP;
    document.body.style.backgroundImage = `url('${t.bg}')`;
}

// 3. 修正後的演算對接邏輯
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在連通本機 Docker 引擎進行因果推演...";
    status.style.color = "#d4af37";
    
    try {
        // 確保路徑與後端匹配
        const response = await fetch(`${API_BASE_URL}/analyze`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        status.innerText = `推演完成：${data.result || '已獲取天機指引。'}`;
    } catch (err) {
        // 對應截圖中的連線異常提示
        status.innerText = "連線異常，請確認 ngrok 隧道是否保持 Online。";
        status.style.color = "#ff4d4d";
    }
}

function triggerPayment() {
    const lang = document.getElementById('langSelect').value;
    alert(translations[lang].payAlert);
}

