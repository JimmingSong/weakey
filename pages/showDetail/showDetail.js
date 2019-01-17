// pages/showDetail/showDetail.js
import T from '../../utils/request.js';
const QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectData:{
      projectName:'',
      projectLeader:'',
      businessContact:'',
      phone:'',
      projectCategory:'',
      status:'',
      projectPosition:'',
      position:''
    },
    projectStatus: [
      { key: '0', value: '无效' },
      { key: '1', value: '有效' },
    ],
    address: '',
    longitude: 0,
    latitude: 0,
    disable: false,
    mainLeader: [],
    leaderIndex: 0,
    showTaskList: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'RRPBZ-2DOK4-67JUE-XVJNV-K4CGE-PDF6U'
    });
    let projectId = options.id;
    if (options.modify === '1') {
      this.setData({
        disable: true,
      })
    }
    this.getMainLeader(projectId);
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
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success: () => {
              this.chooseLoca();
            }
          })
        }else{
          this.chooseLoca();
        }
      }
    })
    
  },
  chooseLoca(){
    wx.chooseLocation({
      success: (res) => {
        console.log(this.data.disable);
        let data = Object.assign({}, this.data.projectData, { projectPosition: res.address, position: res.address, longitude: res.longitude, latitude: res.latitude });
        this.setData({
          projectData: data
        })
      }
    })
  },
  /**
   * 表单提交
   */
  formSubmit(val) {
    if (this.data.disable){
      return;
    }
    let formData = val.detail.value;
    val.projectPosition = val.projectPosition + ';' + this.data.longitude + ';' + this.data.latitude;
    wx.showLoading({
      title: '提交中...',
    });
    let data = Object.assign({}, formData, {id:this.data.projectId});
    T.updateProject(data).then(res => {
      wx.hideLoading();
      this.setData({
        disable: true
      })
    })
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
   * 返回上一页
   */
  back() {
    wx.navigateBack({
      delta:1,
      success:(res)=>{
        console.log(res)
      }
    })
  },
  deleteCurData(){
    wx.showModal({
      title: '确定要删除这个项目吗?',
      content: '删除是危险操作,请谨慎操作!',
      success:(sta) => {
        if(sta.confirm){
          T.deleteProject({ id: this.data.projectId }).then(res => {
            if (res.code === 0) {
              wx.showToast({
                title: '删除成功',
              },this.back())
              // this.back()
            }
          })
        }
      }
    })    
  },
  /**
   * 获取联系人列表
   */
  getMainLeader(id) {
    T.findContact({}).then(res => {
      if (res.code === 0) {
        this.getProjectInfo(id,res.data)
        this.setData({
          mainLeader: res.data
        })
      }
    })
  },
  /**
   * 获取项目信息
   */
  getProjectInfo(id,mainLeader){
    T.projectSearch({id}).then(res => {
      let projectData = res.data[0];
      if (res.code === 0) {
        mainLeader.forEach((item,index) => {
          if(projectData.projectLeader === item.ownerId){
            projectData.projectLeader = index;
          }
        })
        this.setData({
          projectId:id,
          projectData
        })
      }
    })
  },
  chagneLeader(e){
    let atr = e.target.dataset.atr;
    let leader = this.data.projectData;
    leader[atr] = e.detail.value;
    this.setData({
      projectData: leader
    })
  },
  showTask(){
    let isShow = this.data.showTaskList;
    if (this.data.projectData.taskDOList <= 0){
      wx.showToast({
        title: '当前项目没有任务',
        icon: 'none'
      })
    }else{
      this.setData({
        showTaskList: !isShow
      })
    }
    
  },
  jumpToTaskDetail(e){
    debugger;
    let taskId = e.currentTarget.dataset.taskid;
    wx.navigateTo({
      url: '../missionDetail/missionDetail?id='+taskId,
    })
  }
})