import http, { Server } from 'http'
import Express from 'express'
import JuejinPost from './juejin'

const app = new Express();
// app.use()
http.createServer(app).listen("8000", (err) => {
  if (err) {
    console.error(err.stack || err)
  }
  console.log('Server running at http://127.0.0.1:8000/')
})
app.get('/', (req, res) => {
  try {
    console.log(req.body)
    res.setHeader('Cache-Control', "max-age=60")
    res.setHeader('Set-Cookie', "name=1")
    res.send(req.body ? JSON.stringify(req.body) : 'Hello')
  } catch(err) {
    console.log('___________________________', err)
  }
})
app.get('/juejin', JuejinPost)