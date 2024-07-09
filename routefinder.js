const fs = require('fs');
const path = require('path');

class RouteFinder {
    constructor() {
        this.nodeList = [];
    }

    readASData(dataPath) {
        const files = fs.readdirSync(dataPath);
        files.forEach(file => {
            const fullPath = path.join(dataPath, file);
            const data = fs.readFileSync(fullPath, 'utf-8');
            this.nodeList.push(...this.parseData(data));
        });
    }

    parseData(data) {
        // Parse the data and convert it into nodeList format
        const nodeList = [];
        const lines = data.split('\n');
        lines.forEach(line => {
            if (line) {
                const [name, ...rest] = line.split(' ');
                nodeList.push({ name, connections: rest });
            }
        });
        return nodeList;
    }

    dijkstra(start, end) {
        const distances = {};
        const prev = {};
        const queue = [];

        this.nodeList.forEach(node => {
            distances[node.name] = Infinity;
            prev[node.name] = null;
            queue.push(node.name);
        });

        distances[start] = 0;

        while (queue.length) {
            queue.sort((a, b) => distances[a] - distances[b]);
            const closestNode = queue.shift();

            if (closestNode === end) break;

            this.nodeList
                .find(node => node.name === closestNode)
                .connections.forEach(neighbor => {
                    const alt = distances[closestNode] + 1; // Assuming distance between nodes is 1
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        prev[neighbor] = closestNode;
                    }
                });
        }

        const path = [];
        let currentNode = end;
        while (currentNode) {
            path.unshift(currentNode);
            currentNode = prev[currentNode];
        }

        return path;
    }
}

module.exports = RouteFinder;
