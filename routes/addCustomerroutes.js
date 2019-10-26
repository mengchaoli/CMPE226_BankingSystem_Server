const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6112049qaZ',
    database: 'cloudprint'
});

//we only need to connect to the database once which is already done in loginroutes.js
// connection.connect(function(err){
//     if(!err) {
//         console.log("Database is connected ... nn");
//     } else {
//         console.log("Error connecting database ... nn");
//     }
// });

exports.addCustomer = function(req,res){
    // console.log("req",req.body);
    const today = new Date();
    const customers = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "email":req.body.email,
        "password":req.body.password,
        "account_no":req.body.account_no,
        "created":today,
        "modified":today
    }
    connection.query('INSERT INTO customers SET ?',customers, function (error, results, fields) {
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
                "success":"customers registered successfully"
            });
        }
    });
}