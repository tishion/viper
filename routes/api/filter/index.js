"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    const filters = await fastify.videoFilterJob.filters();
    return Object.values(filters);
  });
};
