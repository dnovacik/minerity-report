// client.connect('ws://127.0.0.1:4049/histo', 'text'); // cgminer
// client.connect('ws://127.0.0.1:4048/summary', 'text'); //cpuminer && cg

// all commands 'summary', 'threads', 'histo'
const wsClient = require('websocket').client;
const EventEmitter = require('./eventEmitter.js').default;

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
                    resolve({ isCpu: true, data });
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

export class CpuMinerDataReader extends EventEmitter {
    constructor(name, ipPort, algo, cpuCount, interval) {
        super();

        this.name = name;
        this.ipPort = ipPort;
        this.algo = algo;
        this.cpuCount = cpuCount;
        this.chartData = this.pushToDataSets(true, this.cpuCount, true);
        this.client = new wsClient();

        setInterval(() => this.client.connect(`ws://${ipPort}/threads`, 'text'), interval * 1000);

        this.client.on('connect', (connection) => {
            connection.on('message', (e) => {
                let result = this.parseHashrateMessage(e.utf8Data, cpuCount);
                this.pushToDataSets(false, this.cpuCount, true, result, this)
                this.emit('message', result);
            });
        });
    }

    pushToDataSets = (isInitiated, threadCount, isCpu, newData, minerInstance) => {
        if (isInitiated) {
            return {
                labels: [new Date().toLocaleTimeString()],
                datasets: this.getDataSetForThreadCount(isInitiated, threadCount, isCpu, newData)
            }
        } else {
            minerInstance.chartData.labels.push(new Date().toLocaleTimeString());
            this.getDataSetForThreadCount(false, threadCount, isCpu, newData, minerInstance.chartData.datasets);
        }
    }

    getDataSetForThreadCount = (isInitiated, threadCount, isCpu, newData, oldDataSets) => {
        if (isInitiated) {
            let sets = [];
            for (var i = 0; i < threadCount; i++) {
                sets.push({
                    data: [0],
                    label: isCpu ? `CPU${i}` : `GPU${i}`,
                    borderColor: "#fff",
                    fill: false
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
        //"CPU=0;kH/s=29.20|CPU=1;kH/s=29.19|"
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
                }
                else if (each[0] === 'KHS' || each[0] === 'kH/s') {
                    plot.hashrate = parseFloat(each[1]);
                }
            }

            if (plot.hashrate === undefined) {
                continue;
            }

            rates[cpu] = [+ new Date(), plot.hashrate]
        }
        return rates;
    }
}