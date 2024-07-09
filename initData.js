const fs = require('fs');
const path = require('path');
const RouteFinder = require('./routefinder');

const mode = process.argv[2];
const cycle = process.argv[3];
const dataPath = './data'; // Update this to your actual data path

if (mode === 'y') {
    const airportData = {};

    const files = fs.readdirSync(path.join(dataPath, 'proc'));
    files.forEach(file => {
        const fullPath = path.join(dataPath, 'proc', file);
        const data = fs.readFileSync(fullPath, 'utf-8');
        airportData[file.replace('.txt', '')] = data;
    });

    const globalData = fs.readFileSync(path.join(dataPath, 'Airports.txt'), 'utf-8');
    airportData['GLOBAL'] = globalData.split('\n');

    fs.writeFileSync(`airport_${cycle}.air`, JSON.stringify(airportData));
    console.log('Done');
} else {
    const routeFinder = new RouteFinder();
    routeFinder.readASData(dataPath);
    console.log(`nodeList memory size：${Buffer.byteLength(JSON.stringify(routeFinder.nodeList)) / 1024} KB`);
    console.log('Generate Route');
    fs.writeFileSync(`navidata_${cycle}.map`, JSON.stringify(routeFinder.nodeList));
    console.log('Done');
}

// update config.js
console.log('updateing config.js');

const config = require('./config');
if (mode === 'y') {
    config.SET_APDAT_PATH = `airport_${cycle}.air`;
} else {
    config.SET_NAVDAT_PATH = `navidata_${cycle}.map`;
}

const navdatCycle = fs.readFileSync(path.join(dataPath, 'Cycle.txt'), 'utf-8').trim();
config.NAVDAT_CYCLE = navdatCycle;

const content = `module.exports = {
    LOCAL_ASDATA_PATH: "${config.LOCAL_ASDATA_PATH}",
    LISTEN_PORT: ${config.LISTEN_PORT},
    METAR_UPDATE_MINUTE: ${config.METAR_UPDATE_MINUTE},
    YourBingMapsKey: "${config.YourBingMapsKey}",
    BackstageKey: "${config.BackstageKey}",
    SET_NAVDAT_PATH: "${config.SET_NAVDAT_PATH}",
    SET_APDAT_PATH: "${config.SET_APDAT_PATH}",
    NAVDAT_CYCLE: "${config.NAVDAT_CYCLE}"
};`;

fs.writeFileSync('./config.js', content);
console.log(content);
console.log('ALL DONE');
