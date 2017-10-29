//require node modules
const Express = require('express');
const Mongoose = require('mongoose');
const Config = require('config');
const Fs = require('fs');
const Path = require('path').join;
const BodyParser = require('body-parser');
const Cors = require('cors')

//initialize models
const modules = Path(__dirname, 'app/modules');
Fs.readdirSync(modules)
    .forEach(file => require(Path(modules + '/' + file + '/' + file + '.js')));

//require files
const routes = require('./routes/index');

//create app
const app = new Express();

//Use the routes defined in routes
app.use(Cors());
app.use(BodyParser.json({limit: '50mb'}));
app.use(Express.static(__dirname + '/images'));
app.use(Express.static(__dirname + '/public'));
app.use(routes);

//set environment
const env = process.env.NODE_ENV || 'development';

//database connection
const dbConfig = Config.get(env + '.dbConfig.url');
Mongoose.connect(dbConfig);

//start app server
app.listen(3000, function(){
    console.log("App running");
});
