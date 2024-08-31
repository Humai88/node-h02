import { usersCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";

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

  async checkIfLoginIsUnique(login: string): Promise<boolean> {
    const existingUser = await usersCollection.findOne({ login: login });
    return !existingUser;
  },

  async checkIfEmailIsUnique(email: string): Promise<boolean> {
    const existingUser = await usersCollection.findOne({ email: email });
    return !existingUser;
  },

  async deleteUser(id: string): Promise<boolean> {
    const objectBlogId = new ObjectId(id);
    const result = await usersCollection.deleteOne({ _id: objectBlogId });
    return result.deletedCount === 1
  },

}

