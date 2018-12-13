// pages/missionDetail/missionDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    longitude: 0,
    latitude: 0,
    disable: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.modify === '1') {
      this.setData({
        disable: true
      })
    }
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
        console.log(res)
      }
    })
  },
  /**
   * 获取定位信息方法
   */
  getPositionMsg: function () {
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
  },
  /**
   * 表单提交
   */
  formSubmit(val) {
    console.log(arguments);
  },
  /**
   * 修改状态
   */
  modifyStatus() {
    this.setData({
      disable: false
    })
  },
  /**
   * 确定按钮事件
   */
  sureStatus(val) {
    this.setData({
      disable: true
    })
  },
  /**
   * 返回上一页
   */
  back() {
    wx.navigateBack({
      delta: 1,
      success: (res) => {
        console.log(res)
      }
    })
  }
})