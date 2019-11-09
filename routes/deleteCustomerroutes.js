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



exports.deleteCustomer = function(req,res){
    // console.log("req",req.body);
    const today = new Date();
    const account_no = req.body.account_no;

    connection.query('DELETE FROM customers WHERE account_no = ?',account_no, function (error, results, fields) {
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
                "success":"customers deleted successfully"
            });
        }
    });
}