// functions/[[path]].js
// 極簡 + 完整兼容版，保證 Wrangler 3.x 能偵測 routes

export default {
  async fetch(request, env, ctx) {
    // 先處理 WebSocket 升級請求
    const upgradeHeader = request.headers.get('Upgrade');

    if (upgradeHeader && upgradeHeader.toLowerCase() === 'websocket') {
      // 簡單回應測試：成功建立 WS 連接
      const [client, server] = new WebSocketPair();
      server.accept();

      server.addEventListener('message', event => {
        server.send(`收到訊息: ${event.data}`);
      });

      return new Response(null, {
        status: 101,
        webSocket: client,
      });
    }

    // 非 WS 請求 → 讓靜態頁面正常載入
    return await fetch(request);
  }
};

// 啟用 nodejs_compat（如果需要 connect() 後續再加）
export const config = {
  runtime: 'nodejs_compat'
};
