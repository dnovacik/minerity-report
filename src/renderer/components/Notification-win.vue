<template></template>

<script>
import { EventEmitter } from "@/renderer/utils/eventEmitter";
const toaster = require("node-notifier/notifiers/toaster");
const path = require("path");

export default {
  name: "mrNotificationWin",
  methods: {
    callNotification(opts) {
      const notification = {
        title: opts.title || "Work Round Complete",
        body: opts.message,
        icon: path.join(__static, "icon.png")
      };

      const myNotification = new window.Notification(
        notification.title,
        notification
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