import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Todo from './Todo'

export default class Activity extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasMany(() => Todo, {
    foreignKey: 'activity_group_id',
  })
  public todos: HasMany<typeof Todo>

  @column()
  public title: string

  @column()
  public email: string

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
