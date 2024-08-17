import { usersCollection } from "../db/mongo-db"
import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";
import { LoginInputModel } from "../models/UserInputModel";

export const usersDBRepository = {

  async createUser(user: UserDBViewModel): Promise<UserDBViewModel> {
    const newUser = await usersCollection.insertOne(user)
    const insertedUser = await usersCollection.findOne({ _id: newUser.insertedId });

    if (!insertedUser) {
      throw new Error('Failed to retrieve inserted blog');
    }
    return insertedUser
  },

  async login(login: LoginInputModel): Promise<boolean> {
    return true
  },

  async deleteUser(id: string): Promise<boolean> {
    const objectBlogId = new ObjectId(id);
    const result = await usersCollection.deleteOne({ _id: objectBlogId });
    return result.deletedCount === 1
  },

}

