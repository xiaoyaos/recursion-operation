const recursion = require('../index');

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
      title: "title_1_sub_sub",
      subs: [{
        title: "title_1_sub_sub_sub",
        subs: [{
          title: "title_1_sub_sub_sub_sub"
        },{
          title: "title_2_sub_sub_sub_sub"
        },{
          title: "title_3_sub_sub_sub_sub"
        }]
      }]
    }]
  }],
}, {
  title: "1_title_sub",
  subs: [{
    title: "1_title_sub_sub"
  }]
}]
// 删除
// const result = recursion.deleteByKey(json, "title_2_sub_sub_sub_sub", "title");
// console.log(JSON.stringify(json, null, 4));
// 寻找
// const result = recursion.findByKey(json, "title_1_sub_sub_sub", "title");
// console.log(JSON.stringify(result, null, 4));
// 增加
recursion.addByKey(json, "title_2_sub_sub_sub_sub", "title", {title:"haha"});
console.log(JSON.stringify(json, null, 4));