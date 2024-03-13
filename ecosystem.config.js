module.exports = {
  apps : [
    {
      name: 'frontend',
      script: 'cd frontend && npm start',
    }],

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
    }
  }
};
