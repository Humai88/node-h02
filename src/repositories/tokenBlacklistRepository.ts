import {blacklistCollection} from "../db/mongo-db";

export const tokenBlacklistRepository = {
  async addToBlacklist(token: string): Promise<void> {
    await blacklistCollection.insertOne({ token, createdAt: new Date() });
  },

  async isBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await blacklistCollection.findOne({ token });
    return !!blacklistedToken;
  },

};