import { Router } from 'express'
import { Request, Response } from 'express'
import type { Database } from '@/database'
import { jsonRoute } from '@/utils/middleware'
import buildRepository from './repository'

// Implement routes

export default (db: Database) => {
  const messages = buildRepository(db)
  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req: Request, res: Response) => {
      if (typeof req.query.id !== 'string') {
        const movies = await messages.findAll()
        res.status(200)
        res.json(movies)
        return
      }

      const ids = req.query.id!.split(',').map(Number)
      const movies = await messages.findByIds(ids)

      res.status(200)
      res.json(movies)
    })
  )

  
  return router
}
