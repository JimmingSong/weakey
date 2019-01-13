// pages/punchCard/punchCard.js
import { formatTime} from '../../utils/util.js';
import T from '../../utils/request.js';
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
const app = getApp();
let qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null,
    workTime:'9:30',
    currentTime:'',
    secondTime:'',
    punchCardTime:'2018年12月30日',
    address:'',
    interval:null,
    isCan: false,
    cardText: '不允许打卡',
    taskId: '',
    taskName: '',
    commit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'RRPBZ-2DOK4-67JUE-XVJNV-K4CGE-PDF6U'
    });
    wx.getLocation({
      // type:'gcj02',
      success: (res) => {
        T.judgeAttendance({
          latitude: res.latitude,
          longitude: res.longitude
        }).then(res=>{
          if(res.code === 0){
            this.setData({
              taskId: res.data.taskId,
              taskName: res.data.taskName,
              projectId: res.data.projectId,
              projectName: res.data.projectName
            });
            if(res.data.flag){
              this.setData({
                isCan: res.data.flag,
                cardText: '打卡'
              })
            }else{
              this.setData({
                isCan: res.data.flag,
                cardText: '不允许打卡'
              })
            }
            
          }
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: (adr) => {
            if (adr.status === 0) {
              let address = adr.result.address;
              this.setData({
                address
              })
            }
          }
        })
      },
    })
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  timeDown(){
    let secondTime = formatTime('hh:mm:ss', new Date());
    let currentTime = formatTime('yyyy年MM月dd日', new Date());
    this.setData({
      currentTime,
      secondTime,
    });
    this.data.interval = setInterval(()=>{
      let secondTime = formatTime('hh:mm:ss', new Date());
      let currentTime = formatTime('yyyy年MM月dd日', new Date());
      this.setData({
        currentTime,
        secondTime,
      });
    },1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.timeDown();
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
    clearInterval(this.data.interval);
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
  showSelfModal(){
    if(this.data.isCan){
      this.setData({
        commit: true
      })
    }
    
  },
  /**
   * 打卡
   */
  punchCard(e){
    let data = {
      taskId: this.data.taskId,
      taskName: this.data.taskName,
      projectId: this.data.projectId,
      projectName: this.data.projectName,
      common: e.detail.value.common
    }
    T.operatorAttendace(data).then(res => {
      if (res.code === 0) {
        this.setData({
          commit: false
        })
        wx.showToast({
          title: '打卡成功',
        })
      }else{
        wx.showModal({
          title: res.data.msg,
        })
      }
    })
  },
  cancelCommit(){
    this.setData({
      commit: false
    })
  }
})