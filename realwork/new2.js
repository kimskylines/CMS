var pgOpt = require('pg');
/*
 * 使用连接池
 * */
function connectPgWithPool() {
    var pgConfig = {
        user: 'tlt',
        database: 'textcms',
        password: '123456',
        host: '127.0.0.1',
        port: '8027',
        poolSize: 5,
        poolIdleTimeout: 30000,
        reapIntervalMillis: 10000
    };
    var pgPool = new pgOpt.Pool(pgConfig);
    // var pgPool = new pgOpt.pools.getOrCreate(pgConfig);// 低版本的pg模块需要这样来创建连接池
    
    pgPool.connect(function (isErr, client, done) {
        if (isErr) {
            console.log('connect query:' + isErr.message);
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            done();
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
        })
    });
}
/** 不使用连接池* */
function connectPgWithoutPool() {
    var conStr = "postgres://postgres:123456@192.168.1.234:5432/postgres";
    var client = new pgOpt.Client(conStr);
    client.connect(function (isErr) {
        if (isErr) {
            console.log('connect error:' + isErr.message);
            client.end();
            return;
        }
        client.query('select now();', [], function (isErr, rst) {
            if (isErr) {
                console.log('query error:' + isErr.message);
            } else {
                console.log('query success, data is: ' + rst.rows[0].now);
            }
            client.end();
        })
    })
}
connectPgWithPool();


/*
var pg = require('pg');

// 数据库配置
var config = {
    user:"tlt",
    database:"textcms",
    password:"123456",
    port:8027,

    // 扩展属性
    max:20, // 连接池最大连接数
    idleTimeoutMillis:3000, // 连接最大空闲时间 3s
}

var pool = new pg.Pool(config);

// 查询
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('数据库连接出错', err);
  }
  // 简单输出个 Hello World
  client.query('SELECT $1::varchar AS OUT', ["Hello World"], function(err, result) {
    done();// 释放连接（将其返回给连接池）
    if(err) {
      return console.error('查询出错', err);
    }
    console.log(result.rows[0].out); //output: Hello World
  });
});*/