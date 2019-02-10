<template>
  <div id="app">
    <div class="page-wrapper">
      <mr-loader v-if="isContactingService" :message="'Contacting service...'"/>
      <mr-header/>
      <mr-left-menu/>
      <router-view class="non-selectable" :apiBinds="apiBinds"></router-view>
      <mr-notification-win v-if="os === 'win32' && notifications"/>
      <mr-notification v-else-if="os !== 'win32' && notifications"/>
    </div>
  </div>
</template>

<script>
import mrHeader from "@/renderer/components/Header";
import mrLeftMenu from "@/renderer/components/LeftMenu";
import mrLoader from "@/renderer/components/Loader";
import mrNotificationWin from "@/renderer/components/Notification-win";
import mrNotification from "@/renderer/components/Notification";

import { isNullOrUndefined } from "util";

export default {
  name: "minerity-report",
  components: {
    mrHeader,
    mrLeftMenu,
    mrLoader,
    mrNotification,
    mrNotificationWin
  },
  data() {
    return {
      registerError: null,
      isContactingService: false,
      apiBinds: new Array()
    };
  },
  mounted() {
    if (!isNullOrUndefined(this.seed)) {
      this.$router.push("dashboard");
    }
  },
  computed: {
    seed() {
      return this.$store.getters.seed;
    },
    os() {
      return this.$store.getters.os;
    },
    notifications() {
      return this.$store.getters.notifications;
    }
  }
};
</script>

<style lang="scss">
// here comes the global css var, mixins, functions, ..
@import url("https://fonts.googleapis.com/css?family=Oxygen:400,700|Source+Sans+Pro:400,600,700");

$main-title: #fff;
$button-text: #fff;
$button-background-passive: #2a93c3;
$button-background-active: #485460;
$primary-color: #1e272e;
$error-color: #f53b57;
$neutral-color: #05c46b;

$text-input-border: 1px solid rgba(255, 255, 255, 0.3);

#app {
  height: 100vh;
  width: 100vw;

  .page-wrapper {
    display: flex;
    flex-direction: row;
    height: 100%;

    .non-selectable {
      width: 100%;
    }
  }
}


* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

.non-selectable {
  -webkit-user-select: none;
}

html,
body {
  font-family: "Oxygen", sans-serif;
  background: $primary-color;
}

p {
  margin: 0;
  padding: 0;
  color: white;
  font-size: 13px;
}

.hide {
  display: none !important;
}

/deep/ .stx_xaxis,
.stx_yaxis {
  font-family: "Source Sans Pro", sans-serif;
}

/deep/ .stx_yaxis {
  text-align: right;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 100px;
}

::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, 0.09);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
}
::-webkit-scrollbar-thumb:active {
  background: rgba(0, 0, 0, 0.61);
  border-radius: 100px;
}

/* add vertical min-height & horizontal min-width */
::-webkit-scrollbar-thumb:vertical {
  min-height: 10px;
}
::-webkit-scrollbar-thumb:horizontal {
  min-width: 10px;
}
</style>
