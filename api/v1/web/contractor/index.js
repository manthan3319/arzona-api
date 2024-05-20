/*
 * @file: index.js
 * @description: It's combine all contractor routers.
 * @author: manthann vaghasiya
 */

const save = require("./save");
const rewardadd = require("./rewardadd");
const listRamount = require("./listRamount");


module.exports = [save, rewardadd ,listRamount];
