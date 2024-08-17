import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";
import { LoginInputModel, UserInputModel } from "../models/UserInputModel";
import { usersDBRepository } from "../repositories/usersDBRepository";

export const usersService = {

  async createUser(user: UserInputModel): Promise<string> {
    const objectId = new ObjectId();
    const newUser: UserDBViewModel = {
      login: user.login,
      email: user.email,
      createdAt: new Date().toISOString(),
      _id: objectId,
    }
    const blogMongoDbResult = await usersDBRepository.createUser(newUser);
    return blogMongoDbResult._id.toString()
  },

  async login(login: LoginInputModel): Promise<boolean> {
    const isLoginValid = await usersDBRepository.login(login);
    return isLoginValid
  },

  async deleteUser(id: string): Promise<boolean> {
    return usersDBRepository.deleteUser(id)
  },

}

