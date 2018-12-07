//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    tab_menu: false,
    projectType:'团队项目',
    typeShow:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address:'',
    latitude:0,//纬度
    longitude:0,//经度
  },

  changeProjectType:function(){
    console.log('aa');
    var type = this.data.typeShow;
    if (type){
      this.setData({
        projectType: '个人项目',
        typeShow: false,
      })
    }else{
      this.setData({
        projectType: '团队项目',
        typeShow: true,
      })
    }
  },
  onLoad: function () {

  },
  formSubmit:function(val){
    console.log(val);
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})
