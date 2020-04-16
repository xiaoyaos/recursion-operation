
# recursion-operation

对多层嵌套的json数据遍历操作

---

## Install

```console
npm install --save recursion-operation
```

### 你只需要在你的nestjs项目根目录下添加一个js文件，内容如下
usage
```
const recursion = require('recursion-operation');

const json = [{
  title: "title",
  subs: [{
    title: "title_sub",
    subs: [{
      title: "title_sub_sub"
    }]
  }, {
    title: "title_1_sub",
    subs: [{
      title: "title_1_sub_sub"
    }]
  }],
}, {
  title: "1_title_sub",
  subs: [{
    title: "1_title_sub_sub"
  }]
}]

// const result = recursion.deleteByKey(json, "title_sub", "title");
// console.log(JSON.stringify(json, null, 4));
const result = recursion.findByKey(json, "title_sub", "title");
console.log(JSON.stringify(result, null, 4));
```

# Bytenode API
## deleteByKey(obj, keyValue, keyName)

name | type |  Description  
-|-|-
obj | object | 需要操作的对象 |
keyValue | string | 键值 |
keyName | string | 键名 |

## findByKey(obj, keyValue, keyName, type)

name | type |  Description  
-|-|-
obj | object | 需要操作的对象 |
keyValue | string | 键值 |
keyName | string | 键名 |
type | number | 需要返回的数据 0：当前节点 -1 父节点 1 子节点