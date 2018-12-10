//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    tab_menu: false,
    projectType:'团队项目',
    createProject:'新建我的项目',
    typeShow:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address:'',
    latitude:0,//纬度
    longitude:0,//经度
    array: ['我的项目', '团队项目'],
    index:0
  },

  changeProjectType:function(){
    console.log('aa');
    var type = this.data.typeShow;
    if (type){
      this.setData({
        projectType: '个人项目',
        typeShow: false,
        createProject:'新建团队项目'
      })
    }else{
      this.setData({
        projectType: '团队项目',
        typeShow: true,
        createProject: '新建我的项目'
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
  /**
   * 电机项目跳转事件
   */
  jumpToDetail(e){
    console.log(e);
  },
  /**
   * 选择项目类型事件
   */
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var type = this.data.typeShow;
    if (type) {
      this.setData({
        projectType: '个人项目',
        typeShow: false,
        index: e.detail.value
        // createProject: '新建团队项目'
      })
    } else {
      this.setData({
        projectType: '团队项目',
        typeShow: true,
        index: e.detail.value
        // createProject: '新建我的项目'
      })
    }
  },
  /**
   * 新建跳转事件
   */
  jumpToCreatePage(){
    wx.navigateTo({
      url: '../createProject/createProject?type='+this.data.index,
    })
  }
})
