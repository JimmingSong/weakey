// pages/addContact/addContact.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    formData:{
      contactName:'',
      contactPhone:''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      T.findContact({id:options.id}).then(res => {
        console.log(res);
        if(res.code === 0){
          let formData = res.data[0];
          this.setData({
            formData,
            id: options.id
          })
        }
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
  addContactPerson(val){
    let data = val.detail.value;
    let taskId = this.data.taskId;
    console.log(taskId);
    if(!taskId){
      console.log(this.data);
      if (this.data.id === '') {
        T.addContact(data).then(res => {
          if (res.code === 0) {
            wx.showToast({
              title: '添加成功',
            }, wx.navigateBack({
              delta: 1,
            }))
          }else if(res.code === 12){
            wx.showToast({
              title: res.msg,
              icon: 'none'
            })
          }
        })
      } else {
        data.id = this.data.id;
        T.updateContact(data).then(res => {
          if (res.code === 0) {
            wx.showToast({
              title: '联系人信息更新成功',
            }, wx.navigateBack({

            }))
          }
        })
      }
    }
  }
})