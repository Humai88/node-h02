import {deviceSessionsCollection} from '../db/mongo-db'
import {DeviceViewModel} from '../models/DeviceModel'
import {DeviceDBViewModel} from '../models/DBModel'


export const securityDevicesQueryRepository = {

  async getSessions(): Promise<DeviceViewModel[]> {
    const sessions = await deviceSessionsCollection.find({}).toArray()
    return sessions.map(session => this.mapCommentResult(session))
  },

  mapCommentResult(session: DeviceDBViewModel): DeviceViewModel {
    const sessionForOutput: DeviceViewModel = {
      deviceId: session.deviceId,
      title: session.title,
      ip: session.ip,
      lastActiveDate: session.lastActiveDate.toISOString(),
    }
    return sessionForOutput
  },

}

