const translations = {
    "zh-TW": { title: "🛡️ 星燈防詐中心", btnS: "開始深度掃描", btnP: "立即解鎖報告 (NT$ 30)", payAlert: "【收款資訊】\n銀行：(822) 中國信託\n帳號：您的帳號\n金額：NT$ 30\n請將匯款截圖傳至客服解鎖。" },
    "en": { title: "🛡️ XingDeng Security", btnS: "Start Deep Scan", btnP: "Unlock Report (NT$ 30)", payAlert: "【Payment Info】\nBank: (822) CTBC\nAcc: [Your Account]\nAmount: NT$ 30\nPlease send screenshot to support after transfer." },
    "tl": { title: "🛡️ XingDeng Anti-Fraud", btnS: "Simulan ang Scan", btnP: "I-unlock (NT$ 30)", payAlert: "【Payment Info】\nBank: (822)\nAcc: [Your Account]\nAmount: NT$ 30\nMag-send ng screenshot sa support pagkatapos mag-transfer." },
    "zh-CN": { title: "🛡️ 星灯防诈中心", btnS: "开始深度扫描", btnP: "立即解锁 (NT$ 30)", payAlert: "【收款信息】\n银行：(822) 中国信托\n账号：您的账号\n金额：NT$ 30\n汇款后请将截图传给客服。" },
    "ja": { title: "🛡️ 星燈詐欺対策センター", btnS: "スキャン開始", btnP: "解除 (NT$ 30)", payAlert: "【振込情報】\n銀行：(822)\n口座：[Your Account]\n金額：NT$ 30\n振込後、スクリーンショットを送ってください。" },
    "ko": { title: "🛡️ 싱덩 사기 방지 센터", btnS: "스캔 시작", btnP: "잠금 해제 (NT$ 30)", payAlert: "【송금 정보】\n은행: (822)\n계좌: [Your Account]\n금액: NT$ 30\n송금 후 스크린샷을 보내주세요." },
    "vi": { title: "🛡️ Trung tâm Chống Lừa đảo", btnS: "Bắt đầu quét", btnP: "Mở khóa (NT$ 30)", payAlert: "【Thanh toán】\nNH: (822)\nSTK: [Your Account]\nSố tiền: NT$ 30\nVui lòng gửi ảnh chụp màn hình sau khi CK." },
    "id": { title: "🛡️ Pusat Anti-Penipuan", btnS: "Mulai Pemindaian", btnP: "Buka (NT$ 30)", payAlert: "【Info Pembayaran】\nBank: (822)\nRek: [Your Account]\nTotal: NT$ 30\nKirim bukti transfer ke support." },
    "th": { title: "🛡️ ศูนย์ป้องกันการฉ้อโกง", btnS: "เริ่มสแกน", btnP: "ปลดล็อก (NT$ 30)", payAlert: "【การชำระเงิน】\nธนาคาร: (822)\nบัญชี: [Your Account]\nยอด: NT$ 30\nส่งสลิปหลังโอนเงิน" }
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
