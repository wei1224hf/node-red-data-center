const fs = require("fs");
const path = require("path");

module.exports = function(RED) {

    const subflowFile = path.join(__dirname,"dataCenter.json");
    const subflowContents = fs.readFileSync(subflowFile).toString();

    const subflowJSON = JSON.parse(subflowContents);
    let arr3 = subflowJSON.flow;
    for(let i=0;i<arr3.length;i++){
        if(arr3[i].name=="set_point"){
            const pointFile = path.join(__dirname,"set_point.js");
            const pointContent = fs.readFileSync(pointFile).toString();
            arr3[i].func = pointContent;
        }        
        else if(arr3[i].name=="select_points"){
            const File = path.join(__dirname,"select_points.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }
        else if(arr3[i].name=="set_config_nodes"){
            const File = path.join(__dirname,"set_config_nodes.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }   
        else if(arr3[i].name=="update_points"){
            const File = path.join(__dirname,"update_points.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }   
        else if(arr3[i].name=="read_devices"){
            const File = path.join(__dirname,"read_devices.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }       
        else if(arr3[i].name=="read_file_type"){
            const File = path.join(__dirname,"read_file_type.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }          
        else if(arr3[i].name=="read_config_nodes"){
            const File = path.join(__dirname,"read_config_nodes.js");
            const content = fs.readFileSync(File).toString();
            arr3[i].func = content;
        }            
    }
    RED.nodes.registerSubflow(subflowJSON);
}
