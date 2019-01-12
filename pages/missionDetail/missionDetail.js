// pages/missionDetail/missionDetail.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      taskName:'',
      taskType:'',
      taskProperty:'',
      taskLeader:'',
      taskPosition:'',
      projectId: ''
    },
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
    leaderList: [],
    atrIndex: '0',
    projectList: [],
    taskId:'',
    address: '',
    longitude: 0,
    latitude: 0,
    disable: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskId:options.id
    })
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
    this.getMainLeader();
    this.getProjectList();
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
    if(this.data.disable){
      return;
    }
    wx.chooseLocation({
      success: (res) => {
        let address = res.address + ',' + res.name;
        let formData = this.data.formData;
        formData.taskPosition = address;
        debugger;
        this.setData({
          formData,
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
      success: (pos) => {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: pos.latitude,
            longitude: pos.longitude
          },
          coord_type: 1,
          success: (res) => {
            if (res.status === 0) {
              let formData = this.data.formData;
              formData.taskPosition = res.result.address + '-' + pos.longitude + '-' + pos.latitude;
              this.setData({
                formData
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
    let data = val.detail.value;
    data.id = this.data.taskId;
    let atr = data.taskProperty;
    if (atr === '1'){
      data.parojectName = null;
    }else{
      let proIndex = data.projectName;
      data.projectId = this.data.projectList[proIndex].id;
      data.projectName = this.data.projectList[proIndex].projectName;
    };
    data.taskProperty = this.data.attributeList[atr].k;
    // data.taskPosition = data.taskPosition+'-'+this.data.longitude+'-'+this.data.latitude;
    T.updateMission(data).then(res => {
      if(res.code === 0){
        wx.showToast({
          title: '任务详情修改成功',
        })
        this.setData({
          disable: true
        })
      }
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
      delta: 1
    })
  },
  deleteMission(){
    wx.showModal({
      title: '删除此任务',
      content: '删除是危险操作,请谨慎操作',
      success:(val)=>{
        if(val.confirm){
          T.deleteMission({id:this.data.taskId}).then(res => {
            if(res.code === 0){
              wx.showToast({
                title: '删除成功',
              },this.back())
            }
          })
        }
      }
    })
  },
  jumpToList(e){
    let taskId = e.currentTarget.dataset.id;
    let projectId = e.currentTarget.dataset.projectid;
    wx.navigateTo({
      url: `../relatedPerson/relatedPerson?id=${taskId}&projectId=${projectId}`,
    })
  },
  getMainLeader() {
    T.findContact({}).then(res => {
      if (res.code === 0) {
        this.setData({
          leaderList: res.data
        })
      }
    })
  },
  getProjectList() {
    T.projectSearch({}).then(res => {
      if (res.code === 0) {
        T.searchMission({ id: this.data.taskId }).then(rdata => {
          if (rdata.code === 0) {
            let taskData = rdata.data[0];
            res.data.forEach((item,index) => {
              if (item.id === parseFloat(taskData.projectId)){
                taskData.projectIndex = index
              }
            });
            taskData.taskProperty = taskData.taskProperty - 1;
            this.setData({
              formData: taskData
            })
          }
        });
        this.setData({
          projectList: res.data
        })
      }
    })
  },
  /**
   * 显示所属项目
   */
  showProjectFrom(id){
    let index;
    return 1
  },
  selProject(e) {
    let formData = this.data.formData;
    formData.projectIndex = e.detail.value;
    
    this.setData({
      formData
    })
  },
  changeEvent(e){
    let formData = this.data.formData;
    let atr = e.target.dataset.atr;
    formData[atr] = e.detail.value;
    this.setData({
      formData
    })
  }
})