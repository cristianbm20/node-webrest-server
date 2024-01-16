import { envs } from './config/envs'
import { AppRoutes } from './presentation/routes'
import { Server } from './presentation/server'

const main = async (): Promise<void> => {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })

  await server.start()
}

(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
  }
})().catch(error => console.error('Unexpected error: ', error))
