import type { Database } from '@/database'

export default (db: Database) => ({
  findAllScreenings: async () =>
    db.selectFrom('screenings').selectAll().execute(),

  findByIds: async (ids: number[]) =>
    db.selectFrom('screenings').selectAll().where('id', 'in', ids).execute(),

  addNewMovieScreening: async (
    movie_title: string,
    movie_year: number,
    show_time: string,
    total_tickets: number,
    tickets_left: number
  ) =>
    db
      .insertInto('screenings')
      .values({
        movieTitle: movie_title,
        movieYear: movie_year,
        showTime: show_time,
        totalTickets: total_tickets,
        ticketsLeft: tickets_left,
      })
      .execute(),
})
