# config valid only for current version of Capistrano
lock "3.9.0"

set :application, "chronicle"
set :repo_url, "git@github.com:benrudolph/chronicle.unhcrinnovation.git"
set :branch, "master"

require 'capistrano-npm'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 3

set :linked_dirs, %w(
  node_modules
)
set :linked_files, %w{config/production.json chronicle.db}

namespace :deploy do
  desc 'Install node modules'
  task :install_node_modules do
    on roles(:app) do
      within release_path do
        execute :npm, 'install', '-s'
      end
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      execute "forever start #{release_path.join('app.js')}"
    end
  end

  after :updated, :install_node_modules
end
