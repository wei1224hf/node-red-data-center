const arr = msg.payload;
let config_nodes = global.get("config-nodes");

for(let i=0;i<arr.length;i++){
    const t = arr[i];
    if(t.connect_type == 'modbus-server'){
        var obj =   {
            "id": "967785e4049706c4",
            "type": "modbus-client",
            "name": "6轴-84",
            "clienttype": "tcp",
            "bufferCommands": true,
            "stateLogEnabled": false,
            "queueLogEnabled": false,
            "failureLogEnabled": true,
            "tcpHost": "193.168.110.84",
            "tcpPort": "502",
            "tcpType": "DEFAULT",
            "serialPort": "/dev/ttyUSB",
            "serialType": "RTU-BUFFERD",
            "serialBaudrate": "9600",
            "serialDatabits": "8",
            "serialStopbits": "1",
            "serialParity": "none",
            "serialConnectionDelay": "100",
            "serialAsciiResponseStartDelimiter": "0x3A",
            "unit_id": "1",
            "commandDelay": "1",
            "clientTimeout": "1000",
            "reconnectOnTimeout": true,
            "reconnectTimeout": "2000",
            "parallelUnitIdsAllowed": true,
            "showErrors": false,
            "showWarnings": true,
            "showLogs": true
          };
        obj.name = t.name;
        obj.id = t.code;
        obj.tcpHost = t.connect_address.split(":")[0];
        obj.tcpPort = t.connect_address.split(":")[1];
        var isContains = false;
        for(var i2=0;i2<config_nodes.length;i2++){
            if(config_nodes[i2].id== t.code){
                isContains = true;
                break;
            }
        }
        if(!isContains){
            config_nodes.push(obj);
        }
    }
}
msg.payload = config_nodes;
const type = global.get("config_flow_type");
msg.filename = global.get("userDir") + "\\config-nodes."+type;
return msg;