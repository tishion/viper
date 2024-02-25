"use strict";

const fp = require("fastify-plugin");
const VideoFilterJob = require("../lib/jobs/video-filter-job");
const WaterMarkJob = require("../lib/jobs/video-watermark-job");
const Config = require("../config");

const filterJobOptions = {
  concurrency: Config.CONCURRENT_RUNS,
  shouldSaveResult: true,
};

module.exports = fp(async function (fastify, options) {
  fastify.decorate(
    "videoFilterJob",
    VideoFilterJob(fastify.agenda, {
      ...options,
      ...filterJobOptions,
    })
  );

  fastify.decorate(
    "watermarkJob",
    WaterMarkJob(fastify.agenda, {
      ...options,
    })
  );
});
