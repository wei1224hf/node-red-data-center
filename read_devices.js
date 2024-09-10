msg.topic = "select name,code,request,response,state,type,product_name,product_barcode,takt,time_run,connect_address,connect_type from device order by id";
global.set("datas",{});
global.set("devices",{});
return msg;