const TYPE_POST = "post";
const TYPE_COMMENT = "comment";
const TYPE_ICO = "ico";
const TYPE_PRESS = "press";

let TYPES = {};

TYPES[TYPE_POST] = {
  class: () => {
    return Post
  }
};
TYPES[TYPE_COMMENT] = {
  class: () => {
    return Comment
  }
};

TYPES[TYPE_ICO] = {
  class: () => {
    return Ico
  }
};

TYPES[TYPE_PRESS] = {
  class: () => {
    return Press
  }
};


module.exports = {
  getObjectType: (objectId) => {
    let [objectType, id] = objectId.split("_");
    return objectType;
  },
  getObject: async (objectId) => {
    let [objectType, id] = objectId.split("_");
    if (TYPES[objectType]) {
      return TYPES[objectType].class().findOne(objectId);
    }
    return null;
  },
  TYPE_POST: TYPE_POST,
  TYPE_COMMENT: TYPE_COMMENT,
  TYPE_ICO: TYPE_ICO,
  TYPE_PRESS: TYPE_PRESS
}
;
