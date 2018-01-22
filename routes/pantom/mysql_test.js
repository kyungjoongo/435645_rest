//import mysql from 'nodejs-mysql'

const mysql = require('nodejs-mysql').default;

const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1114',
    database: 'test'
}


const db = mysql.getInstance(config)

db.exec('select * from test').then(rows => {

    console.log(rows);

    for (var i = 0; i < rows.length; i++) {

        console.log('##############' + rows[i].name);
    }


});


// insert
db.exec('insert into test set ?', {
    id: 3,
    name: '고경준 천재님이십니다sdlfksldkfsldkf'
}).then(rows => {

    console.log('###########good'+JSON.stringify( rows));

}).catch(e => {
    // insert failed, handle errors
})

