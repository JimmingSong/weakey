import T from '../../../utils/request.js';
Component({
  data:{
    projectList: [
    ]
  },
  properties: { /* ... */ },
  methods: { /* ... */
      jumpToDetail(e) {
        console.log(e);
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../showDetail/showDetail?modify=1&id='+id,
        })
      }
   },
   created(){
     let data = {
       creatror:'string'
     }
     T.projectSearch(data).then(res=>{
       if(res.code === 0){
         this.setData({
            projectList:res.data
          })
       }
     })
   }
})