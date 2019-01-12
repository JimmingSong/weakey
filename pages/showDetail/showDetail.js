// pages/showDetail/showDetail.js
import T from '../../utils/request.js';
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
    projectType: [
      { key: '0', value: '1' },
      { key: '1', value: '2' },
    ],
    address: '',
    longitude: 0,
    latitude: 0,
    disable: false,
    mainLeader: [],
    leaderIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let projectId = options.id;
    T.projectSearch({id:options.id}).then(res => {
      let projectData = res.data[0];
      if(res.code === 0){
        this.setData({
          projectId,
          projectData
        })
      }
    })
    // let data = Object.assign({}, this.data.projectData, simulateData[options.id]);
    // console.log(data);
    // this.setData({
    //   projectData: data
    // })
    if (options.modify === '1') {
      this.setData({
        disable: true,
      })
    }
    this.getMainLeader();
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
        console.log(this.data.disable);
        let data = Object.assign({}, this.data.projectData, { projectPosition:res.address,position:res.address,longitude:res.longitude,latitude:res.latitude});
        this.setData({
          projectData:data
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
        console.log(this.data.disable);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          coord_type: 1,
          success: (res) => {
            if (res.status === 0) {
              console.log(this.data.disable);
              this.setData({
                projectPosition: res.result.address,
                latitude: res.latitude,
                longitude: res.longitude
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
    let formData = val.detail.value;
    val.projectPosition = val.projectPosition + '-' + this.data.longitude + '-' + this.data.latitude;
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
  getMainLeader() {
    T.findContact({}).then(res => {
      if (res.code === 0) {
        this.setData({
          mainLeader: res.data
        })
      }
    })
  },
  chagneLeader(e){
    let leader = this.data.projectData;
    leader.projectLeader = e.detail.value;
    
    this.setData({
      projectData: leader
    })
  }
})