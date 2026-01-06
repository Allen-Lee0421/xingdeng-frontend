const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; //

const translations = {
    "zh-TW": { title: "易鑒星科 · 命理顧問", btnS: "觀象演繹 · 開始推演", btnP: "解鎖天機報告 (NT$ 30)", bg: "bg3.jpg" }, //
    "en": { title: "EdisonStar · Strategy & Destiny", btnS: "Analyze Patterns", btnP: "Unlock Report (NT$ 30)", bg: "bg4.jpg" }, //
    "ja": { title: "星燈命理 · 戦略顧問", btnS: "推演開始", btnP: "解除 (NT$ 30)", bg: "bg6.jpg" }
    // ...其餘語系請依此類推
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang] || translations["zh-TW"];
    
    document.getElementById('mainTitle').innerHTML = `<i class="fas fa-scroll"></i> ${t.title}`;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnPayPersonal').innerText = t.btnP;
    
    // 同步切換孔明背景圖
    document.body.style.backgroundImage = `url('${t.bg}')`;
}

async function startAnalysis() {
    const output = document.getElementById('statusOutput');
    output.innerText = "正在連通本機 Docker 引擎進行演算..."; //
    
    try {
        const res = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' }); //
        const data = await res.json();
        output.innerText = `演繹結果：${data.result}`;
    } catch (err) {
        output.innerText = "連線失敗，請檢查 ngrok 狀態。";
    }
}

