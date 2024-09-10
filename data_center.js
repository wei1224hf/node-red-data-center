const fs = require("fs");
const path = require("path");

module.exports = function(RED) {

    const subflowFile = path.join(__dirname,"dataCenter.json");
    const subflowContents = fs.readFileSync(subflowFile).toString();

    const subflowJSON = JSON.parse(subflowContents);
    let arr3 = subflowJSON.flow;
    for(let i=0;i<arr3.length;i++){
        if(arr3[i].name=="点位设置"){
            const pointFile = path.join(__dirname,"read_points.js");
            const pointContent = fs.readFileSync(pointFile).toString();
            arr3[i].func = pointContent;
        }        
        else if(arr3[i].name=="读取设备的监听点位"){
            const File = path.join(__dirname,"select_points.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }
        else if(arr3[i].name=="更新全局配置"){
            const File = path.join(__dirname,"set_config_nodes.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }   
        else if(arr3[i].name=="更新点位"){
            const File = path.join(__dirname,"update_points.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }   
        else if(arr3[i].name=="读取所有设备"){
            const File = path.join(__dirname,"read_devices.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }                     
    }
    RED.nodes.registerSubflow(subflowJSON);

    const subflowFile2 = path.join(__dirname,"dataCenterCreate.json");
    const subflowContents2 = fs.readFileSync(subflowFile2);
    const subflowJSON2 = JSON.parse(subflowContents2);
    RED.nodes.registerSubflow(subflowJSON2);    
}
