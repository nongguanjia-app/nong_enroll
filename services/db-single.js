var settings = require('../settings.js');
var mysql = require('mysql');

var db_config = {
    host: settings.db_host,
    port: settings.db_port,
    user: settings.db_user,
    password: settings.db_password,
    database: settings.db_database
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);
    connection.connect(function(err) {
        if(err) {
            console.log('连接到数据库出错：' + err);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('连接到数据库：' + settings.db_database);
        }
    });

    connection.on('error', function(err){
        console.log('数据库出错：' + err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

process.on('SIGINT', function() {
    connection.end(function () {
        console.log('关闭数据库连接...');
        process.exit(0);
    });
});

module.exports = connection;