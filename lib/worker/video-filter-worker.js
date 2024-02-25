"use strict";

const fs = require("fs");
const path = require("path");

const Downloader = require("nodejs-file-downloader");
const FFMpegFilter = require("../ffmpeg-filter/ffmpeg-filter");
const Config = require("../../config");
const Logger = require("../common/worker-logger");

module.exports = (data) => {
  return {
    data: data,
    run: async () => {
      // create workspace
      const workspace = path.join(Config.WORK_SPACE_ROOT, data.meta.id);
      if (!fs.existsSync(workspace)) {
        fs.mkdirSync(workspace);
      }

      // create
      const logger = Logger(workspace);

      // download
      logger.info("=======================================================");
      logger.info(`Start downloading file from ${data.params.url}`);
      const downloadInfo = await new Downloader({
        url: data.params.url,
        directory: workspace,
        cloneFiles: false,
        onProgress: (percentage, chunk, remainingSize) => {
          if (percentage % 10 == 0) {
            logger.info(`${percentage}%, Remaining bytes: ${remainingSize}`);
          }
        },
        onError: (error) => {
          console.log(`Failed to download the file: ${error}`);
        },
      }).download();
      logger.info(`File downloaded: ${downloadInfo.filePath}`);

      // process
      logger.info("=======================================================");
      logger.info(`Start processing file from ${data.params.url}`);
      const input = downloadInfo.filePath;
      const output = path.join(workspace, `out_${path.basename(input)}`);

      // apply filter
      await FFMpegFilter.ApplyFilter(data.params.filter, input, output, logger);

      // upload
      // 如果使用第三方云盘存储处理后的视频，在这里上传

      // close logger
      logger.close();

      //upload
      return { link: output };
    },
  };
};
