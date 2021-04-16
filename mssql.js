// const sql = require('mssql');

// var sqlConfig = {
//     server: "BANDEIRANTE\\SQLEXPRESS",
//     database: "Controller_VM",
//     user: "sa",
//     password: "zx862",
//     connectionTimeout: 30000,
//     requestTimeout: 30000,
//     options: {
//         enableArithAbort: true,
//         useUTC: false,
//         abortTrasactionOnError: true,
//         encrypt: false
//     }
// };


//  exports.execute = async(query) =>{
//      try {
//          let pool = await sql.connect(sqlConfig);
//          let request = await pool.request();
//          let result = await request.query(query);
//          return result;
//      } catch (error) {
//          throw error
//      }
//  }

// exports.sqlConfig = sqlConfig;