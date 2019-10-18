
import request from 'superagent'
import http from 'http'

module.exports = (req, res) => {
  const params = {
    variables: {
      first: 20,
      after: "",
      order: "POPULAR"
    },
    extensions: {
      query: {
        id: "21207e9ddb1de777adeaca7a2fb38030"
      }}
    }
    // 方法1
    function method1() {
      const sendData = JSON.stringify(params);
      const options={
        host:"web-api.juejin.im",
        path:"/query",
        method:'POST',
        headers: {
          'Content-Type': 'application/json', 
          'Content-Length': Buffer.byteLength(sendData),
          "X-Agent": "Juejin/Web"
        }
       }
      let sendmsg = '';
      const re = http.request(options, function(req) {
        req.on("data", function(chunk) {
            console.log('chunk+++++++++++++++++++', chunk)
             sendmsg += chunk;            
        });        
        req.on("end", function() {
          console.log('list', sendmsg);
          const list = JSON.parse(sendmsg);
          const edges = list.data.articleFeed.items.edges
          res.send(`<!doctype html>
            <html>
              <body>
                ${edges.map(item => `<div><a href=${item.node.originalUrl}>${item.node.title}</a></div>`).join('')}
              </body>
            <html>`);
        });
      });
      re.write(sendData);
      re.end();
    }
    // method1()
    // return;

    // 方法2
  Post({ params })
  .then((result) => {
    console.log('res------------------------------', res)
    const edges = result.data.articleFeed.items.edges

    res.send(`<!doctype html>
    <html>
      <body>
        ${edges.map(item => `<div><a href=${item.node.originalUrl}>${item.node.title}</a></div>`).join('')}
      </body>
    <html>`);
  })
}
function Post({
  url = 'https://web-api.juejin.im/query',
  params,
  header = {
    "X-Agent": "Juejin/Web"
  }
}) {
    return new Promise((resolve) => {
      request('post', url)
          .send(params)
          .set(header)
          .end((err, res) => {
            if (err) {
              return err
            }
            console.log(111)
            resolve(JSON.parse(res.text))
          })
    })
}
