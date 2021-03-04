const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'bpmtglluvmv84lg5xrcd-mysql.services.clever-cloud.com',
    port:3306,
    user: 'urlnwgghujnu0who',
    password: 'xrjRF6YHQTG2m9Hbn5ZU',
    database: 'bpmtglluvmv84lg5xrcd'
  });

  connection.connect(error => {
    if (error) throw error;
    console.log('Database connect running!');
  });

  module.exports = connection;