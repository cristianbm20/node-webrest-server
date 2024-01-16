import { Router } from 'express'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.get('/api/todo', (req, res) => {
      res.json([
        { id: 1, text: 'Learn javascript', createdAt: new Date() },
        { id: 2, text: 'Create new project', createdAt: null },
        { id: 3, text: 'Learn swift', createdAt: new Date() }
      ])
    })

    return router
  }
}
