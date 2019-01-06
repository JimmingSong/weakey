// pages/createProject/createProject.js
// const QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
// var qqmapsdk;
import T from '../../utils/request.js';
const app = getApp();
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
      { key: '0', value: '1' },
      { key: '1', value: '2' },
    ],
    tpIndex: '1',
    projectStatus:[
      { key: '1', value: '有效' },
      { key: '0', value: '无效' },
    ],
    staIndex: '1',
    mainLeader: [],
    leaderIndex: '1'
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
    };
    this.getMainLeader();
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
    console.log(app);
    if(reqData.projectName === ''){
      
    } else if (reqData.projectLeader === '') {

    } else if (reqData.projectCategory === '') {

    } else if (reqData.projectPosition === ''){

    } else if (reqData.phone === '') {

    } else if (reqData.businessContact === '') {

    } else if (reqData.status === '') {

    }else{
      reqData.projectPosition = reqData.projectPosition+'-'+this.data.longitude+'-'+this.data.latitude;
      let tp = reqData.projectCategory;
      let sta = reqData.status;
      let leader = reqData.projectLeader;
      reqData.projectLeader = this.data.mainLeader[leader].contactId;
      reqData.projectCategory = this.data.projectType[tp].key;
      reqData.status = this.data.projectStatus[sta].key;
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
      tpIndex: e.detail.value
    })
  },
  getMainLeader(){
    T.findContact({}).then(res => {
      if(res.code === 0){
        this.setData({
          mainLeader: res.data
        })
      }
    })
  },
  selMainLeader(e){
    this.setData({
      leaderIndex: e.detail.value
    })
  }
})