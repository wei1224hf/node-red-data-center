#Purpose to create a centralized memory based data center 
in node-red , connect to some devices , cycically read and write data from devices and store the data in node-red.

#Read device and point data from sqlite database 
The devices' config data like address and port, industral bus type , are saved in sqlite database. The data's point data like data type , length , data address are also saved.

#Create another flow automaticaly 
With node-red-flow-manager package, create a flow file called Data, into flow/ folder. This file's content is based on devices and device datas.