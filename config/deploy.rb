require "capistrano/node-deploy"

set :application, "chronicle"
set :repository,  "git@github.com:/benrudolph/chronicle.unhcrinnovation"
set :scm, :git
set :user, :deploy
set :deploy_to, "/var/www/#{application}"
set :use_sudo, false
set :app_command, 'app.js'
set :keep_releases, 5
set :node_env, 'production'

role :web, "personal"                          # Your HTTP server, Apache/etc
role :app, "personal"                          # This may be the same as your `Web` server
role :db,  "personal", :primary => true

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts
#
namespace :db do
  task :config, :except => { :no_release => true }, :role => :app do
    run "cp -f ~/chronicle.json #{release_path}/config/config.json"
    run "cp -f ~/email.json #{release_path}/config/email.json"
  end

  task :migrate, :except => { :no_release => true }, :role => :app do
    run "cd #{release_path} && sequelize --migrate"
  end
end

after "deploy:finalize_update", "db:config"

