import { ObjectId } from "mongodb";
import { UserDBViewModel } from "../models/DBModel";
import { LoginInputModel, UserInputModel } from "../models/UserModel";
import { usersDBRepository } from "../repositories/usersDBRepository";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { add } from "date-fns";
import { nodemailerAdapter, emailManager } from "../adapters/nodemailerAdapter";

export const authService = {

  async registerUser(user: UserInputModel): Promise<UserDBViewModel | null> {
    const newUser = await this.createUserObject(user);

    try {
      const createdUser = await usersDBRepository.createUser(newUser);

      if (!createdUser) {
        throw new Error('Failed to create user in database');
      }

      await this.sendConfirmationEmail(createdUser);
      return createdUser;
    } catch (error) {
      console.error('User registration error:', error);
      if (newUser._id) {
        await usersDBRepository.deleteUser(newUser._id.toString());
      }
      return null;
    }
  },

  async createUserObject(user: UserInputModel): Promise<UserDBViewModel> {
    const objectId = new ObjectId();
    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await this.generateHash(user.password, passwordSalt);

    return {
      login: user.login,
      email: user.email,
      createdAt: new Date().toISOString(),
      passwordHash,
      passwordSalt,
      _id: objectId,
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), { hours: 1, minutes: 30 }),
        isConfirmed: false
      }
    };
  },

  async sendConfirmationEmail(user: UserDBViewModel): Promise<void> {
    if (!user.emailConfirmation) {
      throw new Error('User email confirmation data is missing');
    }

    await nodemailerAdapter.sendEmail(
      user.email,
      user.emailConfirmation.confirmationCode,
      emailManager.registrationEmail
    );
  },

  async confirmRegistration(code: string): Promise<boolean> {
    const user = await usersDBRepository.findUserByConfirmationCode(code);
    if (!user) {
      return false
    }
    if (user.emailConfirmation!.isConfirmed) {
      return false
    }
    if (user.emailConfirmation!.expirationDate < new Date()) {
      return false
    }
    const confirmedUser = await usersDBRepository.confirmUser(user._id.toString());
    return confirmedUser !== null
  },

  async checkCredentials(login: LoginInputModel): Promise<UserDBViewModel | null> {
    const user = await usersDBRepository.findUserByLoginOrEmail(login.loginOrEmail);
    if (!user) {
      return null
    }
    if (!user.emailConfirmation!.isConfirmed) {
      return null
    }
    const passwordHash = await this.generateHash(login.password, user.passwordSalt);
    if (user.passwordHash !== passwordHash) {
      return null
    }
      return user
  },

  async resendRegistrationEmail(email: string): Promise<boolean> {
    const user = await usersDBRepository.findUserByLoginOrEmail(email);
    if (!user) {
      return false
    }
    if (user.emailConfirmation!.isConfirmed) {
      return false
    }
    if (user.emailConfirmation!.expirationDate < new Date()) {
      return false
    }
    try {
      await nodemailerAdapter.sendEmail(
        user.email,
        user.emailConfirmation!.confirmationCode,
        emailManager.registrationEmail
      );
      return true
    } catch (error) {
      console.error('Resend email error:', error);
      return false
    } 
  },

  async generateHash(password: string, salt: string) {
    const hash = await bcrypt.hash(password, salt);
    return hash
  }

}
