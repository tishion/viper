"use strict";

const fp = require("fastify-plugin");

const Agendash = require("agendash");

module.exports = fp(async function (fastify, opts) {
  fastify.register(Agendash(fastify.agenda, { middleware: "fastify" }), {
    prefix: "/dash",
  });
});
