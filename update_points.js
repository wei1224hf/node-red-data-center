const arr = msg.payload;
let obj = {};
let datas = global.get("datas");
for(let i=0;i<arr.length;i++){
    obj[arr[i].code] = arr[i];
    datas[arr[i].code] = obj[arr[i].code].value;
}
const idx = msg.idx;
const code = msg.code;
var devices = global.get("devices");
devices[code].monitor = obj;

return msg;