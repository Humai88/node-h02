import { UserDBViewModel } from "../models/DBModel"
import {UserViewModel} from "../models/UserModel"
import jwt from "jsonwebtoken"
import { SETTINGS } from "../settings";
import { ObjectId } from "mongodb";
import { usersDBRepository } from '../repositories/usersDBRepository';

export const jwtService = {
  async generateToken(user: UserDBViewModel): Promise<any> {
    const token = jwt.sign({ userId: user._id }, SETTINGS.JWT_SECRET, { expiresIn: '10s' });
    return {
      accessToken: token
    }
  },

  async generateRefreshToken(user: UserDBViewModel): Promise<string> {
    const refreshToken = jwt.sign({ userId: user._id }, SETTINGS.REFRESH_TOKEN_SECRET, { expiresIn: '20s' });
    return refreshToken
  },

  async getUserIdByRefreshToken(token: string): Promise<ObjectId | null> {
    try {
      const result: any = jwt.verify(token, SETTINGS.REFRESH_TOKEN_SECRET);
      return new ObjectId(result.userId)
    } catch (error) {
      return null
    }
  },

  async getUserIdByToken(token: string): Promise<any> {
    try {
      const result: any = jwt.verify(token, SETTINGS.JWT_SECRET);
      return new ObjectId(result.userId)
    } catch (error) {
      return null
    }
  }
}