//发送请求先必须先启动服务器（运行该js代码）

var http=require("http")
var url=require("url")
var querystring=require("querystring")//需要下包
// var fs=require("fs")

http.createServer(function(req,res){
    //post
    var reqBody='';
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量
    req.on('data',function (data) {
        reqBody += data;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end',function () {    //req完成后处理数据并返回
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.write('you have sent a '+req.method+' request\n');
        res.write('<p>Content-Type:'+req.headers['content-type']+'</p>'
            +'<p>Data:your name is '+querystring.parse(reqBody).user+'</p>'
            +'<p>Data:your password is  '+ querystring.parse(reqBody).pwd+'</p>'
            +'<p>Data:your sex is  '+ querystring.parse(reqBody).sex+'</p>');
        res.end();
    })

    //************************************解析get方法请求
    // obj = querystring.parse/* 以&和=为分隔符将字符串转成对象 */(url.parse(req.url)/* 将req对象中的url字符串转成对象 更好的区分path和query */.query);
    // res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});  //向响应头中写入响应码，内容类型，解码格式
    // res.end(JSON.stringify(obj)/* 参数为字符串类型 */);
}).listen(3000);    //监听3000端口