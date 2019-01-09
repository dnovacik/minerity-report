<template></template>

<script>
import { EventEmitter } from "@/renderer/utils/eventEmitter";
const path = require("path");

export default {
  name: "mrNotification",
  data() {
    return {
      notification: null
    };
  },
  methods: {
    callNotification(opts) {
      this.notification = new Notification(opts.title, {
        body: opts.body,
        icon: path.join("static", "icon.png"),
        silent: true
      });
    },
    notifyMinerStopped(e) {
      this.callNotification({
        title: "Work Round Complete",
        body: "Begin a short break."
      });
    }
  },
  mounted() {
    EventEmitter.$on("closed_connection", e => {
      this.notifyMinerStopped(e);
    });
  },
  beforeDestroy() {
    EventEmitter.$off("closed_connection", e => this.notifyMinerStopped(e));
  }
};
</script>