const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", scan: "🔍 啟動軍事級深度掃描", btnS: "開始深度掃描", btnP: "立即解鎖報告 (NT$ 30)", payAlert: "【收款資訊】\n銀行代碼：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n匯款後請截圖傳至 LINE 客服解鎖報告。" },
    "en": { title: "🛡️ XingDeng Security", scan: "🔍 Military-Grade Scan", btnS: "Start Deep Scan", btnP: "Unlock Report (NT$ 30)", payAlert: "【Payment Info】\nBank Code: (822)\nAccount: [Your Account]\nAmount: NT$ 30\nPlease send screenshot to LINE support after transfer." },
    "tl": { title: "🛡️ XingDeng Anti-Fraud", scan: "🔍 Militar-Grade Scan", btnS: "Simulan ang Scan", btnP: "I-unlock (NT$ 30)", payAlert: "【Payment Info】\nBank Code: (822)\nAccount: [Your Account]\nAmount: NT$ 30\nMag-send ng screenshot sa LINE pagkatapos mag-transfer." },
    "zh-CN": { title: "🛡️ 星灯防诈中心", scan: "🔍 启动军事级深度扫描", btnS: "开始深度扫描", btnP: "立即解锁 (NT$ 30)", payAlert: "【收款信息】\n银行代码：(822) 中国信托\n账号：您的账号\n金额：NT$ 30\n请于汇款后将截图传至 LINE 客服。" },
    "ja": { title: "🛡️ 星燈詐欺対策センター", scan: "🔍 軍事級スキャン", btnS: "スキャン開始", btnP: "解除 (NT$ 30)", payAlert: "【振込情報】\n銀行コード：(822)\n口座：[Your Account]\n金額：NT$ 30\n振込後、LINEでスクリーンショットを送ってください。" },
    "ko": { title: "🛡️ 싱덩 사기 방지 센터", scan: "🔍 군사급 스캔", btnS: "스캔 시작", btnP: "잠금 해제 (NT$ 30)", payAlert: "【송금 정보】\n은행 코드: (822)\n계좌 번호: [Your Account]\n금액: NT$ 30\n송금 후 LINE으로 스크린샷을 보내주세요." },
    "vi": { title: "🛡️ Trung tâm Chống Lừa đảo", scan: "🔍 Quét Chuyên sâu", btnS: "Bắt đầu quét", btnP: "Mở khóa (NT$ 30)", payAlert: "【Thông tin thanh toán】\nMã ngân hàng: (822)\nTài khoản: [Your Account]\nSố tiền: NT$ 30\nVui lòng gửi ảnh chụp màn hình qua LINE." },
    "id": { title: "🛡️ Pusat Anti-Penipuan", scan: "🔍 Pemindaian Militer", btnS: "Mulai Pemindaian", btnP: "Buka (NT$ 30)", payAlert: "【Info Pembayaran】\nKode Bank: (822)\nRekening: [Your Account]\nJumlah: NT$ 30\nKirim tangkapan layar ke LINE setelah transfer." },
    "th": { title: "🛡️ ศูนย์ป้องกันการฉ้อโกง", scan: "🔍 สแกนระดับทหาร", btnS: "เริ่มสแกน", btnP: "ปลดล็อก (NT$ 30)", payAlert: "【ข้อมูลการชำระเงิน】\nรหัสธนาคาร: (822)\nบัญชี: [Your Account]\nจำนวนเงิน: NT$ 30\nส่งสลิปให้ LINE หลังจากโอนเงิน" }
};

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const t = translations[lang];
    document.getElementById('mainTitle').innerHTML = `<i class="fas fa-shield-virus"></i> ${t.title}`;
    document.getElementById('btnScan').innerText = t.btnS;
    document.getElementById('btnPayPersonal').innerText = t.btnP;
}

function triggerPayment() {
    const lang = document.getElementById('langSelect').value;
    alert(translations[lang].payAlert);
}

