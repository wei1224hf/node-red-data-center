const type = global.get("config_flow_type");
msg.filename = global.get("userDir") + "\\config-nodes."+type;
return msg;