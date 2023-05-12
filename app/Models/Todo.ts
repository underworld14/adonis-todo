import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Activity from './Activity'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @belongsTo(() => Activity, {
    foreignKey: 'activity_group_id',
  })
  public activity_group: BelongsTo<typeof Activity>

  @column()
  public activity_group_id: number

  @column()
  public title: string

  @column()
  public is_active: boolean

  @column()
  public priority: 'very-high' | 'high' | 'medium' | 'low' | 'very-low'

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime
}
