import supertest from 'supertest'

import createDatabase from '@/database'
import createApp from '@/app'

const db = createDatabase(process.env.DATABASE_URL as string, {
  readonly: true,
})

const app = createApp(db)

describe('GET', () => {
  it('should return all new movie screenings if no ids are provided', async () => {
    const { body } = await supertest(app).get('/screenings').expect(200)
    // return top 10 (for now)
    expect(body).toHaveLength(1)
  })

  it('should return movie screenings by a list of query params', async () => {
    const { body } = await supertest(app).get('/screenings?id=1,2').expect(200)

    expect(body).toHaveLength(2)

    //   assuming show_time (timestamp) as : '2025-01-30 19:30:00' format(YYYY-MM-DD HH:MM:SS)
    expect(body).toEqual([
      {
        id: 1,
        movieTitle: 'Interstellar',
        movieYear: 2014,
        showTime: '2025-01-30 19:30:00',
        totalTickets: 100,
        ticketsLeft: 20,
      },
      {
        id: 2,
        movieTitle: 'The Dark Knight',
        movieYear: 2008,
        showTime: '2025-01-23 20:30:00',
        totalTickets: 200,
        ticketsLeft: 17,
      },
    ])
  })
})
