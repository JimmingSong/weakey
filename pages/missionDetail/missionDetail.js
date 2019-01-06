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
    typeList: [{ key: 1, v: '类型1' }, { key: 2, v: '类型2' }, { key: 3, v: '类型3' }, { key: 4, v: '类型3'}],
    // typeList:['1','2','3'],
    index: 1,
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
    T.searchMission({ id: this.data.taskId }).then(res => {
      if (res.code === 0) {
        this.setData({
          formData:res.data[0]
        })
      }
    })
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
    let data = val.detail.value;
    console.log(data);
    data.id = this.data.taskId;
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
   * 
   */
  pickChange(val){
    console.log(val);
    let index = val.detail.value;
    this.setData({
      index
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
    console.log(e);
    let taskId = e.currentTarget.dataset.id;
    let projectId = e.currentTarget.dataset.projectid;
    wx.navigateTo({
      url: `../relatedPerson/relatedPerson?id=${taskId}&projectId=${projectId}`,
    })
  }
})