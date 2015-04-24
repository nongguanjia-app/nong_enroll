var query = require('./db-pool');
var xlsx = require('node-xlsx');
var fs = require('fs');
var settings = require('../settings.js');

var path = require('path');
var mime = require('mime');

function checkUserExist(mobile, res) {
    if(mobile && mobile != "") {
        var sql = 'SELECT id from enroll_form where mobile = ?';
        query(sql, [mobile], function(err, results){
            if(err) {
                res.json({status: -1, id: -1, msg:'msg_server_error: ' + err});
            } else {
                if(results.length > 0) {
                    res.json({status: 1, id: results[0].id,msg:'msg_user_exist'});
                } else {
                    res.json({status: 0, id: -1, msg:'msg_user_not_exist'});
                }
            }
        });
    } else {
        res.json({status: 3, msg: 'msg_no_mobile'});
    }
};

function Service() {

};

Service.checkUserExist = function(req, res) {
    checkUserExist(req.query.mobile, res);
};

Service.enroll = function(req, res) {
    var sql = '';
    var last_time = new Date();
    if(req.body.op == 'INSERT') {
        //Insert record
        sql = 'INSERT INTO enroll_form (name, address, mobile, ly_crop, ly_area, ' +
              'ly_prod, ty_crop, ty_area, create_time, last_time) VALUES (?,?,?,?,?,?,?,?,?,?)';
        query(sql, [req.body.name, req.body.address, req.body.mobile, req.body.ly_crop, req.body.ly_area,
            req.body.ly_prod, req.body.ty_crop, req.body.ty_area, last_time, last_time], function(err, results) {
            if(err) {
                res.json({status: -1, msg: 'msg_server_error: ' + err});
            } else {
                res.json({status: 0, msg: 'msg_success'});
            }
        });
    } else if(req.body.op == 'UPDATE') {
        //Update record
        sql = 'UPDATE enroll_form SET name = ?, address = ?, ly_crop = ?, ly_area = ?, ly_prod = ?, ' +
              'ty_crop = ?, ty_area = ?, last_time = ? WHERE mobile = ?';
        query(sql, [req.body.name, req.body.address, req.body.ly_crop, req.body.ly_area, req.body.ly_prod,
            req.body.ty_crop, req.body.ty_area, last_time, req.body.mobile], function(err, results) {
            if(err) {
                res.json({status: -1, msg: 'msg_server_error: ' + err});
            } else {
                res.json({status: 0, msg: 'msg_success'});
            }
        })
    } else {
        //Error
        res.json({status: -1, msg: 'msg_wrong_operation'});
    }
};

Service.get_excel = function(req, res) {

    var fullname = settings.excel_filepath + settings.excel_filename;
    var data = [["编号","姓名","地址","手机号","去年种植玉米品种","去年种植玉米面积","去年亩产量","今年计划种植品种","今年计划种植面积","创建时间","最后更新时间"]];

    //根据数据库记录生成data
    query('SELECT * from enroll_form', function(err, r){
        if(err) {
            res.json({status: -1, msg: 'msg_server_error: ' + err});
        } else {
            for(var i=0; i<r.length; i++) {
                data.push([i+1, r[i].name, r[i].address, r[i].mobile, r[i].ly_crop, r[i].ly_area, r[i].ly_prod, r[i].ty_crop,
                    r[i].ty_area, r[i].create_time, r[i].last_time]);
            }

            //生成文件
            var file = xlsx.build([{name: "报名表", data: data}]);
            fs.writeFile(fullname, file, function(err) {
                if(err) {
                    res.json({status: -1, msg: 'msg_server_error: ' + err});
                } else {
                    res.json({status: 0, msg: 'msg_success'});
                }
            })
        }
    });
};

Service.get_user = function(req, res) {
    query('SELECT * from enroll_form where mobile = ?', [req.query.mobile], function(err, r) {
        if(err) {
            res.json({status: -1, msg: 'msg_server_error: ' + err});
        } else {
            if(r.length < 1) {
                res.json({status: 1, msg: 'msg_user_not_exist'});
            } else {
                r[0]['status'] = 0;
                res.send(r[0]);
            }
        }
    })
};

Service.sms_handler = function(req, res) {
    
};

module.exports = Service;