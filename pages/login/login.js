// pages/login/login.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
   * 
   */
  back(){
    wx.redirectTo({
      url: '../register/register',
    })
  },
  login(val){
    let data = val.detail.value;
    T.login(data).then(res => {
      if (res.code === 111) {
        wx.showToast({
          title: res.msg,
          icon:'none'
        })
      }else if(res.code === 0){
        wx.setStorageSync('sessionId', res.data.sessionId);
        wx.switchTab({
          url: '../home/home',
        })
      }
    })
  }
})