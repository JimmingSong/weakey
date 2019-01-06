// pages/createMission/createMission.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    longitude: '',
    latitude: '',
    taskTypeList: [
      // 1.施工 2.安装 3.整改 4.巡检 5.维护
      { k: '1', v: '施工' },
      { k: '2', v: '安装' },
      { k: '3', v: '整改' },
      { k: '4', v: '巡检' },
      { k: '5', v: '维护' }
    ],
    tpIndex: '0',
    attributeList: [
      // 1.项目工单 2.临时工单
      { k: '1', v: '项目工单' },
      { k: '2', v: '临时工单' }
    ],
    atrIndex: '0',
    projectList: [],
    projectIndex: '0',
    leaderList: [],
    leaderIndex: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProjectList();
    this.getLeaderList()
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
      let tp = data.taskType;
      let atr = data.taskProperty;
      let pro = data.projectId;
      data.taskType = this.data.taskTypeList[tp].k;
      data.taskProperty = this.data.attributeList[atr].k;
      data.projectId = this.data.projectList[pro].id;
      T.addMission(data).then(res => {
        if(res.code === 0){
          wx.showModal({
            title: '任务新建成功',
            content: '',
            success: (sta) => {
              if(sta.confirm){
                wx.navigateBack({
                  
                })
              }
            }
          })
        }
      })
    }
  },
  getProjectList(){
    T.projectSearch({}).then(res => {
      if(res.code === 0){
        this.setData({
          projectList: res.data
        })
      }
    })
  },
  getLeaderList(){
    T.findContact().then(res => {
      console.log(res);
    })
  },
  selTp(e){
    this.setData({
      tpIndex: e.detail.value
    })
  },
  selAtr(e) {
    this.setData({
      atrIndex: e.detail.value
    })
  },
  selProject(e) {
    this.setData({
      projectIndex: e.detail.value
    })
  }
})