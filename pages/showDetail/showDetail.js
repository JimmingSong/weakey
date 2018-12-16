// pages/showDetail/showDetail.js
let simulateData = [{
  "projectName": "项目一",
  "projectLeader": "负责人一",
  "businessContact": "业务",
  "phone": '18322567893',
  "projectCategory": "普通项目",
  "status": "进行中",
  "address": "上海市虹口区",
  "position": "上海市虹口区滇池路81号"
},
{
  "projectName": "项目二",
  "projectLeader": "负责人二",
  "businessContact": "业务",
  "phone": '18322567893',
  "projectCategory": "普通项目",
  "status": "进行中",
  "address": "上海市虹口区",
  "position": "上海市虹口区滇池路81号"
},
{
  "projectName": "项目三",
  "projectLeader": "负责人三",
  "businessContact": "业务",
  "phone": '18322567893',
  "projectCategory": "普通项目",
  "status": "进行中",
  "address": "上海市虹口区",
  "position": "上海市虹口区滇池路81号"
}
]
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
      address:'',
      position:''
    },
    address: '',
    longitude: 0,
    latitude: 0,
    disable: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let data = Object.assign({}, this.data.projectData, simulateData[options.id]);
    console.log(data);
    this.setData({
      projectData: data
    })
    if (options.modify === '1') {
      this.setData({
        disable: true,
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
        let data = Object.assign({},this.data.projectData,{address:res.address,position:res.address,longitude:res.longitude,latitude:res.latitude});
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
  sureStatus(val){
    this.setData({
      disable:true
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
    let projectData = {};
    this.setData({
      projectData
    },this.back())
  }
})