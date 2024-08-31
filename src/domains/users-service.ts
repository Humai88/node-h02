import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";
import { LoginInputModel, UserInputModel } from "../models/UserModel";
import { usersDBRepository } from "../repositories/usersDBRepository";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { nodemailerAdapter, emailManager } from "../adapters/nodemailerAdapter";

export const usersService = {

  async createUser(user: UserInputModel): Promise<string> {
    const objectId = new ObjectId();
    const passwordSalt = await bcrypt.genSalt(10)
    const passwordHash = await this.generateHash(user.password, passwordSalt)

    const newUser: UserDBViewModel = {
      login: user.login,
      email: user.email,
      createdAt: new Date().toISOString(),
      passwordHash,
      passwordSalt,
      _id: objectId,
    }
    const userMongoDbResult = await usersDBRepository.createUser(newUser);
    return userMongoDbResult._id.toString()
  },

  async registerUser(user: UserInputModel): Promise<UserDBViewModel | null> {
    const userExists = await usersDBRepository.doesExistByLoginOrEmail(user.login, user.email);
    if (userExists) return null;
    const objectId = new ObjectId();
    const passwordSalt = await bcrypt.genSalt(10)
    const passwordHash = await this.generateHash(user.password, passwordSalt)

    const newUser: UserDBViewModel = {
      login: user.login,
      email: user.email,
      createdAt: new Date().toISOString(),
      passwordHash,
      passwordSalt,
      _id: objectId,
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
          minutes: 30,
        }),
        isConfirmed: false
      }
    }
    const userMongoDbResult = await usersDBRepository.createUser(newUser);

    if (userMongoDbResult && userMongoDbResult.emailConfirmation) {
      try {
        await nodemailerAdapter.sendEmail(
          userMongoDbResult.email,
          userMongoDbResult.emailConfirmation.confirmationCode,
          emailManager.registrationEmail
        );
      } catch (e: unknown) {
        console.error('Send email error', e);
      }
    }

    return userMongoDbResult
  },

  async checkCredentials(login: LoginInputModel): Promise<UserDBViewModel | null> {
    const user = await usersDBRepository.findUserByLoginOrEmail(login.loginOrEmail);
    if (!user) {
      return null
    } else {
      const passwordHash = await this.generateHash(login.password, user.passwordSalt);
      if (user.passwordHash !== passwordHash) {
        return null
      }
      else {
        return user
      }
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    return usersDBRepository.deleteUser(id)
  },

  async generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

}

