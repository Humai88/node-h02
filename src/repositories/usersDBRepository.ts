import { usersCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";
import { add } from "date-fns";
import { deviceSessionsCollection } from "../db/mongo-db"
import { DeviceDBViewModel } from "../models/DBModel"
import { jwtService } from '../application/jwtService';

export const usersDBRepository = {

  async createUser(user: UserDBViewModel): Promise<UserDBViewModel> {
    const newUser = await usersCollection.insertOne(user)
    const insertedUser = await usersCollection.findOne({ _id: newUser.insertedId });
    if (!insertedUser) {
      throw new Error('Failed to retrieve inserted user');
    }
    return insertedUser
  },

  async findUserByLoginOrEmail(loginOrEmail: string): Promise<UserDBViewModel | null> {
    const user = await usersCollection.findOne({ 
      $or: [
        { login: { $regex: new RegExp(`^${loginOrEmail}$`, 'i') } },
        { email: { $regex: new RegExp(`^${loginOrEmail}$`, 'i') } }
      ]
    })
    return  user
  },

  async doesExistByLoginOrEmail(login: string, email: string): Promise<UserDBViewModel | null> {
    const user = await usersCollection.findOne({ 
      $or: [
        { login: { $regex: new RegExp(`^${login}$`, 'i') } },
        { email: { $regex: new RegExp(`^${email}$`, 'i') } }
      ]
    })
    return  user
  },

  async findUserByConfirmationCode(code: string): Promise<UserDBViewModel | null> {
    const user = await usersCollection.findOne({ 'emailConfirmation.confirmationCode': code })
    return user
  },

  async findUserById(id: string): Promise<UserDBViewModel | null> {
    const objectUserId = new ObjectId(id);
    const user = await usersCollection.findOne({ _id: objectUserId })
    return user
  },

  async updateEmailConfirmation(email: string, newConfirmationCode: string): Promise<boolean> {
    const result = await usersCollection.updateOne(
      { email: email },
      {
        $set: {
          'emailConfirmation.confirmationCode': newConfirmationCode,
          'emailConfirmation.expirationDate': add(new Date(), { hours: 1, minutes: 30 }),
        }
      }
    );

    return result.modifiedCount === 1;
  },

  async confirmUser(id: string): Promise<UserDBViewModel | null> {
    const objectUserId = new ObjectId(id);
    const result = await usersCollection.updateOne(
      { _id: objectUserId },    
      { $set: { 'emailConfirmation.isConfirmed': true } }
    )
    if (result.modifiedCount === 1) {
      const confirmedUser = await usersCollection.findOne({ _id: objectUserId });
      return confirmedUser
    }
    return null
  },

  async updateRefreshToken(refreshToken: string): Promise<boolean> {
    const decoded = await jwtService.verifyRefreshToken(refreshToken);
    const result = await deviceSessionsCollection.updateOne(
      { 
        iat: decoded!.iat,
        deviceId: decoded!.deviceId
      },
      { $set: { lastActiveDate:  new Date(decoded!.iat * 1000).toISOString() } }
    )
    return result.modifiedCount === 1
  },
  
  async deleteUser(id: string): Promise<boolean> {
    const objectBlogId = new ObjectId(id);
    const result = await usersCollection.deleteOne({ _id: objectBlogId });
    return result.deletedCount === 1
  },

  
  async saveDeviceSession(session: DeviceDBViewModel ): Promise<boolean> {
    console.log('Attempting to save device session:', session);
    const result = await deviceSessionsCollection.insertOne(session)
    return result.acknowledged === true;
  },
  
  async findSessionByDeviceId(userId: string, deviceId: string): Promise<DeviceDBViewModel | null> {
    const session = await deviceSessionsCollection.findOne({ 
      userId: userId,
      deviceId: deviceId
    });
    return session;
  },

}

