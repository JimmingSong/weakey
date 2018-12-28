function ajax(url, data, type = 'POST', head = {}){
  let sessionId = wx.getStorageSync('sessionId');
  if(!head.cookie){
    head.cookie = `JSESSIONID=${sessionId};`
  };
  let http = 'http://cai.natapp1.cc';
  return new Promise((resolve,reject)=>{
    wx.request({
      url: http+url,
      data: JSON.stringify(data),
      header: head,
      method: type,
      success: function (res) {
        if(res.statusCode === 200){
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
  return ajax('/project/find',data);
}

function addProject(data){
  return ajax('/project/add', data);
}

function deleteProject(data){
  return ajax('/project/del', data);
}

function updateProject(data){
  return ajax('/project/update', data);
}
/**
 * 任务管理
 */
function addMission(data){
  return ajax('/task/addTask',data);
}
function deleteMission(data) {
  return ajax('/task/delTask', data);
}
function updateMission(data) {
  return ajax('/task/updateTask', data);
}
function searchMission(data) {
  return ajax('/task/findTask', data);
}

function sendMessage(data){
  return ajax('/user/sendMessage',data);
}

/**
 * 用户管理
 */
function register(data,head){
  return ajax('/user/addUser',data,undefined,head);
}

function login(data){
  return ajax('/login',data);
}

module.exports = {
  projectSearch,
  addProject,
  deleteProject,
  updateProject,
  addMission,
  deleteMission,
  updateMission,
  searchMission,
  sendMessage,
  register,
  login
}