<template>
  <div>
    <mr-loader v-if="this.loaderMessage !== null" :message="this.loaderMessage" />
    <div id="wrapper">
      <main>
          <h2 class="title">Dashboard</h2>
          <div class="content-wrapper">
            <div class="left">
              <mr-input :width="'250px'" :type="'text'" :placeholder="'type in your api bound ip:port'" :label="'Miner IP:PORT'" :value="this.minerInputValue" />
            </div>
            <div class="right">
              <mr-round-button value="+" @click="addMiner()" />
            </div>
          </div>
      </main>
    </div>
  </div>
</template>

<script>
import mrLoader from '@/components/Loader';
import mrButton from '@/components/controls/mrButton';
import mrRoundButton from '@/components/controls/mrRoundButton';
import mrInput from '@/components/controls/mrInput';

  export default {
    name: 'dashboard',
    components: {
      mrLoader,
      mrButton,
      mrRoundButton,
      mrInput
    },
    data() {
      return {
        loaderMessage: null,
        minerInputValue: ''
      }
    },
    methods: {
      addMiner() {

      }
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

    & main {
      display: flex;
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

      & .content-wrapper {
        display: flex;
        flex-direction: row;

        & .right {
          margin-left: 10px;
        }
      }
    }
  }
</style>