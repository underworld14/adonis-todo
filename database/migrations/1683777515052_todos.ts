import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'todos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('todo_id')
      table.integer('activity_group_id').unsigned()
      table.string('title').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.string('priority').notNullable()

      table.foreign('activity_group_id').references('activities.activity_id').onDelete('CASCADE')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
