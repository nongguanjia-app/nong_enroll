var settings = require('../settings.js');
var mysql=require("mysql");

var pool = mysql.createPool({
    host: settings.db_host,
    user: settings.db_user,
    password: settings.db_password,
    database: settings.db_database,
    port: settings.db_port
});

var query=function(sql, params, callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql, params, function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

process.on('SIGINT', function() {
    pool.end(function () {
        console.log('关闭数据库连接池...');
        process.exit(0);
    });
});
module.exports=query;