function ajax(url, data, type = 'POST', head = {}){
  let sessionId = wx.getStorageSync('sessionId');
  if(!head.cookie){
    head.cookie = `JSESSIONID=${sessionId};`
  };
  let http = 'https://www.royan-info.com:8089/';
  return new Promise((resolve,reject)=>{
    wx.request({
      url: http+url,
      data: JSON.stringify(data),
      header: head,
      method: type,
      success: function (res) {
        if(res.statusCode === 200){
          if(res.data.code === 222){
            wx.redirectTo({
              url: '../login/login',
            })
          }else{
            resolve(res.data)
          }
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
 * 查询团队任务
 */
function searchTeamProject(data){
  return ajax('/project/findTeamProjects',data,'get')
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

function searchTmTask(data){
  return ajax('/task/findTeamTask',data)
}
/**
 * 查询当前人在团队项目中的打卡记录
 */
function searchAttendacce(data){
  return ajax('/project/findAttendInProject', data);
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

/**
 * 联系人管理
 */
function addContact(data){
  return ajax('/contact/addContact',data)
}

function findContact(data = {}){
  return ajax('/contact/findContact',data);
}

function deleteContact(data){
  return ajax('/contact/delContact',data)
}

function updateContact(data){
  return ajax('/contact/updateContact',data);
}
/**
 * 任务相关人员管理
 */
function findTaskPerson(data){
  return ajax('/taskEmployee/find',data)
}
function addTaskPerson(data){
  return ajax('/taskEmployee/add',data);
}
function delTaskPerson(data){
  return ajax('/taskEmployee/del',data);
}
/**
 * 查询当前人在团队任务中的打卡记录
 */
function searchTaskAttend(data){
  return ajax('/task/findTaskAttend',data)
}

/**
 * 打卡信息
 */
function judgeAttendance(data){
  return ajax('/attendance/judgeAttendance',data);
}

function getAttendace(data){
  return ajax('/attendance/findAttendance',data)
}

function operatorAttendace(data){
  return ajax('/attendance/operateAttendance',data);
}

module.exports = {
  searchTeamProject,
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
  login,
  addContact,
  findContact,
  deleteContact,
  updateContact,
  findTaskPerson,
  addTaskPerson,
  delTaskPerson,
  judgeAttendance,
  getAttendace,
  operatorAttendace,
  searchAttendacce,
  searchTaskAttend,
  searchTmTask,
  }