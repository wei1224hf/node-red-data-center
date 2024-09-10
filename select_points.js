const arr = msg.payload;
let obj = {};
for(let i2=0;i2<arr.length;i2++){
    obj[arr[i2].code] = arr[i2];
}
global.set("devices",obj);
for(let i=0;i<arr.length;i++){
    const code = arr[i].code;
    let msg2 = {
        topic : "select * from device_datas where device = '"+code+"' order by mode, id;",
        code: code,
        rate: 300,
        idx: i
    };
    if(i==arr.length-1){
        msg2.end = true;
    }
    else{
        msg2.end = false;
    }
    node.send(msg2);
}
