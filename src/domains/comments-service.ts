
import { usersDBRepository } from "../repositories/usersDBRepository";
import { CommentInputModel } from "../models/CommentModel";
import { commentsDBRepository } from "../repositories/commentsDBRepository";

export const commentsService = {


  async updateComment(commentId: string, comment: CommentInputModel): Promise<boolean> {
    return commentsDBRepository.updateComment(commentId, comment)
  },

  async deleteComment(id: string): Promise<boolean> {
    return usersDBRepository.deleteUser(id)
  },


}

