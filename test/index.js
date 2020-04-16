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
const result = recursion.findByKey(json, "title_sub", "title", 0);
console.log(JSON.stringify(result, null, 4));