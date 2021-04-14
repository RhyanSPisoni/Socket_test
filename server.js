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

let messages = [];

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

    console.log(`Socket conectado: ${socket.id}`);
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        //console.log(data.value)
        let a = 'TESTE'
        switch (data.action) {
            
            //Método Get - Pegar informações do Banco de Dados
            case 'GET':

                console.log("START GET");
                console.log("START GET");
                console.log("START GET");
                console.log("START GET");

                (async function () {
                    try {
                      console.log("sql connecting......")
                      let pool = await mssql.connect(sqlConfig)
                      let result = await pool.request()
                        .query('select * from virtual_machine')
                      console.log(result)

                    } catch (err) {
                        console.log(err);
                    }
                  })()

            //Método Post - Inserir dados ao Banco de Dados mssql(SQL SERVER)
            case 'POST':

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
                                ('${data.value.ipAddress}','${data.value.status}','${data.value.abbr}'); 
                            INSERT INTO content (ds_content) values ('${data.value.contents}')`); 
                        // subject is my database table name - Funcional
                        console.log(result)

                    } catch (err) {
                        console.log(err);
                    }
                })()


                break;

            //Método Delete - Deletar dados do Banco de Dados
            case 'DELETE':
                console.log("START DELETE");
                console.log("START DELETE");
                console.log("START DELETE");
                console.log("START DELETE");

                (async function () {
                    try {
                        console.log("sql connecting......")
                        let pool = await mssql.connect(sqlConfig)
                        let result = await pool.request()
                            .query(`DELETE from virtual_machine where id_vm = '${data.value.idVm}'`);
                        // subject is my database table name - Funcional
                        console.log(result)

                    } catch (err) {
                        console.log(err);
                    }
                })()

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

        console.log(data);
        messages.push(data);
        socket.emit('receivedMessage', { a });
        socket.on('error', err => {
            console.log(err)
        })
    });
});

server.listen(port);