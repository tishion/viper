"use strict";

const path = require("path");
const Agenda = require("agenda");
const AutoLoad = require("@fastify/autoload");
const Config = require("./config");

const agenda = new Agenda();
agenda.database(Config.MONGO_DB_CONN_STRING).processEvery("5 seconds").start();

module.exports = async function (fastify, opts) {
  fastify
    .decorate("agenda", agenda)
    .register(AutoLoad, {
      dir: path.join(__dirname, "plugins"),
      options: Object.assign({}, opts),
    })
    .register(AutoLoad, {
      dir: path.join(__dirname, "routes"),
      options: Object.assign({}, opts),
    });
};
