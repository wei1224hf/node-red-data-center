var json = [
    {
        "id": "Datas",
        "type": "tab",
        "label": "Datas",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "data_center_start",
        "type": "function",
        "z": "Datas",
        "name": "start",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 110,
        "y": 60,
        "wires": [
            []
        ]
    },
    {
        "id": "Datas_inject",
        "type": "inject",
        "z": "Datas",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "3",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 160,
        "wires": [
            [
                "data_center_start"
            ]
        ]
    },
    {
        "id": "Datas_inject",
        "type": "inject",
        "z": "Datas",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": "3",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 100,
        "y": 160,
        "wires": [
            [
            ]
        ]
    }
];

const devices = global.get("devices");
let count = 0;
for (let key in devices) {
    count++;
    const device = devices[key];
    const monitor = device['monitor'];
    if (device.connect_type == 'modbus-server') {
        const modbus_flex_getter = {
            "id": "modbus-flex-getter__" + device.code,
            "type": "modbus-flex-getter",
            "z": "Datas",
            "name": "getter_" + device.code,
            "showStatusActivities": false,
            "showErrors": false,
            "showWarnings": true,
            "logIOActivities": false,
            "server": device.code,
            "useIOFile": false,
            "ioFile": "",
            "useIOForPayload": false,
            "emptyMsgOnFail": false,
            "keepMsgProperties": false,
            "delayOnStart": false,
            "startDelayTime": "",
            "x": 450,
            "y": count * 220 - 50,
            "wires": [
                [
                    "fun_receive__" + device.code,
                ],
                []
            ]
        };

        const modbus_flex_write = {
            "id": "modbus-flex-write__" + device.code,
            "type": "modbus-flex-write",
            "z": "Datas",
            "name": "write_" + device.code,
            "showStatusActivities": false,
            "showErrors": false,
            "showWarnings": true,
            "server": device.code,
            "emptyMsgOnFail": false,
            "keepMsgProperties": false,
            "delayOnStart": false,
            "startDelayTime": "",
            "x": 450,
            "y": count * 220 - 150,
            "wires": [
                [],
                []
            ]
        };



        let strs = {
            funStr: "",
            funStr2: "",
            funReceiveStr: "",

            funStrW: "",
            funStrW2: "",
        }

        let objSwitchRead = {
            "id": "switch__" + device.code,
            "type": "switch",
            "z": "Datas",
            "name": "",
            "property": "payload.end",
            "propertyType": "msg",
            "rules": [
                {
                    "t": "true"
                }
            ],
            "checkall": "true",
            "repair": false,
            "outputs": 1,
            "x": 450,
            "y": count * 220,
            "wires": [
                [
                    device.code + "__read",
                ]
            ]
        };

        let objSwitchWrite = {
            "id": "switch_write__" + device.code,
            "type": "switch",
            "z": "Datas",
            "name": "",
            "property": "payload.end",
            "propertyType": "msg",
            "rules": [
                {
                    "t": "true"
                }
            ],
            "checkall": "true",
            "repair": false,
            "outputs": 1,
            "x": 450,
            "y": count * 220 - 100,
            "wires": [
                [
                    device.code + "__write",
                ]
            ]
        };

        let readLength = 0;
        let writeLength = 0;
        for (let key2 in monitor) {
            const point = monitor[key2];
            if (point.mode == 'read') {
                readLength++;
            }
            else if (point.mode == 'write') {
                writeLength++;
            }
        }
        let idx = 0;
        let idx2 = 0;
        let prevReadPoint = {code:0,address:-1,mode:'read',quantity:0};
        let prevWritePoint = {code:0,address:-1,mode:'write',quantity:0,names:[]};
        var modbusReadObjs = [];
        let modbusWriteObjs = [];
        for (let key2 in monitor) {
            let point = monitor[key2];
            point.address = parseInt(point.address);
            point.quantity = 1;
            if (point.mode == 'read') {
                if(point.address == prevReadPoint.address + prevReadPoint.quantity){
                    prevReadPoint.quantity ++;
                }
                else{
                    modbusReadObjs.push(point);
                    prevReadPoint = point;
                }
            }
            else if (point.mode == 'write') {
                
                if(point.address == prevWritePoint.address + prevWritePoint.quantity){
                    prevWritePoint.quantity ++;
                    prevWritePoint.names.push(point.code);
                }
                else{                    
                    point.names = [];
                    point.names.push(point.code);
                    prevWritePoint = point;
                    modbusWriteObjs.push(point);
                }
            }
            
        }

        for(let i=0;i<modbusReadObjs.length;i++){
            let point = modbusReadObjs[i];
            let isEnd = "false";
            if (i == modbusReadObjs.length-1) {
                isEnd = "true";
            }

            strs.funStr += "setTimeout(function(){ node.send({payload : {end:"+isEnd+",dev:'" + device.code + "', 'fc':3, 'unitid': 1, 'address':  " + point.address + " , 'quantity': " + point.quantity + " }}); \n"
            strs.funStr2 += "},80); \n"
        }
        console.debug(modbusReadObjs);
        for(let i=0;i<modbusWriteObjs.length;i++){
            let point = modbusWriteObjs[i];
            let isEnd = "false";
            if (i == modbusWriteObjs.length-1) {
                isEnd = "true";
            }
            const arr = point.names;
            let valStr = "[";
            let valStr2 = "";
            for(let i2=0;i2<arr.length;i2++){
                valStr += "datas['" + arr[i2] + "'],";
                valStr2 += "devices['" + device.code + "'].monitor['" + arr[i2] + "'].value = datas['" + arr[i2] + "'];\n"
            }
            valStr = valStr.substring(0,valStr.length-1);
            valStr += "]";
            strs.funStrW += ""+
            "setTimeout(function(){"
            +"const datas = global.get('datas');"
            +"const val = "+valStr+"; "
            +"let devices = global.get('devices'); "
            +valStr2
            +" node.send({payload : {value:val,end:"+isEnd+",dev:'" + device.code + "', 'fc': 16, 'unitid': 1, 'address':  " + point.address + " , 'quantity': " + point.quantity + " }}); \n"
        
            strs.funStrW2 += "},80); \n"

        }        

        strs.funReceiveStr = "" +
        "let devices = global.get('devices'); \n" +
        "let device = devices['" + device.code + "']; \n" +
        "let monitor = device['monitor']; \n" +
        "let datas = global.get('datas'); \n" +
        "	let vals = msg.payload;							\n"+
        "	for(let i=0;i<vals.length;i++){							\n"+
        "		let address = msg.modbusRequest.address + i;						\n"+
        "		for(let key in monitor){ 						\n"+
        "			let point = monitor[key]; 					\n"+
        "			if( parseInt( point.address) == address){ 					\n"+
        "				point.value = msg.payload[i]; 				\n"+
        "				for(let key2 in datas){ 				\n"+
        "					if(key2 == key){ 			\n"+
        "						datas[key2] = point.value; 		\n"+
        "						break; 		\n"+
        "					} 			\n"+
        "				} 				\n"+
        "				break; 				\n"+
        "			} 					\n"+
        "		} 						\n"+
        "	}							\n";
        

        let ojbRead = {
            "id": device.code + "__read",
            "type": "function",
            "z": "Datas",
            "name": "read_" + device.code,
            "func": strs.funStr + strs.funStr2,
            "outputs": 1,
            "timeout": 0,
            "noerr": 0,
            "initialize": "",
            "finalize": "",
            "libs": [],
            "x": 250,
            "y": count * 220,
            "wires": [
                [
                    "modbus-flex-getter__" + device.code,
                    "switch__" + device.code,
                ]
            ]
        };

        let ojbWrite = {
            "id": device.code + "__write",
            "type": "function",
            "z": "Datas",
            "name": "write_" + device.code,
            "func": strs.funStrW + strs.funStrW2,
            "outputs": 1,
            "timeout": 0,
            "noerr": 0,
            "initialize": "",
            "finalize": "",
            "libs": [],
            "x": 250,
            "y": count * 220 - 100,
            "wires": [
                [
                    "modbus-flex-write__" + device.code,
                    "switch_write__" + device.code,
                ]
            ]
        };

        let objReceive = {
            "id": "fun_receive__" + device.code,
            "type": "function",
            "z": "Datas",
            "name": "receive_" + device.code,
            "func": strs.funReceiveStr,
            "outputs": 1,
            "timeout": 0,
            "noerr": 0,
            "initialize": "",
            "finalize": "",
            "libs": [],
            "x": 830,
            "y": count * 220,
            "wires": [
                []
            ]
        };
        json[1].wires[0].push(ojbRead.id);
        json[1].wires[0].push(ojbWrite.id);
        json.push(modbus_flex_getter);
        json.push(ojbRead);
        json.push(objSwitchRead);
        json.push(objReceive);
        json.push(modbus_flex_write);
        json.push(objSwitchWrite);
        json.push(ojbWrite);

    }
}

msg.payload = json;
const type = global.get("config_flow_type");
msg.filename = global.get("userDir") + "\\flows\\Datas." + type;
return msg;