const bgImages = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'bg6.jpg', 'bg7.jpg', 'bg8.jpg'];

function rotateBackground() {
    const now = new Date();
    const segments = (now.getHours() * 2) + (now.getMinutes() >= 30 ? 1 : 0);
    const currentBg = bgImages[segments % bgImages.length];

    // 使用兩層疊加：深色層確保文字清晰 + 背景圖片
    const gradient = "linear-gradient(rgba(5, 10, 20, 0.8), rgba(5, 10, 20, 0.8))";
    document.body.style.backgroundImage = `${gradient}, url('${currentBg}')`;
}

// 預載圖片防止切換時閃爍
bgImages.forEach(src => { const img = new Image(); img.src = src; });

setInterval(rotateBackground, 60000);
rotateBackground();

// 剩下的掃描與通報邏輯保持不變...
