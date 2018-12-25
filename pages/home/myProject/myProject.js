import T from '../../../utils/request.js';
Component({
  data:{
    
  },
  properties: { 
    projectList:Array
  },
  methods: { /* ... */
      jumpToDetail(e) {
        console.log(e);
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: '../showDetail/showDetail?modify=1&id='+id,
        })
      }
   }
})