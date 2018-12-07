// pages/createProject/createProject.js
// const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
// var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    longitude:0,
    latitude:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // qqmapsdk = new QQMapWX({
    //   key: 'RRPBZ-2DOK4-67JUE-XVJNV-K4CGE-PDF6U'
    // })
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
  openMap:()=>{
    wx.chooseLocation({
      success:(res)=>{
        this.setData({
          address:res.address+','+res.name,
          longitude:res.longitude,
          latitude:res.latitude
        })
        console.log(res)
      }
    })
  },
   /**
    * 获取定位信息方法
    */
  getPositionMsg:function(){
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type: 1,
          success: (res) => {
            if (res.status === 0) {
              this.setData({
                address: res.result.address
              })
            }
          }
        });
      }
    })
  }
})