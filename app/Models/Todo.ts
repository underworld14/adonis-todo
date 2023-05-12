import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class Todo extends BaseModel {
  @column({ isPrimary: true, serializeAs: 'id' })
  public todo_id: number

  @column()
  public activity_group_id: number

  @column()
  public title: string

  @column({
    serialize(value) {
      return !!value
    },
  })
  public is_active: boolean

  @column()
  public priority: string

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
