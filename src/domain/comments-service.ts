import {commentsRepository} from '../repositories/comments-db-repository';

export const commentsService = {
  async findComment(commentId: number) {
    return commentsRepository.findComment(commentId);
  },
}