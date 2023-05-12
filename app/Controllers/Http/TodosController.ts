import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Todo from 'App/Models/Todo'

export default class TodosController {
  private validate(body: Record<string, any>) {
    const requiredSchema = ['title', 'activity_group_id', 'is_active']

    requiredSchema.forEach((property) => {
      if (!body[property]) {
        throw new BadRequestException(`${property} cannot be null`)
      }
    })
  }

  public async index({ request, response }: HttpContextContract) {
    const activityGroupId = request.input('activity_group_id')
    const todoQuery = Todo.query()

    if (activityGroupId) {
      todoQuery.andWhere('activity_group_id', activityGroupId)
    }

    const todos = await todoQuery

    return response.json({
      status: 'Success',
      message: 'Success',
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
      status: 'Success',
      message: 'Success',
      data: todo,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['title', 'activity_group_id', 'is_active', 'priority'])
    this.validate(payload)

    if (!payload.priority) {
      payload.priority = 'low'
    }

    const todo = await Todo.create(payload)

    return response.status(201).json({
      status: 'Success',
      message: 'Success',
      data: todo,
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const todoId = request.param('id')
    const payload = request.only(['title', 'activity_group_id', 'is_active', 'priority'])

    const todo = await Todo.find(todoId)

    if (!todo) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Todo with ID ${todoId} Not Found`,
      })
    }

    await todo.merge(payload).save()

    return response.json({
      status: 'Success',
      message: 'Success',
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
      status: 'Success',
      message: 'Success',
      data: {},
    })
  }
}
