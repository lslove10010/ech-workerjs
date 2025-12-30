// functions/[[path]].js
// 測試用：確認 Pages 是否能偵測到 Functions

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 測試路由：訪問 /test 看看
    if (path === '/test') {
      return new Response('Functions 測試成功！現在可以正常使用 WebSocket 代理了～', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    // 其他請求都讓靜態檔案（public/）正常處理
    return await fetch(request);
  }
};
