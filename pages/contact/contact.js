// pages/contact/contact.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.findContact();
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
  findContact(){
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
  addContact(){
    wx.navigateTo({
      url: '../addContact/addContact',
    })
  },
  deleteContact(e){
    console.log(e);
    wx.showModal({
      title: '确认删除',
      content: '是否删除此联系人',
      success: (sta) => {
        let data = {
          id: e.target.dataset.id
        }
        T.deleteContact(data).then(res => {
          if(res.code === 0){
            this.findContact();
            wx.showToast({
              title: '联系人删除成功',
            })
          }
        })
      }
    })
  },
  showDetail(e){
    console.log(e);
    wx.navigateTo({
      url: '../addContact/addContact?id='+e.currentTarget.dataset.id,
    })
  },
  search(e){
    let con = e.detail.value;
    let result= this.contactList.filter(item => {
      return item.contactName.indexOf(con) > -1 || item.contactPhone.indexOf(con) > -1;
    });
    this.setData({
      contactList:result
    })
  }
})