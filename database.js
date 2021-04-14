'use strict';

const mssql = require('mssql');

/**
 * Executa uma query com base nos parâmetros passados.
 * @param {JSON} dbConfig Configurações de conexão básica.
 * @param {String} queryStr String que será executada.
 * @returns Resultado da query ou erro.
 */
exports.query = async(dbConfig, queryStr) => {
    try {
        const poolConfig = assembleValues(dbConfig);
        const pool = new mssql.ConnectionPool(poolConfig);
        await pool.connect();
        let request = pool.request();
        let result = await request.query(queryStr);
        await pool.close();
        return result
    } catch (error) {
        throw error
    }
}

/**
 * Cria uma esturtura de ConnectionPool com os dados vindos do parâmetro dbConfig
 * @param {JSON} dbConfig Configurações de conexão básica.
 * @returns Estrutura da classe ConnectionPool
 */
function assembleValues(dbConfig){
    let configParams = Object.assign({}, PoolParams);
    Object.keys(dbConfig).forEach(key => {
        configParams[key] = dbConfig[key];
    });
    return configParams;
}

const PoolParams = {
    user: null,
    password: null,
    server: null,
    database: null,
    port: 1433,
    connectionTimeout: 40000,
    requestTimeout: 86400000,
    options: {
        appName: 'app',
        useUTC: false,
        enableArithAbort: true,
        encrypt: false,
        rowCollectionOnRequestCompletion: false,
        abortTransactionOnError: true,
    }
};