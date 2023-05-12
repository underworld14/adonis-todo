import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Activity from 'App/Models/Activity'

export default class ActivitiesController {
  private newAcitivityValidation = schema.create({
    title: schema.string(),
    email: schema.string({}, [rules.email()]),
  })

  private updateActivityValidation = schema.create({
    title: schema.string.optional(),
    email: schema.string.optional({}, [rules.email()]),
  })

  public async index({ response }: HttpContextContract) {
    const activities = await Activity.query()

    return response.json({
      status: 'success',
      message: 'success',
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
      status: 'success',
      message: 'success',
      data: activity,
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate({ schema: this.newAcitivityValidation })
    const activity = await Activity.create(payload)

    return response.status(201).json({
      status: 'success',
      message: 'success',
      data: activity,
    })
  }

  public async update({ request, response }: HttpContextContract) {
    const activityId = request.param('id')
    const payload = await request.validate({ schema: this.updateActivityValidation })
    const activity = await Activity.find(activityId)

    if (!activity) {
      return response.status(404).json({
        status: 'Not Found',
        message: `Activity with ID ${activityId} Not Found`,
      })
    }

    await activity.merge(payload).save()

    return response.json({
      status: 'success',
      message: 'success',
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
      status: 'success',
      message: 'success',
      data: {},
    })
  }
}
