const path = require('path');


const TYPE_DEFAULT = "";
const MEDIA_ROOT = "public";

let TYPES = {};

TYPES[TYPE_DEFAULT] = {
  path: "images"
};

function userPath(userId) {
  let pathPies = [];
  let pathStr = userId;
  while (pathStr.length) {
    pathPies.push(pathStr.substr(0, 2));
    pathStr = pathStr.substr(2);
  }

  return pathPies.join("/");
}

function buildPath(type = TYPE_DEFAULT, userId = null) {
  let pathArray = [sails.config.appPath, MEDIA_ROOT, TYPES[type].path];

  if (userId) {
    pathArray.push(userPath(userId));
  } else {
    //need add some default path
  }

  return path.resolve(...pathArray);
}


module.exports = {

  upload: async (file, userId = null, type = TYPE_DEFAULT) => {
    let filePath = buildPath(type, userId);

    return new Promise((resolve, reject) => {
      file.upload({
        dirname: filePath
      }, (err, uploadedFiles) => {
        "use strict";
        if (err) reject(err);
        resolve(uploadedFiles);
      })
    });
  }


};
