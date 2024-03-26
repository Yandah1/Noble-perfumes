const dotenv = require("dotenv");

module.exports = {
  apps : [
    {
      name: 'backend',
      script: 'cd backend && npm start',
    }],

  deploy : {
    production_backend : {
      user : 'ubuntu',
      key: '~/.ssh/id_rsa.pub',
      host : '34.204.81.17',
      ref  : 'origin/main',
      repo : 'git@github.com:Yandah1/Noble-perfumes.git',
      path : '/home/ubuntu/',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd backend && npm install && pm2 reload ecosystem.config.js --env production_backend',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes',
      env: {
        NODE_ENV: 'production',
        API_KEY: 'your_production_api_key',
        DATABASE_URL: 'your_production_database_url',
        // Add other environment-specific keys here
      },
    }
  }
};
