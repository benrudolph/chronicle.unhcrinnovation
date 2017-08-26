http://chronicle.benrudolph.com

### Loading the database

```
npm install
npm install gulp-cli -g
node_modules/sequelize-cli/bin/sequelize db:migrate
gulp db:load
```

### Running the server

```
node app.js
```

### Deploying

```
cap production deploy
cap production deploy:start
```
