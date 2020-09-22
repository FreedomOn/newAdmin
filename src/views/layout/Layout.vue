
<template>
  <div>
    <div class="headerbox">
      <!-- <img src="/static/images/headbg.jpg" alt="" class="headbg">
      <img src="/static/images/logo.png" alt="" class="logo"> -->
      <div class="headright">
        <div @click="loadpage">
          <i class="el-icon-refresh">刷新</i>
        </div>
        <div @click="logout">
          <svg-icon icon-class="quitsvg"></svg-icon>
          退出
        </div>
    
      </div>
    </div>
     <div class="app-wrapper" :class="classObj">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <navbar></navbar>
          <app-main></app-main>
        </div>
    </div>
  </div>
  
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    loadpage () {
      location.reload()       
    },
    logout() {
      sessionStorage.removeItem("role")
      localStorage.removeItem("role")　
      localStorage.removeItem("user")
      location.reload()
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    top:-10px;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  // xia
  .headerbox {
    position: fixed;
    height: 60px;
    background: #1A9CDB;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2000;
   
    .headright {
       position: fixed;
      right: 10px;
      top: 20px;
      display: flex;
      color: #fff;
      > div {
        cursor: pointer;
        margin-right: 20px;
      }
    }
  }
</style>
