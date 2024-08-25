import { UserDBViewModel } from "../models/DBModel"
import jwt from "jsonwebtoken"
import { SETTINGS } from "../settings";
import { ObjectId } from "mongodb";

export const jwtService = {
  async generateToken(user: UserDBViewModel): Promise<any> {
    const token = jwt.sign({ userId: user._id}, SETTINGS.JWT_SECRET, { expiresIn: '1h' });
    return {
      accessToken: token
    }
  },

  async getUserIdByToken(token: string): Promise<any> {
    try {
      const result: any = jwt.verify(token, SETTINGS.JWT_SECRET);
      return  new ObjectId(result.userId)   
    } catch (error) {
      return null
    }
  }
}