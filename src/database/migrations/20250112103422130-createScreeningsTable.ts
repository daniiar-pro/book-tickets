import { Kysely, SqliteDatabase } from 'kysely'

export async function up(db: Kysely<SqliteDatabase>) {
    await db.schema
        .createTable('screenings')
        .ifNotExists()
        .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
        .addColumn('movie_title', 'text', (c) => c.notNull())
        .addColumn('movie_year', 'numeric', (c) => c.notNull())
        .addColumn('show_time', 'datetime', (c) => c.notNull())
        .addColumn('total_tickets', 'integer', (c) => c.notNull())
        .addColumn('tickets_left', 'integer')
        .execute()
    

}

export async function down() {}
