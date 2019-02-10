<template>
    <div class="fix-menu">
        <div class="app-drag"></div>
        <div class="left-menu-wrapper">
        </div>
        <div class="right-menu-wrapper">
            <div class="button-wrapper" @click="this.appMinimize">
                <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 14 2" xml:space="preserve" width="15px" height="20px">
                    <line fill="none" stroke="#F6F2EB" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="1" x2="13" y2="1"/>
                </svg>
            </div>
            <div class="button-wrapper" @click="this.appClose">
                <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" viewBox="0 0 12.6 12.6" xml:space="preserve" height="15px">
                    <line fill="none" stroke="#F6F2EB" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="1" y1="1" x2="11.6" y2="11.6"/>
                    <line fill="none" stroke="#F6F2EB" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" x1="11.6" y1="1" x2="1" y2="11.6"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  name: "mrHeader",
  methods: {
    appClose() {
      ipcRenderer.send("window-close");
    },
    appMinimize() {
      ipcRenderer.send("window-minimize");
    }
  }
};
</script>

<style lang="scss" scoped>
.fix-menu {
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  width: 100%;

  & .app-drag {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    z-index: 0;
    -webkit-app-region: drag;
  }

  & .left-menu-wrapper {
    -webkit-app-region: no-drag;
    display: flex;
    margin: 10px auto 0 10px;
    z-index: 1;

    & .button-wrapper {
      cursor: pointer;

      &:hover {
        & > svg > path {
          fill: rgb(72, 84, 96);
        }
      }
    }
  }

  & .right-menu-wrapper {
    -webkit-app-region: no-drag;
    display: flex;
    margin: 10px 10px 0 auto;
    z-index: 1;

    & .button-wrapper {
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        & > svg > line {
          stroke: rgb(72, 84, 96);
        }
      }
    }
  }
}
</style>
