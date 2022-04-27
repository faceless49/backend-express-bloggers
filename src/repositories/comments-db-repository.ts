import {commentsCollection} from './db';

export const commentsRepository = {
  async findComment(commentId: number) {
    const comment = await commentsCollection.find({id: commentId})
    if (comment) {
      return comment
    } else {
      return false
    }
  },
}
