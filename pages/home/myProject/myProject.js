Component({
  data:{
    projectList:[
      {
        txt:'项目1'
      },
      {
        txt: '项目2'
      },
      {
        txt: '项目3'
      },
      {
        txt: '项目4'
      }
    ]
  },
  properties: { /* ... */ },
  methods: { /* ... */
      jumpToDetail(e) {
        wx.navigateTo({
          url: '../showDetail/showDetail?modify=1'
        })
      }  
   }
})