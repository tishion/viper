"use strict";

const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static");

const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const filters = require("./filters");

module.exports = {
  /**
   *
   * @returns
   */
  GetFilters: async () => {
    return filters;
  },

  /**
   *
   * @param {*} id
   * @param {*} input
   * @param {*} output
   * @param {*} logger
   * @returns
   */
  ApplyFilter: async (id, input, output, logger) => {
    const filter = filters[id];
    return new Promise((resolve, reject) => {
      const ffmpegCommand = ffmpeg()
        // general config
        .on("start", (cmdline) => {
          logger.info(`ffmpeg processing started with command: ${cmdline}`);
        })
        .on("end", () => {
          logger.info(`ffmpeg processing done`);
          resolve();
        })
        .on("error", (error) => {
          logger.error(`ffmpeg processing error: ${error.message}`);
          reject(error);
        })
        .on("stderr", (stderr) => {
          logger.info(`ffmpeg stderr: ${stderr}`);
        })
        .input(input)
        .output(output);

      // apply filter
      return filter.prepare(ffmpegCommand).run();
    });
  },
};
