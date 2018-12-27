// pages/register/register.js
import T from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'获取验证码',
    time:60
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
  /**
   * 获取验证码
   */
  getCode(){
    this.time = setInterval(()=>{
      console.log('-------');
      let time = this.data.time;
      let cur = --time;
      if(cur === 0){
        this.setData({
          time:60,
          code:'获取验证码'
        });
        clearInterval(this.time);
      }else{
        this.setData({
          time: cur,
          code: time+'秒后再试'
        })
      }
    },1000)
  },
  verificationCode(val){
    console.log(val);
    let phoneNumber = this.data.phoneNumber;
    if (phoneNumber === ''){
      wx.showToast({
        title: '请输入手机号',
      });
      return
    }
    T.sendMessage(phoneNumber).then(res => {
      if(res.code === 0){
        wx.showToast({
          title: '验证码发送成功',
        });
        this.getCode();
      }
    })
  },
  getphone(e){
    this.setData({
      phoneNumber:e.detail.value
    })
  },
  formSubmit(val){
    console.log(val);
    let data = val.detail.value;
    T.register(data).then(res => {
      console.log(res);
    })
  }
})