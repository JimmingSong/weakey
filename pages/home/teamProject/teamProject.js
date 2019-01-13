//logs.js
const util = require('../../../utils/util.js');
import T from '../../../utils/request.js';

Component({
  data:{
    teamProjectList:[]
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