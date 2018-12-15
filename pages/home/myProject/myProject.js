Component({
  data:{
    projectList: [{
      "projectName": "项目一",
      "projectLeader": "负责人一",
      "businessContact": "业务",
      "phone": '18322567893',
      "projectCategory": "普通项目",
      "status": "进行中",
      "address": "上海市虹口区",
      "position": "上海市虹口区滇池路81号"
    },
    {
      "projectName": "项目二",
      "projectLeader": "负责人二",
      "businessContact": "业务",
      "phone": '18322567893',
      "projectCategory": "普通项目",
      "status": "进行中",
      "address": "上海市虹口区",
      "position": "上海市虹口区滇池路81号"
    },
    {
      "projectName": "项目三",
      "projectLeader": "负责人三",
      "businessContact": "业务",
      "phone": '18322567893',
      "projectCategory": "普通项目",
      "status": "进行中",
      "address": "上海市虹口区",
      "position": "上海市虹口区滇池路81号"
    }
    ]
  },
  properties: { /* ... */ },
  methods: { /* ... */
      jumpToDetail(e) {
        console.log(e);
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../showDetail/showDetail?modify=1&id='+id,
        })
      }  
   },
   created(){
     console.log('创建了')
   }
})