var express = require('express');
var router = express.Router();
var User = require('../models/user');
var utils = require('../utils/utils');

/* GET users listing. */
// router.route('/')
router.post('/',function (req, res, next) {
        var userInfo = req.body;
        /*var user = new User({
            username:'lihuan',
            password:'lihuan0215',
        });
        user.save(function (err) {
            if (err){
                res.send({
                    error: err
                });
            }
        });*/
        console.log(req.params);
        console.log(userInfo);
        User.findByUserName(userInfo['username'], function(err, userList){
            if(err){
                res.send({
                    error:err
                });
            }
            //console.log(userList);
            if(userList.length==0){
                res.send({
                    success: false,
                    code: 1     //用户不存在
                });
            }else {
                if(userInfo['password']==userList[0]['password']){
                    var authToken = utils.getAuthToken(10);
                    res.send({
                        success: true,
                        authToken:authToken
                    });
                    global[Symbol.for('authToken')] = authToken;
                }else {
                    res.send({
                        success: false,
                        code: 2         //密码错误
                    });
                }
            }
        });
    });

module.exports = router;
