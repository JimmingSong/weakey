// pages/relatedPerson/relatedPerson.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList:[],
    taskId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
    T.findTaskPerson({ taskId: this.data.taskId}).then(res => {
      if(res.code === 0){
        this.setData({
          contactList:res.data
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
  addContact(){
    wx.navigateTo({
      url: '../addTaskPerson/addTaskPerson?taskId='+this.data.taskId,
    })
  },
  delTaskPerson(){
    
  }
})