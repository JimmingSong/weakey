// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList:[
    {
      name:'张三',
      phone:'123456'
    },
    {
      name: '赵李四',
      phone: '123456'
    }, 
    {
      name: '欧阳张三sssssss',
      phone: '123456'
    }
    ]

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
      url: '../addContact/addContact',
    })
  },
  deleteContact(e){
    wx.showModal({
      title: '确认删除',
      content: '是否删除此联系人',
      success: (sta) => {
        console.log(sta);
      }
    })
  }
})