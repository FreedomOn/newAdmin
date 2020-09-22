
const user = {
  state: {
    // token: getToken(),
    name: '',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    avatar404: '',
    roles: [],
    userlists: [],
    usertype: '',
    avatartype: [
      {
        'type': '省公司管理',
        'avatar': 'avatar3.png'
      },{
        'type': '市公司管理',
        'avatar': 'avatar2.png'
      },{
        'type': '施工',
        'avatar': 'avatar1.png'
      },{
        'type': '监理',
        'avatar': 'avatar1.png'

      },{
        'type': '业主',
        'avatar': 'avatar1.png'
      }
    ]
  },

  mutations: {
    // 
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TYPE: (state, type) => {
      state.usertype = type
    },
    SET_USERLIST: (state, userlist) => {
      state.userlists = userlist
    }
  },

  actions: {
  
    // 获取用户信息
    GetuserInfo ({ commit, state}) {
      console.log('2222派发的进来的吗')
      const data = JSON.parse(localStorage.getItem('user'))
      const type = localStorage.getItem('role')
      // console.log(data,'aaaa')
      // console.log(localStorage.getItem('user'))
      commit('SET_TYPE', type)
      // commit('SET_TYPE', data.roleName)
      commit('SET_USERLIST', [data.moudleList])
      // commit('SET_NAME', data.list[0].archives_name)
      // let avatar = null;
      // let dataurl = data.list[0].archives_photo_ur
      // if(dataurl) {
      //   avatar= 'GSPdwPC/ArchivesAction!downloadFile.action?gspw_archives.archives_photo_ur=' + dataurl
      // }else {
      //   avatar = ''
      // }
      // commit('SET_AVATAR', avatar)
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
