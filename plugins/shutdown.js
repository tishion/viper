"use strict";

const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("fastify-graceful-shutdown")).after(() => {
    fastify.gracefulShutdown(async (signal, next) => {
      await fastify.agenda.stop();
      console.log("Service shutdown");
      next();
    });
  });
});
