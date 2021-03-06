// client.connect('ws://127.0.0.1:4049/histo', 'text'); // cgminer
// client.connect('ws://127.0.0.1:4048/summary', 'text'); //cpuminer && cg

// all commands 'summary', 'threads', 'histo'
const wsClient = require('websocket').client;
const MinerEventEmitter = require('./eventEmitter').default;

function getArrayWithLimitedLength(length) {
    var array = new Array();

    array.push = function () {
        if (this.length >= length) {
            this.shift();
        }
        return Array.prototype.push.apply(this, arguments);
    }

    return array;
}

export function isCpuMiner(ipPort) {
    return new Promise((resolve, reject) => {
        var client = new wsClient();

        client.on('connect', (connection) => {
            connection.on('message', (e) => {
                var data = e.utf8Data.split('|');
                var minerTypeString = data[0].split(';');
                var minerType = minerTypeString[0].split('=')

                if (minerType[1].startsWith('cpu')) {
                    let data = {
                        name: minerType[1],
                        algo: minerTypeString[3].split('=')[1],
                        cpus: minerTypeString[4].split('=')[1],
                    }
                    resolve({
                        isCpu: true,
                        data
                    });
                } else {
                    resolve(false);
                }
            });

            connection.on('error', (e) => {
                reject(e.message);
            });
        });

        client.on('connectFailed', (e) => {
            reject(e.message);
        });

        client.on('error', (e) => {
            reject(e.message);
        });

        client.connect(`ws://${ipPort}/summary`, 'text');
    });
}

export class CpuMinerDataReader extends MinerEventEmitter {
    constructor(name, ipPort, algo, cpuCount, interval) {
        super();

        this.name = name;
        this.ipPort = ipPort;
        this.algo = algo;
        this.cpuCount = cpuCount;
        this.chartData = this.pushToDataSets(true, this.cpuCount, true);
        this.client = new wsClient();
        this.delay = interval;
        this.interval = null;

        this.client.on('connect', (connection) => {
            connection.on('message', (e) => {
                let result = this.parseHashrateMessage(e.utf8Data, cpuCount);
                this.pushToDataSets(false, this.cpuCount, true, result, this)
                this.emit('miner_update', result);
            });
        });

        this.client.on('connectFailed', (e) => {
            clearInterval(this.interval);
            this.emit('miner_close_connection', this.name);
        });
    }

    runInInterval = () => {
        this.interval = setInterval(() => this.client.connect(`ws://${this.ipPort}/threads`, 'text'), this.delay * 1000);
    }

    pushToDataSets = (isInitiated, threadCount, isCpu, newData, minerInstance) => {
        if (isInitiated) {
            let labelsArray = getArrayWithLimitedLength(10);
            labelsArray.push(new Date().toISOString())
            return {
                labels: labelsArray,
                datasets: this.getDataSetForThreadCount(isInitiated, threadCount, isCpu, newData)
            }
        } else {
            minerInstance.chartData.labels.push(new Date().toISOString());
            this.getDataSetForThreadCount(false, threadCount, isCpu, newData, minerInstance.chartData.datasets);
        }
    }

    getDataSetForThreadCount = (isInitiated, threadCount, isCpu, newData, oldDataSets) => {
        if (isInitiated) {
            let sets = [];
            for (var i = 0; i < threadCount; i++) {
                let data = getArrayWithLimitedLength(10);
                data.push(0);
                sets.push({
                    data: data,
                    label: isCpu ? `CPU${i}` : `GPU${i}`,
                    borderColor: "#fff",
                    fill: false
                    // fill: true,
                    // backgroundColor: '#1f78b4',
                });
            }
            return sets;
        } else {
            for (var i = 0; i < threadCount; i++) {
                oldDataSets[i].data.push(newData[i][1])
            }
        }
    }

    parseHashrateMessage = (e, cpuCount) => {
        var rates = [];

        for (var cpu = 0; cpu < cpuCount; cpu++) {
            rates[cpu] = [];
        }

        let cpus = e.split('|');

        for (var i = 0; i < cpus.length; i++) {
            let cpuData = cpus[i].split(';');
            var cpu = 0;
            var plot = {};

            for (var j = 0; j < cpuData.length; j++) {
                let each = cpuData[j].split('=');

                if (each.length === 1) {
                    continue;
                }

                if (each[0] === 'CPU') {
                    cpu = parseInt(each[1], 10);
                } else if (each[0] === 'KHS' || each[0] === 'kH/s') {
                    plot.hashrate = parseFloat(each[1]);
                }
            }

            if (plot.hashrate === undefined) {
                continue;
            }

            rates[cpu] = [+new Date(), plot.hashrate]
        }
        return rates;
    }
}