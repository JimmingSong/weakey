// pages/attendanceList/attendanceList.js
import T from '../../utils/request.js';
import { formatTime } from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log({...options});
    this.getAttendanceList({...options})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAttendanceList(data = {}){
    if(data.taskId){
      this.getTaskList(data);
    } else if(data.id) {
      this.getProjectList(data)
    }else{
      this.getCurrentList();
    }
    
  },
  getTaskList(data){
    T.searchTaskAttend(data).then(res => {
      this.dealReturnData(res);
    })
  },
  getProjectList(data){
    T.searchAttendacce(data).then(res => {
      this.dealReturnData(res);
    })
  },
  getCurrentList(){
    T.getAttendace({}).then(res =>   {
      this.dealReturnData(res);
    })
  },
  dealReturnData(res){
    if (res.code === 0) {
      let result = res.data.map(item => {
        if (item.startTime) {
          item.startTime = formatTime('yyyy-MM-dd hh:mm:ss', new Date(item.startTime));
        }
        if (item.endTime) {
          item.endTime = formatTime('yyyy-MM-dd hh:mm:ss', new Date(item.endTime))
        }
        return item;
      })
      this.setData({
        list: result
      })
    } else {
      wx.showToast({
        title: res.msg,
      })
    }
  }
})