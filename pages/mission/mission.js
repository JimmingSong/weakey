// pages/mission/mission.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missionList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let data = {
      // "creator": "string",
    }
    T.searchMission(data).then(res => {
      console.log(res);
      if(res.code === 0){
        this.setData({
          missionList:res.data
        })
      }
    })
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
  /**
   * 跳转到创建任务页面
   */
  jumpToCreateMission(){
    wx.navigateTo({
      url: '../createMission/createMission',
    })
  },
  /**
   * 跳转到详情页
   */
  jumpToDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../missionDetail/missionDetail?modify=1&&id='+id
    })
  }
})