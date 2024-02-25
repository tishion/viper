"use strict";

module.exports = async function (fastify, opts) {
  fastify.post("/create", async function (request, reply) {
    return await fastify.videoFilterJob.create(request.body);
  });

  fastify.get("/:id", async function (request, reply) {
    let { id } = request.params;

    let job = await fastify.videoFilterJob.get(id);

    if (job) {
      return {
        ...job.attrs.data.meta,
        params: job.attrs.data.params,
        result: job.attrs.result,
      };
    } else {
      return reply.notFound();
    }
  });

  fastify.post("/find", async function (request, reply) {
    const filter = {};
    if (request.body.filter) {
      Object.entries(request.body.filter).forEach(([key, value]) => {
        filter[`data.meta.${key}`] = value;
      });
    }

    const sort = {};
    if (request.body.sort) {
      Object.entries(request.body.sort).forEach(([key, value]) => {
        sort[`data.meta.${key}`] = value;
      });
    }

    const limit = request.body.limit || 10;
    const offset = request.body.offset || 0;

    var jobs = await fastify.videoFilterJob.find(filter, sort, limit, offset);

    if (jobs.length == 0) {
      return reply.notFound();
    } else {
      return jobs.map((x) => {
        return {
          ...x.attrs.data.meta,
          params: x.attrs.data.params,
          result: x.attrs.result,
        };
      });
    }
  });

  fastify.post("/enable", async function (request, reply) {
    return { count: await fastify.videoFilterJob.enable(request.body) };
  });

  fastify.post("/disable", async function (request, reply) {
    return { count: await fastify.videoFilterJob.disable(request.body) };
  });
};
