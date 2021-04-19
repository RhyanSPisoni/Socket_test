const http = require('http');
const app = require('./app');
//const app = require('express');
const port = process.env.PORT || 5200;
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    }
});
const cors = require('cors');

const mssql = require('mssql');
const { Console } = require('console');
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.use(cors());


var sqlConfig = {
    server: "BANDEIRANTE\\SQLEXPRESS",
    database: "Controller_VM",
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
    let result;

    (async function () {
        try {
            console.log("Show Data")
            let pool = await mssql.connect(sqlConfig)
            result = await pool.request()
                .query(`select * from virtual_machine`)
            //console.log(result)

            socket.emit('previousMessages', result);
        } catch (err) {
            console.log(err);
        }
    })()

    console.log(`Socket conectado: ${socket.id}`);
    //Deletar Máquina Virtual
    socket.on('deleteMachine', data => {
        (async function () {
            try {
                console.log("sql connecting...................")
                let pool = await mssql.connect(sqlConfig)
                await pool.request()
                    .query(`DELETE from virtual_machine where id_vm = '${data.idVm}'`);
                // subject is my database table name - Funcional                
                //console.log(result)
                let vmsLeft = await pool.request()
                    .query('select * from virtual_machine')
                console.log(vmsLeft.recordset.length)
                socket.broadcast.emit('previousMessages', vmsLeft);

            } catch (err) {
                //console.log(err);
            }
        })()

    });

    //Inserir Máquina Virtual
    socket.on('sendMessage', data => {
        //console.log(data.value)
        console.log("START POST");
        console.log("START POST");
        console.log("START POST");
        console.log("START POST");

        (async function () {
            try {
                console.log("sql connecting......")
                let pool = await mssql.connect(sqlConfig)
                let result = await pool.request()
                    .query(`INSERT INTO virtual_machine (ds_address, fl_status, ds_abbr) values
                                  ('${data.ipAddress}','${data.status}','${data.abbr}'); 
                                 INSERT INTO content (ds_content) values ('${data.contents}')`);
                // subject is my database table name - Funcional
                console.log(result)

            } catch (err) {
                console.log(err);
            }

        })()
        socket.emit('receivedMessage', result);

        socket.on('error', err => {
            console.log(err)
        })
    });

    //Atualizar Máquina Virtual
    socket.on('patchMachine', data => {
        switch (data.action) {
            //Método Update - Atualizar dados do Banco de Dados
            case 'UPDATE':
                console.log("START UPDATE");
                console.log("START UPDATE");
                console.log("START UPDATE");
                console.log("START UPDATE");

                (async function () {
                    try {
                        console.log("sql connecting......")
                        let pool = await mssql.connect(sqlConfig)
                        let result = await pool.request()
                            .query(`UPDATE virtual_machine set ds_address = '${data.value.ipAddress}', fl_status = '${data.value.status}', ds_abbr = '${data.value.abbr}' where id_vm = '${data.value.idVm}'`);
                        // subject is my database table name - Funcional
                        console.log(result)

                    } catch (err) {
                        console.log(err);
                    }
                })()
        }
    });
});

server.listen(port);