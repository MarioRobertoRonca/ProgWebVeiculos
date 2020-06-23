var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
const cors = require('cors')
app.use(cors())


// Importar o código do módulo database e usar as funções de status do banco de dados
const database = require('./config/database');
database('mongodb://localhost:27017/automoveis')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//Ligações
// endereco
const endereco = require('./routes/endereco');
app.use('/endereco', endereco);

//usuario
const usuario = require('./routes/usuario');
app.use('/usuario', usuario);

// veiculo
const veiculo = require('./routes/veiculo');
app.use('/veiculo', veiculo);

// Proposta
const proposta = require('./routes/proposta');
app.use('/proposta', proposta);

// Anuncio
const anuncio = require('./routes/anuncio');
app.use('/anuncio', anuncio);

module.exports = app;
