const sql = require('mssql');
const connStr = "Server=localhost;Database=Controller_VM;User Id=XXX;Password=XXX;";

var dbConfig = {
    server: "BANDEIRANTE\\SQLEXPRESS",
    database: "Controller_VM" ,
    user: "sa",
    password: "zx862",
    connectionTimeout: 30000,
    requestTimeout: 30000,
    options: {
        enableArithAbort: true,
        useUTC: false,
        abortTrasactionOnError: true,
        encrypt: false
    }
};


exports.execute = async(query) =>{
    try {
        let pool = await sql.connect(dbConfig);
        let request = await pool.request();
        let result = await request.query(query);
        return result;
    } catch (error) {
        throw error
    }
}

exports.dbConfig = dbConfig;