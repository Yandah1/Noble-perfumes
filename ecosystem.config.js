module.exports = {
  apps : [
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',
      cwd: '~/source/frontend',
    },
    {
      name: 'backend',
      script: 'npm',
      args: 'start',
      cwd: '~/source/backend',
    },
],

  deploy : {
    production_frontend : {
      user : 'ubuntu',
      key: '~/.ssh/school',
      host : '54.152.74.112',
      ref  : 'origin/main',
      repo : 'git@github.com:Yandah1/Noble-perfumes.git',
      path : '/home/ubuntu/',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production_frontend',
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
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm run build && cd .. && pm2 reload ecosystem.config.js --env production_backend',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
