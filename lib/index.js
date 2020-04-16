const assert = require('assert').strict;
let parentObj;

/**
 * 删除指定key
 * @param {*} obj
 * @param {*} keyValue 
 * @param {*} keyName
 */
const deleteByKey = function(obj, keyValue, keyName){
  assert.strictEqual('object', typeof obj, "type error! first parameter must be a object");
  assert.strictEqual('string', typeof keyValue, "type error! second parameter must be a string");
  assert.strictEqual('string', typeof keyName, "type error! thirdly parameter must be a string");
  parentObj = obj;
  const result = recursion(obj, keyValue, keyName);
  result.parentObj.subs.splice(result.index, 1);
}

/**
 * 寻找指定key
 * @param {*} obj
 * @param {*} keyValue 
 * @param {*} keyName
 * @param {*} type  -1 父节点 0 当前节点 1 子节点
 */
const findByKey = function(obj, keyValue, keyName, type = null){
  assert.strictEqual('object', typeof obj, "type error! first parameter must be a object");
  assert.strictEqual('string', typeof keyValue, "type error! second parameter must be a string");
  assert.strictEqual('string', typeof keyName, "type error! thirdly parameter must be a string");
  parentObj = obj;
  let result = recursion(obj, keyValue, keyName);
  if(type !== null){
    switch (type) {
      case -1:
        result = result.parentObj;
        break;
      case 0:
        result = result.element;
        break;
      case 1:
        result = result.element.subs;
        break;
    }
  }
  return result;
}

/**
 * 递归遍历
 * @param {*} obj 
 * @param {*} keyValue 
 * @param {*} keyName 
 */

function recursion(obj, keyValue, keyName){
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const element = obj[k];
      if(keyValue === element[keyName]){console.log(keyValue , element[keyName])
        return {parentObj, index:k, element};
      }else if(element.subs && element.subs.length){
        parentObj = element;
        return recursion(element.subs, keyValue, keyName);
      }
    }
  }
}

module.exports = {
  deleteByKey, findByKey
}