// 1. 設定與本機D插槽Docker引擎所呼叫的隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 整合多語系文案
const translations = {
    "zh-TW": { 
        title: "易鑒星科 · 命理顧問", 
        btnS: "觀象演繹 · 開始推演", 
        btnP: "解鎖天機報告 (NT$ 30)", 
        bg: "bg3.jpg",
        payAlert: "【易鑒星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n完成後請截圖傳至 LINE 客服。" 
    },
    "en": { 
        title: "EdisonStar · Strategy & Destiny", 
        btnS: "Analyze Universal Patterns", 
        btnP: "Unlock Report (NT$ 30)", 
        bg: "bg4.jpg",
        payAlert: "【Payment Info】\nBank: (822) CTBC\nAmount: NT$ 30\nPlease send screenshot to LINE support." 
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

async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.style.color = "#d4af37";
    status.innerText = "正在連通本機 Docker 引擎進行因果推演..."; 
    
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        const data = await response.json();
        status.innerText = "推演完成：您的命理走勢已鎖定。";
    } catch (err) {
        status.style.color = "red";
        status.innerText = "連線異常，請確認 ngrok 隧道是否保持 Online。";
    }
}

function triggerPayment() {
    const lang = document.getElementById('langSelect').value;
    alert(translations[lang].payAlert);
}
