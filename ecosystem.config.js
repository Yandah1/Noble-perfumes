module.exports = {
  apps : [
    {
      name: 'frontend',
      script: 'cd frontend && npm start',
    },
    {
      name: 'backend',
      script: 'cd backend && npm start',
    }
],

  deploy : {
    production_frontend : {
      user : 'ubuntu',
      key: '~/.ssh/key.pem',
      host : '13.246.28.189',
      ref  : 'origin/main',
      repo : 'git@github.com:Yandah1/Noble-perfumes.git',
      path : '/home/ubuntu/',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production_frontend',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    },
    production_backend : {
      user : 'ubuntu',
      key: '~/.ssh/school',
      host : '34.204.81.17',
      ref  : 'origin/main',
      repo : 'git@github.com:Yandah1/Noble-perfumes.git',
      path : '/home/ubuntu/backend',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production_backend',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
