insert   into   device(name,code,connect_address,connect_type)values('OP40-泛在控制器','ext-controller','localhost:503','modbus-server');
insert   into   device(name,code,connect_address,connect_type)values('OP40-左scara','scara-left','localhost:504','modbus-server');
insert   into   device(name,code,connect_address,connect_type)values('OP40-右scara','scara-right','localhost:505','modbus-server');
insert   into   device(name,code,connect_address,connect_type)values('OP40-虚拟modbus','virtual-modbus','localhost:506','modbus-server');



insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','0','int','read','status','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','1','int','read','response','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','2','int','write','request','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','3','int','read','error','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','4','int','read','status2','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','5','int','read','Left_visionResult','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','6','int','read','Right_visionResult','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','7','int','write','tray_in_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','8','int','write','tray_out_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','9','int','write','tray_in_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('ext-controller','10','int','write','tray_out_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','1','int','write','idx_in_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','2','int','write','idx_out_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','3','int','write','material_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','4','int','write','trash_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','5','int','read','status_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','6','int','read','response_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','7','int','write','request_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-right','8','int','read','error_right','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','1','int','write','idx_in_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','2','int','write','idx_out_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','3','int','write','material_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','4','int','write','trash_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','5','int','read','status_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','6','int','read','response_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','7','int','write','request_left','');
insert  into  device_datas(device,address,type,mode,code,name)values('scara-left','8','int','read','error_left','');