//index.js
import T from '../../utils/request.js';
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    tab_menu: false,
    projectType:'我的项目',
    createProject:'新建我的项目',
    typeShow:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    address:'',
    latitude:0,//纬度
    longitude:0,//经度
    array: ['我的项目', '团队项目'],
    index:0,
    myProject:[],
    firstTab:'menu-tab first-tab active-tab',
    lastTab: 'menu-tab last-tab'
  },

  changeProjectType:function(){
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    T.projectSearch({}).then(res => {
      if (res.code === 0) {
        this.setData({
          myProject: res.data
        })
      }
    })
  },
  formSubmit:function(val){
    console.log(val);
  },
  getUserInfo: function(e) {
    console.log(e);
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
    let dataIndex = e.currentTarget.dataset.index;
    var type = this.data.typeShow;
    if (dataIndex === '0') {
      this.setData({
        projectType: '我的项目',
        typeShow: true,
        index: dataIndex,
        firstTab: 'menu-tab first-tab active-tab',
        lastTab: 'menu-tab last-tab'
      })
    } else {
      this.setData({
        projectType: '团队项目',
        typeShow: false,
        index: dataIndex,
        firstTab: 'menu-tab first-tab',
        lastTab: 'menu-tab last-tab active-tab'
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
  },
  /**
   * tab切换
   */
  tabChange(e){

  }
})
