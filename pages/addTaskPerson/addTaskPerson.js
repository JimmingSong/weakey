// pages/addTaskPerson/addTaskPerson.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.taskId) {
      this.setData({
        taskId: options.taskId,
        projectId: options.projectId
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
    this.findContact()
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
  findContact() {
    let data = {
      // creator:'string'
    }
    T.findContact(data).then(res => {
      if (res.code === 0) {
        this.setData({
          contactList: res.data
        });
        this.contactList = res.data;
      } else {
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  addTaskEmployee(){
    data.taskId = this.data.taskId;
    T.addTaskPerson(data).then(res => {
      if (res.code === 0) {
        wx.showToast({
          title: '添加成功',
        }, wx.navigateBack({

        }))
      }
    })
  },
  addToTask(val){
    let data = {
      employeeName:val.currentTarget.dataset.employeename,
      employeeId: val.currentTarget.dataset.employeeId,
      taskId:this.data.taskId,
      projectId: this.data.projectId
    }
    T.addTaskPerson(data).then(res => {
      if(res.code === 0){
        wx.navigateBack({
          
        })
      }
    })
  }
})