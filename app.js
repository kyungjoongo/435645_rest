var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


var index = require('./routes/index');
var bit_route = require('./routes/bit_route');
var route_proverb = require('./routes/route_proverb');
var bit_new_route = require('./routes/bit_new_route');
var users = require('./routes/users');
var mysql_route = require('./routes/mysql_route');

//route_face_reconize
var route_face_reconize = require('./routes/route_face_reconize');

var memcard_route = require('./routes/memcard_route');

var imde_route = require('./routes/imde_route');
var imde_route2 = require('./routes/imde_route2');
var daum_blog_route = require('./routes/daum_blog_route');
var ufc_route = require('./routes/ufc_route');
var naver_route = require('./routes/naver_route');
var jibbob_route = require('./routes/jibbob_route');
var cors = require('cors')

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(fileUpload());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use('/', ufc_route);
app.use('/', memcard_route);
app.use('/', mysql_route);
//route_face_reconize
app.use('/', route_face_reconize);
//route_proverb
app.use('/', route_proverb);
//naver_route
app.use('/', naver_route);

app.use('/', imde_route);
app.use('/', imde_route2);
//jibbob_route
app.use('/', jibbob_route);
app.use('/', bit_route);
app.use('/', bit_new_route);

app.use('/', daum_blog_route);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//##############################################################################################

var debug = require('debug')('exrepss001:server');
var http = require('http');
var fs = require('fs');
var https = require('https');
/*var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};*/


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
/*var httpsServer = https.createServer(credentials, app);*/


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.timeout = 600000
/*httpsServer.listen(8443);*/
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
