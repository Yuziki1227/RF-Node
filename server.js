const express = require('express');
const bodyParser = require('body-parser');
const RouteFinder = require('./routefinder');
const config = require('./config');

const app = express();
const port = process.env.PORT || config.LISTEN_PORT;

app.use(bodyParser.json());

app.post('/route', (req, res) => {
    const { orig, dest } = req.body;
    const routeFinder = new RouteFinder();
    routeFinder.readASData(config.LOCAL_ASDATA_PATH);
    const result = routeFinder.dijkstra(orig, dest);
    res.send(result);
});

app.post('/init', (req, res) => {
    const { mode, cycle } = req.body;
    const { exec } = require('child_process');
    exec(`node initData.js ${mode} ${cycle}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error: ${error.message}`);
        } else if (stderr) {
            res.status(500).send(`Error: ${stderr}`);
        } else {
            res.send(stdout);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
