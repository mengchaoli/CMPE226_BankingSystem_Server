const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6112049qaZ',
    database: 'cloudprint'
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.register = function(req,res){
    // console.log("req",req.body);
    const today = new Date();
    const users = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "password":req.body.password,
        "created":today,
        "modified":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
        if (error) {
            console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered successfully"
            });
        }
    });
}

exports.login = function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            // console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            // console.log('The solution is: ', results);
            if(results.length > 0){
                if(results[0].password === password){
                    res.send({
                        "code":200,
                        "success":"login successfully"
                    });
                }
                else{
                    res.send({
                        "code":204,
                        "success":"Email and password does not match"
                    });
                }
            }
            else{
                res.send({
                    "code":204,
                    "success":"Email does not exits"
                });
            }
        }
    });
}

// exports.login2 = (req, res) => {
//   res.redirect('back');
// };