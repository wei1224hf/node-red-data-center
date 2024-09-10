const fs = require("fs");
const path = require("path");

module.exports = function(RED) {
    const subflowFile2 = path.join(__dirname,"dataCenterCreate.json");
    const subflowContents2 = fs.readFileSync(subflowFile2);
    const subflowJSON2 = JSON.parse(subflowContents2);
    RED.nodes.registerSubflow(subflowJSON2);    
}
