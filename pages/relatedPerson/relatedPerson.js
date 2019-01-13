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
      taskId:options.id,
      projectId: options.projectId
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
    this.findTaskPerson();
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
  findTaskPerson(){
    T.findTaskPerson({ taskId: this.data.taskId }).then(res => {
      if (res.code === 0) {
        this.setData({
          contactList: res.data
        })
      }
    })
  },
  addContact(){
    wx.navigateTo({
      url: `../addTaskPerson/addTaskPerson?taskId=${this.data.taskId}&projectId=${this.data.projectId}`,
    })
  },
  delTaskPerson(val){
    wx.showModal({
      title: '将此人移除该任务',
      content: '将此人移除该任务列表',
      success:(sta)=>{
        if(sta.confirm){
          let data = {
            taskId:this.data.taskId,
            id: val.currentTarget.dataset.id
          }
          T.delTaskPerson(data).then(res => {
            if(res.code === 0){
              wx.showToast({
                title: '移除成功',
              }, this.findTaskPerson())
            }
          })
        }
      }
    })
  },
  showDetail(e){
    wx.navigateTo({
      url: '../attendanceList/attendanceList?taskId=' + this.data.taskId + '&employeeId=' + e.target.dataset.employeeid,
    })
  }
})