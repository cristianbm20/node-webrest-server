import http from 'http'
import fs from 'node:fs'

const server = http.createServer((req, res) => {
  const URL = req.url ?? ''
  console.log(URL)

  // res.writeHead(200, { 'Content-Type': 'text/html' })
  // res.write(`<h1>URL: ${req.url ?? ''}</h1>`)
  // res.end()

  // const data = { name: 'John Doe', age: 30, city: 'New York' }
  // res.writeHead(200, { 'Content-Type': 'application/json' })
  // res.end(JSON.stringify(data))

  if (URL === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')

    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlFile)
    return
  }

  if (URL.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' })
  } else if (URL.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' })
  }

  const responseContent = fs.readFileSync(`./public${URL ?? 'default'}`, 'utf-8')
  res.end(responseContent)
})

const PORT = process.env.PORT ?? 8080

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
