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
        for (let key2 in monitor) {

            const point = monitor[key2];
            if (point.mode == 'read') {
                idx++;
                if (idx == readLength) {
                    strs.funStr += "setTimeout(function(){ node.send({payload : {end:true,dev:'" + device.code + "', 'fc':3, 'unitid': 1, 'address':  " + point.address + " , 'quantity': 1 }}); \n"
                }
                else {
                    strs.funStr += "setTimeout(function(){ node.send({payload : {end:false,dev:'" + device.code + "', 'fc': 3, 'unitid': 1, 'address':  " + point.address + " , 'quantity': 1 }}); \n"
                }
                strs.funStr2 += "},80); \n"

                strs.funReceiveStr = "" +
                    "let devices = global.get('devices'); \n" +
                    "let device = devices['" + device.code + "']; \n" +
                    "let monitor = device['monitor']; \n" +
                    "let datas = global.get('datas'); \n" +
                    "for(let key in monitor){ \n" +
                    "    let point = monitor[key]; \n" +
                    "    if( parseInt( point.address) == msg.modbusRequest.address){ \n" +
                    "        point.value = msg.payload[0]; \n" +
                    "        for(let key2 in datas){ \n" +
                    "            if(key2 == key){ \n" +
                    "                datas[key2] = point.value; \n" +
                    "                break; \n" +
                    "            } \n" +
                    "        } \n" +
                    "        break; \n" +
                    "    } \n" +
                    "} \n";
            }
            else if (point.mode == 'write') {
                idx2++;
                if (idx2 == writeLength) {
                    strs.funStrW += "setTimeout(function(){const datas = global.get('datas');let devices = global.get('devices');const val = datas['" + point.code + "']; devices['" + device.code + "'].monitor['" + point.code + "'].value = val; node.send({payload : {value:val,end:true,dev:'" + device.code + "', 'fc':6, 'unitid': 1, 'address':  " + point.address + " , 'quantity': 1 }}); \n"
                }
                else {
                    strs.funStrW += "setTimeout(function(){const datas = global.get('datas');const val = datas['" + point.code + "']; let devices = global.get('devices'); devices['" + device.code + "'].monitor['" + point.code + "'].value = val; node.send({payload : {value:val,end:false,dev:'" + device.code + "', 'fc': 6, 'unitid': 1, 'address':  " + point.address + " , 'quantity': 1 }}); \n"
                }
                strs.funStrW2 += "},80); \n"
            }
        }
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