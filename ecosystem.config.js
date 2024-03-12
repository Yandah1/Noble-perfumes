module.exports = {
  apps : [{
    script: 'cd frontend && npm start',
  }],

  deploy : {
    production : {
      user : 'ubuntu',
      key: '~/.ssh/school',
      host : '54.152.74.112',
      ref  : 'origin/master',
      repo : 'git@github.com:Yandah1/Noble-perfumes.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && cd frontend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
