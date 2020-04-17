const assert = require('assert').strict;
var level = 0;
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
  function recursion(obj, keyValue, keyName){
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const element = obj[k];
        if(keyValue === element[keyName]){
          obj.splice(k, 1)
        }else if(element.subs && element.subs.length){
          parentObj = element;
          recursion(element.subs, keyValue, keyName);
        }
      }
    }
  }
  recursion(obj, keyValue, keyName)
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
  let result = recursion(obj, keyValue, keyName);console.log(level)
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
  if(keyValue === ""){
    obj.push(elem)
  }else{
    recursion(obj, keyValue, keyName, elem, true);
  }
}

/**
 * 递归遍历
 * @param {*} obj 
 * @param {*} keyValue 
 * @param {*} keyName 
 */

function recursion(obj, keyValue, keyName, elem = {}, add = false, parentObj = []){
  if(!parentObj.length) parentObj.push(null);
  level++;
  for (const k in obj) {
    const element = obj[k];
    if(keyValue === element[keyName]){
      if(add){
        if(!element.subs){
          element.subs = [];
        }
        element.subs.push(elem)
      }
      return {parentObj: parentObj.pop(), index:k, element};
    }else if(element.subs && element.subs.length){
      parentObj.push(element);
      let result = recursion(element.subs, keyValue, keyName, elem, add, parentObj);
      if(result){
        return result;
      }
    }
  }
  parentObj.pop();
  level--;
}

module.exports = {
  deleteByKey, findByKey, addByKey
}