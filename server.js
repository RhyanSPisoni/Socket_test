const http = require('http');
const app = require('./app');
const port = process.env.PORT || 5200;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});
const cors = require('cors');

const mssql = require('mssql')
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());


const vmController = require('./controller/vm-controller');
const { SSL_OP_NO_QUERY_MTU } = require('constants');
let messages = [];

var sqlConfig = {
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

io.on('connection', socket => {

    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        //console.log(data.value)
        let a = 'fadwadwa'
        switch (data.action) {
            case 'POST':

                // (async function () {
                //     try {
                //       console.log("sql connecting......")
                //       let pool = await mssql.connect(sqlConfig)
                //       let result = await pool.request()
                //         .query('select * from virtual_machine')  // subject is my database table name - Funcional
                //       console.log(result)
                  
                //     } catch (err) {
                //       console.log(err);
                //     }
                //   })()        

                console.log("START");
                console.log("START");
                console.log("START");
                console.log("START");

                (async function () {
                    try {
                      console.log("sql connecting......")
                      let pool = await mssql.connect(sqlConfig)
                      let result = await pool.request()
                        .query(`INSERT INTO virtual_machine (ds_address, fl_status, ds_abbr) values ('${data.value.ipAddress}','${data.value.status}','${data.value.abbr}')`);
                          // subject is my database table name - Funcional
                      console.log(result)
                  
                    } catch (err) {
                      console.log(err);
                    }
                  })()      
                  
                  
        }
        // console.log(data)
        messages.push(data);
        socket.emit('receivedMessage', { a });
        socket.on('error', err => {
            console.log(err)
        })
    });
});

server.listen(port);