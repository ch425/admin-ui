<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <aSider :collapsed="collapsed" :isMobile="isMobile" v-if="!isMobile"/>
    <a-drawer
      v-if="isMobile"
      title="欣旺达"
      placement="left"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="logo" />
        <a-menu
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          mode="inline"
          theme="light"
        >
          <a-menu-item key="1">
            <a-icon type="pie-chart" />
            <span>Option 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="desktop" />
            <span>Option 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="inbox" />
            <span>Option 3</span>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="mail" />
              <span>Navigation One</span>
            </span>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-menu-item key="7">Option 7</a-menu-item>
            <a-menu-item key="8">Option 8</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="appstore" />
              <span>Navigation Two</span>
            </span>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="11">Option 11</a-menu-item>
              <a-menu-item key="12">Option 12</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
      </a-menu>
    </a-drawer>
    <a-layout>
      <a-layout-header :style="{ background: '#fff',position: 'fixed', zIndex: 1, padding: 0, width: '100%' }">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="openActive"
        />
        <a-menu
          theme="light"
          mode="horizontal"
          :defaultSelectedKeys="['2']"
          :style="{ lineHeight: '64px',display: 'inline-block' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>

        <div class>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', marginTop: '80px', padding: '24px', background: '#fff', minHeight: '280px', overflow: 'auto' }" >
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer id="footerClass">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import aSider from './asider'
export default {
  components: {
    aSider: aSider
  },
  computed: {
    
  },
  data() {
    return {
      collapsed: false,
      visible: false,
      isMobile: false
    };
  },
  created() {
    this.changeMode();
    window.onresize = rest => {
      this.changeMode();
    };
  },
  methods: {
    // 改变框架模式
    changeMode() {
      this.isMobile = !this.isPC();
      if (this.getWindowWidth() < 920) {
        this.collapsed = true;
      } else {
        this.collapsed = false;
      }
    },
    // 打开左侧菜单
    openActive() {
      if (this.isMobile) {
        this.visible = !this.visible;
      } else {
        this.collapsed = !this.collapsed;
      }
    },
    // 获取当前设备的屏幕大小
    getWindowWidth() {
      return window.innerWidth;
    },
    // 获取当前设备的型号
    isPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    // 关闭左侧抽屉(移动端)
    onClose() {
      this.visible = false;
    },
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
  }
};
</script>
<style>
.ant-drawer-body {
  padding: 0;
}
#footerClass {
  background-color: #ffffff;
  text-align: center;
}
</style>