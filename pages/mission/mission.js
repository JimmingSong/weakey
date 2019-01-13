// pages/mission/mission.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    missionList:[],
    typeShow: true,
    firstTab: 'menu-tab first-tab active-tab',
    lastTab: 'menu-tab last-tab'
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
  },
  bindPickerChange(e){
    let dataIndex = e.currentTarget.dataset.index;
    var type = this.data.typeShow;
    if (dataIndex === '0') {
      this.setData({
        projectType: '我的任务',
        typeShow: true,
        index: dataIndex,
        firstTab: 'menu-tab first-tab active-tab',
        lastTab: 'menu-tab last-tab'
      })
    } else {
      this.setData({
        projectType: '团队任务',
        typeShow: false,
        index: dataIndex,
        firstTab: 'menu-tab first-tab',
        lastTab: 'menu-tab last-tab active-tab'
      })
    }
  }
})