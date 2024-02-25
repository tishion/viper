"use strict";

const { v4: uuidv4 } = require("uuid");
const filters = require("../ffmpeg-filter/filters");
const VideoFilterWorker = require("../worker/video-filter-worker");

const APPLY_VIDEO_FILTER_JOB_NAME = "ApplyVideoFilter";

module.exports = (agenda, options) => {
  agenda.define(APPLY_VIDEO_FILTER_JOB_NAME, options, async (job) => {
    console.log(`apply video filter job: ${job}`);
    return await VideoFilterWorker(job.attrs.data).run();
  });

  agenda.on(`start:${APPLY_VIDEO_FILTER_JOB_NAME}`, (job) => {
    console.log(`Job ${job.attrs.data.meta.id} started`);
    job.attrs.data.meta.startedAt = job.attrs.lastRunAt;
    job.attrs.data.meta.stage = "running";
    job.save();
  });

  agenda.on(`success:${APPLY_VIDEO_FILTER_JOB_NAME}`, (job) => {
    console.log(`Job ${job.attrs.data.meta.id} succeeded`);
    job.attrs.data.result = job.attrs.result;
    job.attrs.data.meta.status = "succeeded";
    job.save();
  });

  agenda.on(`fail:${APPLY_VIDEO_FILTER_JOB_NAME}`, (err, job) => {
    console.log(`Job ${job.attrs.data.meta.id} failed: ${err}`);
    job.attrs.data.meta.status = "failed";
    job.save();
  });

  agenda.on(`complete:${APPLY_VIDEO_FILTER_JOB_NAME}`, (job) => {
    console.log(`Job ${job.attrs.data.meta.id} completed`);
    job.attrs.data.meta.finishedAt = job.attrs.lastFinishedAt;
    job.attrs.data.meta.stage = "completed";
    job.save();
  });

  return {
    agenda: agenda,
    /** */
    filters: async (params) => {
      return filters;
    },

    /**
     *
     */
    create: async (params) => {
      let meta = {
        id: uuidv4(),
        stage: "queued",
        createdAt: new Date().toISOString(),
      };

      let job = {
        meta: meta,
        params: params,
      };
      await agenda.now("ApplyVideoFilter", job);

      return job;
    },

    /**
     *
     * @param {*} id
     */
    get: async (id) => {
      var jobs = await agenda.jobs(
        { "data.meta.id": id },
        { lastFinishedAt: -1 },
        1
      );

      if (jobs.length == 0) {
        return null;
      } else {
        return jobs[0];
      }
    },

    /**
     *
     * @param {*} filter
     * @param {*} sort
     * @param {*} limit
     * @param {*} skip
     */
    find: async (filter, sort, limit, skip) => {
      return await agenda.jobs(filter, sort, limit, skip);
    },

    /**
     *
     * @param {*} entity
     */
    enable: async (entity) => {
      return await agenda.enable({
        "data.meta.id": entity,
      });
    },

    /**
     *
     * @param {*} entity
     */
    disable: async (entity) => {
      return await agenda.disable({
        "data.meta.id": entity,
      });
    },
  };
};
