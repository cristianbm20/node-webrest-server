import express, { Router } from 'express'
import path from 'node:path'

interface Options {
  port: number
  routes: Router
  PublicPath?: string
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor (options: Options) {
    const { port, routes, PublicPath = 'public' } = options
    this.port = port
    this.publicPath = PublicPath
    this.routes = routes
  }

  async start (): Promise<void> {
    // Middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

    // Public folder
    this.app.use(express.static(this.publicPath))

    // Routes
    this.app.use(this.routes)

    // SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })

    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`))
  }
}
