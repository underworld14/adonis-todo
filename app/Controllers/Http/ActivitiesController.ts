import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BadRequestException from 'App/Exceptions/BadRequestException'
import Activity from 'App/Models/Activity'

export default class ActivitiesController {
  private validate(body: Record<string, any>) {
    const requiredSchema = ['title']

    requiredSchema.forEach((property) => {
      if (!body[property]) {
        throw new BadRequestException(`${property} cannot be null`)
      }
    })
  }

  public async index({ response }: HttpContextContract) {
    const activities = await Activity.query()

    return response.json({
      status: 'Success',
      message: 'Success',
      data: activities,
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const activityId = request.param('id')
    const activity = await Activity.find(activityId)

    if (!activity) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      })
    }

    return response.json({
      status: 'Success',
      message: 'Success',
      data: activity,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['title', 'email'])
    this.validate(payload)
    const activity = await Activity.create(payload)

    return response.status(201).json({
      status: 'Success',
      message: 'Success',
      data: activity,
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const activityId = request.param('id')
    const payload = request.only(['title', 'email'])
    this.validate(payload)
    const activity = await Activity.find(activityId)

    if (!activity) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      })
    }

    await activity.merge(payload).save()

    return response.json({
      status: 'Success',
      message: 'Success',
      data: activity,
    })
  }

  public async destroy({ request, response }: HttpContextContract) {
    const activityId = request.param('id')
    const activity = await Activity.find(activityId)

    if (!activity) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      })
    }

    await activity.delete()

    return response.json({
      status: 'Success',
      message: 'Success',
      data: {},
    })
  }
}
