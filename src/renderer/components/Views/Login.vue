<template>
  <div id="wrapper">
    <div class="logo-wrapper">
      <img id="logo" src="~@/assets/icons/chart-bar-regular.svg" alt="Minerity Report">
      <span class="brand">Minerity Report</span>
    </div>
    <main>
      <div>
        <h2 class="title">Create Your Account</h2>
        <mr-button value="Generate new seed" width="170px" @click="createAccount()" />
        <span v-if="this.loginError !== null">An error occured - {{this.loginError}}. Please try again later</span>
      </div>
    </main>
  </div>
</template>

<script>
  import uuid from 'uuid/v1';
  import firebase from 'firebase';
  import mrButton from '@/components/controls/mrButton.vue'

  export default {
    name: 'login',
    props: {
      onHandleLogin: Function,
      loginError: String
    },
    components: {
      mrButton
    },
    data() {
      return {
        key: '',
      };
    },
    methods: {
      createSeed() {
        return uuid();
      },
      createAccount() {
        const seed = this.createSeed();

        this.onHandleLogin(seed);
      },
    }
  }
  
</script>

<style lang="scss" scoped>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  #wrapper {
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .logo-wrapper {
      width: 100%;
      height: auto;
      color: #000;
      display: flex;
      justify-content: center;
      align-items: baseline !important;
      flex-direction: row;
      margin: 0 auto;
      fill: #fff;

      #logo {
        display: inline-flex;
        align-self: center;
        width: 50px;
        height: auto;
      }

      & .brand {
        display: inline-flex;
        color: #fff;
        font-size: 32px;
        margin-left: 20px;
      }
    }

    & main {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
      width: 100%;
      height: 100%;
      margin-top: 50px;

      &  .title {
        color: #fff;
        margin-bottom: 20px;
      }
    }
  }


</style>
