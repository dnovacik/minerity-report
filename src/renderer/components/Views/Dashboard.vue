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
              <canvas v-for="miner in this.cpuMiners.miners" v-bind:key="miner.name" :id="miner.name" width="800" height="450" />
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
          chartData: []
        }
      }
    },
    watch: {
      apiBinds: function (newVal) {
        this.apiBinds = newVal;

        if (this.apiBinds.length > 0) {
          for (var i = 0; i < this.apiBinds.length; i++) {
            this.addMiner(this.apiBinds[i]);
          }
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
        this.cpuMiners.miners.push(miner);

        let chart;
        this.$nextTick(() => {
          chart = this.createChart(miner.name, miner.chartData);
        })

        miner.on('message', (e) => {
          chart.update();
        });

        miner.on('close', (e) => {
          // closed conn
        });

      },
      handleGpuMinerAdd(data, ipPort) {

      },
      createChart(chartId, dataSets) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: 'line',
          data: dataSets,
          options: {
            responsive: true,
            lineTension: 0.25,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                  maxTicksLimit: 10,
                }
              }],
              xAxes: [{
                type: 'time',
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                  showXLabels: 10
                }
              }]
            }
          }
        });

        this.cpuMiners.chartData.push(myChart);

        return myChart;
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
