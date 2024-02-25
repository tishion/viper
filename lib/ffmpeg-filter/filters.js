"use strict";

const path = require("path");

/**
 * input 0: main video
 * input 1: overlay video
 */
const COMMON_OVERLAY_EFFECT_SCRIPT = `
[1][0]scale2ref[filter][origin];
[filter]split[m][a];[m][a]alphamerge[effect];
[origin][effect]overlay=alpha=1:shortest=1
`;

const filters = {
  "flip-h": {
    id: "flip-h",
    name: "水平翻转",
    desc: "Flip Video horizontally",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg.complexFilter("hflip");
    },
  },

  //
  "flip-v": {
    id: "flip-v",
    name: "垂直翻转",
    desc: "Flip Video vertically",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg.complexFilter("vflip");
    },
  },

  //
  "flip-vh": {
    id: "flip-vh",
    name: "水平+垂直翻转",
    desc: "Flip Video horizontally and vertically",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg.complexFilter("hflip,vflip");
    },
  },

  //
  "overlay-effect-happy-particle": {
    id: "overlay-effect-happy-particle",
    name: "欢乐粒子",
    desc: "Overlay Effect",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg
        .input(path.join(__dirname, "effects", "happy-particle.avi"))
        .inputOptions("-stream_loop -1")
        .complexFilter(COMMON_OVERLAY_EFFECT_SCRIPT);
    },
  },

  //
  "overlay-effect-spin-firewroks": {
    id: "overlay-effect-spin-firewroks",
    name: "旋转烟花",
    desc: "Overlay Effect",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg
        .input(path.join(__dirname, "effects", "spin-firewroks.avi"))
        .inputOptions("-stream_loop -1")
        .complexFilter(COMMON_OVERLAY_EFFECT_SCRIPT);
    },
  },

  //
  "overlay-effect-thunder-lighting": {
    id: "overlay-effect-thunder-lighting",
    name: "霹雳闪电",
    desc: "Overlay Effect",
    demo: "https://ffmpeg.org/",

    prepare: (ffmpeg) => {
      return ffmpeg
        .input(path.join(__dirname, "effects", "thunder-lighting.mp4"))
        .inputOptions("-stream_loop -1")
        .complexFilter(COMMON_OVERLAY_EFFECT_SCRIPT);
    },
  },
};

module.exports = filters;
