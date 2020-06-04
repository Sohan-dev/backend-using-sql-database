
// const id = require('nanoid')
const express = require('express');
const path = require('path');
const app = express();
const mySql = require('mysql')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.json()

var io = require('socket.io').listen(3001);

var mySqlConnection = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 33306,
    password: 'wb38aj6588',
    database: 'userdb',
    multipleStatements: true
});

mySqlConnection.connect((err) =>
{
    if (!err) {
        console.log('Database connected Sucessfully');
    } else {
        console.log('Database connection failed \n Error: ' + JSON.stringify(err));
    }
});

io.on('connection', (socket) =>
{
    console.log('a user connected');
});

{/*============== User List =================== */ }
const userList = [
    {
        'email': 'skonar.asn@gmail.com',
        'name': 'Shubhankar Koner',
        'password': '8514010072',
        '_id': '56rg54gr45rg455rh5j',
        'time': Date.now(),
        'address': 'Asansol'
    },

    {
        'email': 'mohan.asn@gmail.com',
        'name': 'Shubham Roy',
        'password': '8514010073',
        '_id': '65fa5465eaf654va6fg4g6',
        'time': Date.now(),
        'address': 'Asansol'
    },

    {
        'email': 'rohan.asn@gmail.com',
        'password': '8514010074',
        'name': 'Rohit Mukherjee',
        '_id': '65fa5465eaf654va6fg4g6',
        'time': Date.now(),
        'address': 'Burnpur'
    },

    {
        'email': 'salutu.asn@gmail.com',
        'password': '8514010075',
        'name': 'Rahul Banerjee',
        '_id': '65fa5465eaf654va6fg4g6',
        'time': Date.now(),
        'address': 'Kolkata'
    },

    {
        'email': 'sohan.asn@gmail.com',
        'password': '8514010076',
        'name': 'Sandy Gupta',
        '_id': '65fa5465eaf654va6fg4g6',
        'time': Date.now(),
        'address': 'Durgapur'
    }

]



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var requestTime = function (req, res, next)
{
    req.requestTime = Date.now()
    next()
}

app.use(requestTime)


{/* ============== GET all user =============== */ }
app.get('/alluser', function (req, res)
{
    mySqlConnection.query('SELECT * FROM userList', (err, rows, fields) =>
    {
        console.log(rows);
        if (!err) {
            res.status(200).json({
                error: false,
                result: rows,
                time: req.requestTime,
                totalUser: rows.length,
                message: 'Sucessfully found user list'
            })
        } else {
            return res.status(400).json({
                error: false,
                result: {},
                message: 'No such user found...'
            })
        }
    })
    // console.log(req.query.address);
    // var address = req.query.address
    // const foundUser = userList.filter(x =>
    // {
    //     return (
    //         x.address === req.query.address
    //     );
    // });

    // console.log(foundUser, '************* found user***********');

    // if (foundUser) {
    //     return res.status(200).json({
    //         error: false,
    //         result: foundUser,
    //         time: req.requestTime,
    //         totalUser: userList.length,
    //         message: 'Sucessfully found from ' + req.query.address
    //     })
    // } else {
    // return res.status(400).json({
    //     error: false,
    //     result: {},
    //     // time: req.requestTime,
    //     message: 'No such user found...'
    // })
    // }

});

{/* ================User Login==================== */ }
app.post('/login', urlencodedParser, function (req, res)
{
    console.log(req.body, '................body.................');
    mySqlConnection.query('SELECT * FROM userList', (err, rows, fields) =>
    {
        // if (!err) {
        var email = req.body.email
        var password = req.body.password

        const arrObj = rows.find(x =>
        {
            return (x.email === email && x.password === password);
        });

        console.log(arrObj);

        if (arrObj) {
            return (
                res.status(200).json({
                    error: false,
                    result: arrObj,
                    message: 'User Found Sucessfully...'
                })
            )
        } else {
            return (
                res.status(400).json({
                    error: true,
                    result: {},
                    message: 'Invalid username or password'
                })
            )
        }
        // }
    })

    // var email = req.body.email
    // var password = req.body.password

    // const arrObj = userList.find(x =>
    // {
    //     return (x.email === email && x.password === password);
    // });
    // console.log(arrObj, '===========arr==========');

    // if (arrObj) {
    //     return (
    //         res.status(200).json({
    //             error: false,
    //             result: arrObj,
    //             // role: role,
    //             message: 'User Found Sucessfully...'
    //         })
    //     )
    // } else {
    //     return (
    //         res.status(400).json({
    //             error: true,
    //             result: {},
    //             message: 'Invalid username or password'
    //         })
    //     )
    // }

});


{/* ================User Delete==================== */ }
app.delete('/delete/user', urlencodedParser, function (req, res)
{
    console.log(req.query.id, '................Query.................');
    mySqlConnection.query('DELETE FROM userlist WHERE _id =?', [req.query.id], (err, rows, fields) =>
    {
        console.log(rows);
        if (!err) {
            return (
                res.status(200).json({
                    error: false,
                    message: 'User deleted Sucessfully...'
                })
            )
        } else {
            return (
                res.status(400).json({
                    error: true,
                    result: {},
                    message: 'Fail to delete user..'
                })
            )
        }
        // }
    })

    // var email = req.body.email
    // var password = req.body.password

    // const arrObj = userList.find(x =>
    // {
    //     return (x.email === email && x.password === password);
    // });
    // console.log(arrObj, '===========arr==========');

    // if (arrObj) {
    //     return (
    //         res.status(200).json({
    //             error: false,
    //             result: arrObj,
    //             // role: role,
    //             message: 'User Found Sucessfully...'
    //         })
    //     )
    // } else {
    //     return (
    //         res.status(400).json({
    //             error: true,
    //             result: {},
    //             message: 'Invalid username or password'
    //         })
    //     )
    // }

});

{/* ================Create New User==================== */ }
app.post('/create/user', urlencodedParser, function (req, res)
{
    let newUser = req.body
    console.log(req.body, '................Body.................');

    var sql = 'SET @_id = ?;SET @name = ?;SET @email = ?;SET @password = ?;SET @phoneNumber = ?; \
     CALL addEdituser(@_id,@name,@email,@password,@phoneNumber);';

    mySqlConnection.query(sql, [newUser._id, newUser.name, newUser.email, newUser.password, newUser.phoneNumber], (err, rows, fields) =>
    {
        console.log(err);
        if (!err) {

            rows.forEach(element =>
            {
                if (element.constructor == Array) {
                    return (
                        res.status(200).json({
                            error: false,
                            result: element[0],
                            message: 'User created Sucessfully...'
                        })
                    )
                }
            });
        } else {
            return (
                res.status(400).json({
                    error: true,
                    result: {},
                    message: 'Fail to create user..'
                })
            )
        }
        // }
    })

    // var email = req.body.email
    // var password = req.body.password

    // const arrObj = userList.find(x =>
    // {
    //     return (x.email === email && x.password === password);
    // });
    // console.log(arrObj, '===========arr==========');

    // if (arrObj) {
    //     return (
    //         res.status(200).json({
    //             error: false,
    //             result: arrObj,
    //             // role: role,
    //             message: 'User Found Sucessfully...'
    //         })
    //     )
    // } else {
    //     return (
    //         res.status(400).json({
    //             error: true,
    //             result: {},
    //             message: 'Invalid username or password'
    //         })
    //     )
    // }

})

module.exports = app;