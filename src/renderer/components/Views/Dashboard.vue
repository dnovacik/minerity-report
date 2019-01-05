<template>
  <div>
    <mr-loader v-if="this.loaderMessage !== null" :message="this.loaderMessage" />
    <div id="wrapper">
      <main>
          <h2 class="title">Dashboard</h2>
          <div class="content-wrapper">
            <div class="form-wrapper">
              <div class="left">
                <mr-input :width="'250px'" :type="'text'" :placeholder="'127.0.0.1:4048'" :label="'Miner IP:PORT'" :value="this.minerInputValue" @input="val => this.minerInputValue = val" />
              </div>
              <div class="right">
                <mr-round-button value="+" @click="addMiner()" />
              </div>
            </div>
            <div class="charts">
              <canvas v-for="miner in this.cpuMiners.miners" v-bind:key="miner.name" :id="miner.name" />
            </div>
          </div>
      </main>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

import mrLoader from '@/renderer/components/Loader';
import mrButton from '@/renderer/components/controls/mrButton';
import mrRoundButton from '@/renderer/components/controls/mrRoundButton';
import mrInput from '@/renderer/components/controls/mrInput';

import { isCpuMiner, CpuMinerDataReader } from '@/main/minerListener.js';

  export default {
    name: 'dashboard',
    props: {
      onHandleInsertBindsToUser: Function,
      apiBinds: Array
    },
    components: {
      mrLoader,
      mrButton,
      mrRoundButton,
      mrInput
    },
    data() {
      return {
        loaderMessage: null,
        minerInputValue: '127.0.0.1:4048',
        cpuMiners: {
          miners: [],
          threadData: []
        }
      }
    },
    mounted() {
      if (this.apiBinds !== undefined) {
        for (var i = 0; i < this.apiBinds.length; i++) {
          this.addMiner(this.apiBinds[i]);
        }
      }
    },
    methods: {
      addMiner(ipPort) {
        var arg = ipPort || this.minerInputValue;

        isCpuMiner(arg)
          .then(result => {
            if (result.isCpu) {
              this.onHandleInsertBindsToUser(arg);
              this.handleCpuMinerAdd(result.data, arg);
            } else {
              console.log('gpu');
            }
          })
          .catch(err => {
              console.log(err);
          });
      },
      handleCpuMinerAdd(data, ipPort) {
        let miner = new CpuMinerDataReader(data.name, ipPort, data.algo, data.cpus, 5);

        miner.on('message', (e) => {
          this.cpuMiners.threadData.push(e.utf8Data.split('|'));
        });

        this.cpuMiners.miners.push(miner);
        console.log(this.cpuMiners.miners);
        console.log(this.cpuMiners.threadData);
        this.createChart(miner.name, this.cpuMiners.threadData);
      },
      handleGpuMinerAdd(data, ipPort) {

      },
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: 'line',
          data: chartData.data,
          options: {
            responsive: true,
            lineTension: 1,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                }
              }]
            }
          }
        });
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

      &  .title {
        color: #fff;
        margin-bottom: 20px;
      }

      & .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;

        & .form-wrapper {
          display: flex;
          flex-direction: row;

          & .left {
            display: flex;
          }

          & .right {
            display: flex;
            margin-left: 10px;
          }
        }

        & .charts {
          display: flex;
          margin-top: 40px;
        }
      }
    }
  }
</style>