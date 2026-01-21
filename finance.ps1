# ./finance.ps1 - 易鑒星科財務監控
try {
    $resp = Invoke-RestMethod -Uri "http://localhost:3000/api/stats"
    Write-Host "------------------------------------" -ForegroundColor Gold
    Write-Host "🏮 易鑒星科：2026 營運收支總表" -ForegroundColor Cyan
    Write-Host "------------------------------------"
    Write-Host "總成交訂單數: $($resp.totalOrders)"
    Write-Host "總營收額 (TWD): NT$ $($resp.revenueTotal)"
    Write-Host "星燈公益金提撥: NT$ $($resp.charityFund)"
    Write-Host "------------------------------------"
    Write-Host "樂天帳戶：81201001535981"
    Write-Host "Line Bank：111013844288"
    Write-Host "------------------------------------"
} catch {
    Write-Host "❌ 無法連接伺服器，請確保 server.js 已啟動。" -ForegroundColor Red
}