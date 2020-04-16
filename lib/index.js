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
  if(parentObj instanceof Array ){
    result.parentObj.splice(result.index, 1);
  }else{
    result.parentObj.subs.splice(result.index, 1);
  }
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
 * 增加
 * @param {*} obj
 * @param {*} keyValue 
 * @param {*} keyName
 * @param {*} elem  
 */
const addByKey = function(obj, keyValue, keyName, elem){
  assert.strictEqual('object', typeof obj, "type error! first parameter must be a object");
  assert.strictEqual('string', typeof keyValue, "type error! second parameter must be a string");
  assert.strictEqual('string', typeof keyName, "type error! thirdly parameter must be a string");
  assert.strictEqual('object', typeof elem, "type error! last parameter must be a object");
  parentObj = obj;
  recursion(obj, keyValue, keyName, elem, true);
}

/**
 * 递归遍历
 * @param {*} obj 
 * @param {*} keyValue 
 * @param {*} keyName 
 */

function recursion(obj, keyValue, keyName, elem = {}, add = false){
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const element = obj[k];
      if(keyValue === element[keyName]){
        if(add){
          if(!element.subs){
            element.subs = [];
          }
          element.subs.push(elem)
        }
        return {parentObj, index:k, element};
      }else if(element.subs && element.subs.length){
        parentObj = element;
        return recursion(element.subs, keyValue, keyName, elem, true);
      }
    }
  }
}

module.exports = {
  deleteByKey, findByKey, addByKey
}