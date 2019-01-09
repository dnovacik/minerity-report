<template>
    <div class="fix-menu">
        <div class="app-drag"></div>
        <div class="left-menu-wrapper">
            <div class="button-wrapper">
                <svg version="1.2" baseProfile="tiny" id="settings-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 19.5 20" width="24" xml:space="preserve">
                    <path fill="#d3d1d1" d="M17.2,11c0-0.3,0.1-0.6,0.1-1s0-0.7-0.1-1l2.1-1.6c0.2-0.1,0.2-0.4,0.1-0.6l-2-3.5C17.3,3.1,17,3,16.8,3.1
                        l-2.5,1c-0.5-0.4-1.1-0.7-1.7-1l-0.4-2.7C12.2,0.2,12,0,11.7,0h-4C7.5,0,7.3,0.2,7.2,0.4L6.9,3.1c-0.6,0.3-1.2,0.6-1.7,1l-2.5-1
                        C2.4,3,2.2,3.1,2.1,3.3l-2,3.5C-0.1,6.9,0,7.2,0.2,7.4L2.3,9c0,0.3-0.1,0.6-0.1,1s0,0.7,0.1,1l-2.1,1.6C0,12.8-0.1,13,0.1,13.3
                        l2,3.5c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.5,0.4,1.1,0.7,1.7,1l0.4,2.6c0,0.2,0.2,0.4,0.5,0.4h4c0.3,0,0.5-0.2,0.5-0.4l0.4-2.6
                        c0.6-0.3,1.2-0.6,1.7-1l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.6L17.2,11z M9.7,13.5c-1.9,0-3.5-1.6-3.5-3.5
                        s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S11.7,13.5,9.7,13.5z"/>
                </svg>
            </div>
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
import { ipcRenderer } from 'electron';

export default {
    name: 'mrHeader',
    methods: {
        appClose() {
            ipcRenderer.send('window-close');
        },
        appMinimize() {
            ipcRenderer.send('window-minimize');
        }
    }
}
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
                    &> svg > line {
                        stroke: rgb(72, 84, 96);
                    }
                }
            }
        }
    }
</style>
