
export default function MingliPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #0f0c29, #302b63, #24243e)',
      color: '#fff',
      padding: '60px 20px',
      textAlign: 'center',
      fontFamily: 'Microsoft JhengHei, sans-serif'
    }}>
      <h1 style={{ color: '#ffeb3b', marginBottom: '30px' }}>易鑑星科 · 開始推演</h1>
      <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto 40px' }}>
        這裡是命理運算頁面（易經 / 奇門遁甲 / 六壬神課 / 姓名學）<br />
        後續將接上 Django API 進行運算與報告生成。
      </p>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          background: '#4caf50',
          color: 'white',
          padding: '15px 40px',
          fontSize: '18px',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer'
        }}
      >
        返回首頁
      </button>
    </div>
  )
}
