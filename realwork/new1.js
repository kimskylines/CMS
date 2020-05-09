var pgclient = require('./PG');// 引用上述文件
pgclient.getConnection();
 
// 调用上述四个函数即可
pgclient.save('userinfo',{'name': admin},cb);<span style="font-family: Arial, Helvetica, sans-serif;">.</span>