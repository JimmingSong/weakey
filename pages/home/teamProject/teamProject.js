//logs.js
const util = require('../../../utils/util.js')

Component({
  data:{
    teamProjectList:[
      { txt: '团队项目1' },
      { txt: '团队项目2' },
      { txt: '团队项目3' },
      { txt: '团队项目4' },
      { txt: '团队项目5' },
      { txt: '团队项目6' },
      { txt: '团队项目7' }
    ]
  },
  methods:{
    jumpToDetail(e){
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../showDetail/showDetail?modify=1&id=' + id,
      })
    }
  }
})