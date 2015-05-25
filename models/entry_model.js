'use strict';

var Sql = require('sequelize');
var DB = require('./dbConfig');
var sql = new Sql(DB.DATABASE, DB.USER, DB.PASS, {
    dialect: 'postgres'
});

var Entry = module.exports = sql.define('Entry', {
    title: Sql.STRING,
    ideaBody: Sql.STRING,
    tag: Sql.STRING
});

Entry.sync(); // {force: true}

