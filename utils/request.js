function ajax(url,data,type = 'POST'){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      data: JSON.stringify(data),
      header: {},
      method: type,
      success: function (res) {
        if(res.statusCode === 200 && res.data.code === 0){
          resolve(res.data)
        }
      },
      fail: function (res) {
        reject(res)
      },
    })
  });
}
/**
 * 查询我的项目列表
 */
function projectSearch(data){
  return ajax('http://cai.natapp1.cc/project/find',data);
}

function addProject(data){
  return ajax('http://cai.natapp1.cc/project/add', data);
}

function deleteProject(data){
  return ajax('http://cai.natapp1.cc/project/del', data);
}

function updateProject(data){
  return ajax('http://cai.natapp1.cc/project/update', data);
}
/**
 * 任务管理
 */
function addMission(data){
  return ajax('http://cai.natapp1.cc/task/addTask',data);
}
function deleteMission(data) {
  return ajax('http://cai.natapp1.cc/task/delTask', data);
}
function updateMission(data) {
  return ajax('http://cai.natapp1.cc/task/updateTask', data);
}
function searchMission(data) {
  return ajax('http://cai.natapp1.cc/task/findTask', data);
}
module.exports = {
  projectSearch,
  addProject,
  deleteProject,
  updateProject,
  addMission,
  deleteMission,
  updateMission,
  searchMission
}