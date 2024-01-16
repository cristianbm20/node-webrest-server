import express from 'express'
import path from 'node:path'

interface Options {
  port: number
  publicPath?: string
}

export class Server {
  private readonly app = express()
  private readonly port: number
  private readonly publicPath: string

  constructor (options: Options) {
    const { port, publicPath = 'public' } = options
    this.port = port
    this.publicPath = publicPath
  }

  async start (): Promise<void> {
    this.app.use(express.static(this.publicPath))

    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
      res.sendFile(indexPath)
    })

    const PORT = process.env.PORT ?? 3000

    this.app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`))
  }
}
