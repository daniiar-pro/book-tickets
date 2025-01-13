import { jsonRoute } from '@/utils/middleware'
import { Router } from 'express'
import { Request, Response } from 'express'
import type { Database } from '@/database'
import buildRepository from './repository'

export default (db: Database) => {
  const screenings = buildRepository(db)

  const router = Router()

  router.get(
    '/',
    jsonRoute(async (req: Request, res: Response) => {
    //   const movieScreenings = await screenings.findAllScreenings()
    //   res.status(200)
    //   res.json(movieScreenings)
    //   return
        if (typeof req.query.id !== 'string') {
          const moviesScreenings = await screenings.findAllScreenings()
          res.status(200)
          return res.json(moviesScreenings)
        }

        const ids = req.query.id!.split(',').map(Number)
        const movieScreenings = await screenings.findByIds(ids)

        res.status(200)
        res.json(movieScreenings)
    })
  )

  router.post(
    '/',
    jsonRoute(async (req: Request, res: Response) => {
      const {
        movie_title,
        movie_year,
        show_time,
        total_tickets,
        tickets_left,
      } = req.body

      const addMovie = screenings.addNewMovieScreening(
        movie_title,
        movie_year,
        show_time,
        total_tickets,
        tickets_left
      )

      res.status(200)
      res.json(addMovie)
    })
  )
  return router
}
