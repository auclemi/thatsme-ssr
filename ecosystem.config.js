module.exports = {
  apps: [
    {
      name: 'thatsme-ssr',
      script: 'client/dist/thatsme-angular/server/server.mjs',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      }
    },
    {
      name: 'thatsme-api',
      script: 'server/dist/main.js',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};