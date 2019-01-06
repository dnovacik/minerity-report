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
        super()

        this.name = name;
        this.ipPort = ipPort;
        this.algo = algo;
        this.cpuCount = cpuCount;
        this.data = { labels: [], datasets: [{}] }
        this.client = new wsClient();

        setInterval(() => this.client.connect(`ws://${ipPort}/threads`, 'text'), interval * 1000);

        this.client.on('connect', (connection) => {
            connection.on('message', (e) => {
                console.log(e);
                let result = this.parseHashrateMessage(e.utf8Data, this);
                this.emit('message', result);
            });
        });
    }

    parseHashrateMessage = (e, that) => {
        //"CPU=0;kH/s=29.20|CPU=1;kH/s=29.19|"
        let obj = that;
        let cpus = e.split('|');
        console.log(cpus);

        for (cpu in cpus) {
            let cpuData = cpu.split(';');

            for (data in cpuData) {
                let each = data.split('=');

                obj.data.labels.push(Date.now());
                
                if (obj.data.datasets.filter(e => e.label === 'CPU0').length > 0) {
                    
                }

                // obj.data.datasets.push({
                //     data: []
                // })
            }
        }
    }
}