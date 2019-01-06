// pages/createProject/createProject.js
// const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
// var qqmapsdk;
import T from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    longitude: 0,
    latitude: 0,
    disable:false,
    projectType:[
      { key: '1', value: '1' },
      { key: '2', value: '2' },
    ],
    tpIndex: 1,
    projectStatus:[
      { key: '1', value: '有效' },
      { key: '0', value: '无效' },
    ],
    staIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.modify === '1'){
      this.setData({
        disable:true
      })
    }
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
                latitude: res.latitude,
                longitude: res.longitude,
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
    let reqData = val.detail.value;
    console.log(val);
    if(reqData.projectName === ''){
      
    } else if (reqData.projectLeader === '') {

    } else if (reqData.projectCategory === '') {

    } else if (reqData.projectPosition === ''){

    } else if (reqData.phone === '') {

    } else if (reqData.businessContact === '') {

    } else if (reqData.status === '') {

    }else{
      reqData.projectPosition = reqData.projectPosition+'-'+this.data.longitude+'-'+this.data.latitude;
      T.addProject(reqData).then(res=>{
        wx.showModal({
          title: '创建项目成功',
          success: (sta) => {
            wx.navigateBack({
              
            })
          }
        })
      })
    }
  },
  /**
   * 修改状态
   */
  modifyStatus(){
    this.setData({
      disable:false
    })
  },
  /**
   * 返回上一页
   */
  back(){
    wx.navigateBack({
      
    })
  },
  selectSta(e){
    this.setData({
      staIndex: e.detail.value
    })
  },
  selectTp(e){
    this.setData({
      staIndex: e.detail.value
    })
  }
})