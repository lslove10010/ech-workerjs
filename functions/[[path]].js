export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/functions-test') {
      return new Response('Functions 路由偵測成功！現在可以加 WebSocket 了。', {
        status: 200,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    // 其他請求走靜態資產
    return await fetch(request);
  }
};
