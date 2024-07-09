### AEROCAT ROUTE FINDER (NODEJS) VERSION 2.0
`Last Update:July 10, 2024`
Known Issues:Not sensitive to NAT TRACK, do not use it to search North Atlantic routes.

### HOW TO USE THAT?
All you need to do is install the required extensions and use "node server" to get started!

### THIS SOFTWARE CAN DO?
Used to query flight paths, it is the principle of querying flight paths between two airports and connecting them in the shortest distance.

### WHY MAKE THIS SOFTWARE?
My intention is simple, for members of the AEROCAT platform to use

### HOW TO MAKE NEW AIRAC DATAS?
You will need the AEROSOFT data for Navigraph, which is usually in Documents\Aerosoft\General\A3XX Navigraph, you can copy the data into the Data directory and run initData to update your proprietary data.

### HOW TO REQUEST?
Here's a sample of Curl with Powershell:<br /><br />
curl -X POST http://localhost:3000/route -H "Content-Type: application/json" -d '{"orig":"ZBAA","dest":"ZSPD"}'<br /><br />
Invoke-RestMethod -Uri "http://localhost:3000/route" -Method Post -ContentType "application/json" -Body '{"orig":"ZBAA","dest":"ZSPD"}'<br /><br />
