module.exports = {
  apps: [
    {
      name: 'inertia-ssr',
      script: './bootstrap/ssr/ssr.js',
      cwd: '/var/www/lol-consulting',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './storage/logs/ssr-error.log',
      out_file: './storage/logs/ssr-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    },
  ],
};
