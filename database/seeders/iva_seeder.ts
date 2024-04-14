import Iva from '#models/iva'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Iva.create({
      value: 16,
      active: true,
    })
  }
}
