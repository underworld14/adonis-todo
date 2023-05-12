import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Activity from 'App/Models/Activity'
import Todo from 'App/Models/Todo'

export default class TodosController {
  private newTodoValidation = schema.create({
    activity_group_id: schema.number(),
    title: schema.string(),
    is_active: schema.boolean(),
    priority: schema.enum(['very-high', 'high', 'medium', 'low', 'very-low'] as const),
  })

  private updateTodoValidation = schema.create({
    activity_group_id: schema.number.optional(),
    title: schema.string.optional(),
    is_active: schema.boolean.optional(),
    priority: schema.enum.optional(['very-high', 'high', 'medium', 'low', 'very-low'] as const),
  })

  public async index({ request, response }: HttpContextContract) {
    const activityGroupId = request.input('activity_group_id')
    const todoQuery = Todo.query()

    if (activityGroupId) {
      todoQuery.andWhere('activity_group_id', activityGroupId)
    }

    const todos = await todoQuery

    return response.json({
      status: 'success',
      message: 'success',
      data: todos,
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const todoId = request.param('id')
    const todo = await Todo.find(todoId)

    if (!todo) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${todoId} Not Found`,
      })
    }

    return response.json({
      status: 'success',
      message: 'success',
      data: todo,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: this.newTodoValidation })
    await Activity.findOrFail(payload.activity_group_id)

    const todo = await Todo.create(payload)

    return response.status(201).json({
      status: 'success',
      message: 'success',
      data: todo,
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const todoId = request.param('id')
    const payload = await request.validate({ schema: this.updateTodoValidation })

    if (payload.activity_group_id) {
      await Activity.findOrFail(payload.activity_group_id)
    }

    const todo = await Todo.find(todoId)

    if (!todo) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${todoId} Not Found`,
      })
    }

    await todo.merge(payload).save()

    return response.json({
      status: 'success',
      message: 'success',
      data: todo,
    })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const todoId = request.param('id')
    const todo = await Todo.find(todoId)

    if (!todo) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${todoId} Not Found`,
      })
    }

    await todo.delete()

    return response.json({
      status: 'success',
      message: 'success',
      data: {},
    })
  }
}
