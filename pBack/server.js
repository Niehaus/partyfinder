const express = require('express');
const app = express();

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7115194Axd*',
    database: 'partyfinder',
});


const usuario_module = require('./app_modules/usuario.js');
const jogos_module = require('./app_modules/jogos.js');
const partida_module = require('./app_modules/partida.js');
const detalhe_module = require('./app_modules/detalhes.js')

var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(usuario_module(connection));
app.use(jogos_module(connection));
app.use(partida_module(connection));
app.use(detalhe_module(connection));


app.listen('3000', () => {
    connection.connect((err) => {
        if (err) return console.log(err);
        console.log('Backend conectado e escutando na porta 3000 ...')
    });    
});