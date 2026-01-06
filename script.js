// 1. 設定與本機 D 槽 Docker 引擎連通的隧道網址
const API_BASE_URL = "https://mariyah-unexplanatory-regan.ngrok-free.dev"; 

// 2. 整合多語系文案
const translations = {
    "zh-TW": { 
        title: "易鑒星科 · 命理顧問", 
        btnS: "觀象演繹 · 開始推演", 
        btnP: "解鎖天機報告 (NT$ 30)", 
        payAlert: "【易鑒星科 · 結緣資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n完成結緣後，請截圖傳至 LINE 客服，為您揭示隱而未顯的方向。" 
    },
    "en": { 
        title: "EdisonStar · Strategy & Destiny", 
        btnS: "Analyze Universal Patterns", 
        btnP: "Unlock Destiny Report (NT$ 30)", 
        payAlert: "【Payment Info】\nBank: (822) CTBC\nAcc: [Your Account]\nAmount: NT$ 30\nPlease send screenshot to LINE support to reveal your path." 
    },
    "tl": { title: "🛡️ XingDeng Anti-Fraud", btnS: "Simulan ang Scan", btnP: "I-unlock (NT$ 30)", payAlert: "【Payment Info】\nBank: (822)\nAcc: [Your Account]\nAmount: NT$ 30\nMag-send ng screenshot sa LINE pagkatapos mag-transfer." },
    "zh-CN": { title: "🛡️ 星灯防诈中心", btnS: "开始深度扫描", btnP: "立即解锁 (NT$ 30)", payAlert: "【收款信息】\n银行：(822) 中国信托\n账号：您的账号\n金额：NT$ 30\n汇款后请将截图传给客服。" },
    "ja": { title: "🛡️ 星燈詐欺対策センター", btnS: "スキャン開始", btnP: "解除 (NT$ 30)", payAlert: "【振込情報】\n銀行：(822)\n口座：[Your Account]\n金額：NT$ 30\n振込後、スクリーンショットを送ってください。" },
    "ko": { title: "🛡️ 싱덩 사기 방지 센터", btnS: "스캔 시작", btnP: "잠금 해제 (NT$ 30)", payAlert: "【송금 정보】\n은행: (822)\n계좌: [Your Account]\n금액: NT$ 30\n송금 후 스크린샷을 보내주세요." },
    "vi": { title: "🛡️ Trung tâm Chống Lừa đảo", btnS: "Bắt đầu quét", btnP: "Mở khóa (NT$ 30)", payAlert: "【Thanh toán】\nNH: (822)\nSTK: [Your Account]\nSố tiền: NT$ 30\nVui lòng gửi ảnh chụp màn hình sau khi CK." },
    "id": { title: "🛡️ Pusat Anti-Penipuan", btnS: "Mulai Pemindaian", btnP: "Buka (NT$ 30)", payAlert: "【Info Pembayaran】\nBank: (822)\nRek: [Your Account]\nTotal: NT$ 30\nKirim bukti transfer ke support." },
    "th": { title: "🛡️ ศูนย์ป้องกันการฉ้อโกง", btnS: "เริ่มสแกน", btnP: "ปลดล็อก (NT$ 30)", payAlert: "【การชำระเงิน】\nธนาคาร: (822)\nบัญชี: [Your Account]\nยอด: NT$ 30\nส่งสลิปหลังโอนเงิน" }
};

// 3. 切換語言與背景圖的邏輯
function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang] || translations["zh-TW"];
    
    // 更新介面文字
    document.getElementById('mainTitle').innerHTML = `<i class="fas fa-scroll"></i> ${t.title}`;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnPayPersonal').innerText = t.btnP;

    // 同步切換背景圖，營造觀象演繹的氣氛
    const bgMap = {
        'zh-TW': 'bg3.jpg', // 星空觀象
        'en': 'bg4.jpg',    // 揮師校場
        'ja': 'bg6.jpg'     // 閱圖指引
    };
    const selectedBg = bgMap[lang] || 'bg3.jpg';
    document.body.style.backgroundImage = `url('${selectedBg}')`;
}

// 4. 收款資訊彈窗
function triggerPayment() {
    const lang = document.getElementById('langSelect').value;
    alert(translations[lang].payAlert);
}

// 5. 串接 Docker 引擎進行演算
async function startAnalysis() {
    const status = document.getElementById('statusOutput');
    status.innerText = "正在連通本機 Docker 引擎，進行八卦與科學模型演繹...";
    
    try {
        const response = await fetch(`${API_BASE_URL}/analyze`, { method: 'POST' });
        const data = await response.json();
        status.innerText = "推演完成：您的命理走勢已生成。";
    } catch (err) {
        status.innerText = "連線異常，請確認 ngrok 隧道是否開啟。";
    }
}
