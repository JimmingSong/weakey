//logs.js
const util = require('../../../utils/util.js');
import T from '../../../utils/request.js';

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
    },
    searchProjectList() {
      T.searchTeamProject({}).then(res => {
        if(res.code === 0){
          this.setData({
            teamProjectList:res.data
          })
        }
      })
    },
  },
  
  lifetimes:{
    attached() {
      this.searchProjectList();
    },
  }
})