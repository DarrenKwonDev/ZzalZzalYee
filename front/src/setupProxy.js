// 배포 시에는 지워줘야 합니다.
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth", "/api"],
    createProxyMiddleware({
      // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};
