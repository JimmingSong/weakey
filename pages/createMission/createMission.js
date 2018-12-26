// pages/createMission/createMission.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    longitude: '',
    latitude: ''
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
   * 打开地图获取定位信息
   */
  openMap() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          address: res.address + ',' + res.name,
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
  },
  formSubmit(val){
    let data = val.detail.value;
    data.createDate = '2018-12-27';
    // data.creater = 'string';
    if(data.taskName === ''){
      wx.showToast({
        title: '任务名称不能为空',
        icon:'none'
      })
    }else if(data.taskType === ''){
      wx.showToast({
        title: '任务类型不能为空',
        icon: 'none'
      })
    } else if (data.taskProperty === '') {
      wx.showToast({
        title: '任务属性不能为空',
        icon: 'none'
      })
    } else if (data.taskLeader === '') {
      wx.showToast({
        title: '任务负责人不能为空',
        icon: 'none'
      })
    } else if (data.taskPosition === '') {
      wx.showToast({
        title: '任务位置不能为空',
        icon: 'none'
      })
    }else{
      T.addMission(data).then(res => {
        console.log(res);
      })
    }
  }
})