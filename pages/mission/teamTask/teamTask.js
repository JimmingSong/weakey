// pages/mission/teamTask/teamTask.js
import T from '../../../utils/request.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    missionList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
      * 跳转到详情页
      */
    jumpToDetail(e) {
      let id = e.currentTarget.dataset.taskId;
      wx.navigateTo({
        url: '../attendanceList/attendanceList?taskId=' + id
      })
    },
    searchTmTask(){
      T.searchTmTask({}).then(res => {
        if(res.code === 0){
          this.setData({
            missionList: res.data
          })
        }
      })
    }
  }
})
