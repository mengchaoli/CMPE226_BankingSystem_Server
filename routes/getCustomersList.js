const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6112049qaZ',
    database: 'cloudprint'
});

exports.getCustomersList = function(req,res){
    let customersList = {
        results:[]
    };
    connection.query('SELECT * FROM customers', function (error, result, fields) {
        if (error) {
            console.log("error occurred",error);
            res.send({
                "code":400,
                "failed":"error occurred"
            })
        }else{
            console.log('The solution is: ', result);
            customersList.results = customersList.results.concat(result);
            res.send(customersList);
        }
    });
}