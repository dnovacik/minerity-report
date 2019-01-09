<template></template>

<script>
import { EventEmitter } from "@/renderer/utils/eventEmitter";
const toaster = require("node-notifier/notifiers/toaster");
const path = require("path");

export default {
  name: "mrNotificationWin",
  methods: {
    callNotification(opts) {
      let notifier = new toaster({
        withFallback: false,
        customPath: void 0
      });
      notifier.notify(
        {
          appID: "com.projectmerge.minerity-report",
          title: opts.title || "Work Round Complete",
          message: opts.message,
          icon: path.join(__static, "icon.png"),
          sound: false,
          wait: false,
          id: 1,
          remove: void 0,
          install: void 0
        },
        (err, res) => {
          if (err) {
            console.log(err);
          }
        }
      );
    },
    notifyMinerStopped(e) {
      this.callNotification({
        title: "Stopped working",
        message: `Miner ${e} stopped working.`
      });
    }
  },
  mounted() {
    EventEmitter.$on("miner_close_connection", e => this.notifyMinerStopped(e));
  },
  beforeDestroy() {
    EventEmitter.$off("miner_close_connection", e =>
      this.notifyMinerStopped(e)
    );
  }
};
</script>