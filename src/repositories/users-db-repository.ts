import {postsCollection, usersCollection} from './db';
import {RequestQueryType} from '../helpers';

export const usersRepository = {
  async findUsers(reqParams: RequestQueryType) {
    const {
      page,
      pageSize,
    } = reqParams

    const totalCount = (await usersCollection.find().toArray()).length
    const pagesCount = Math.ceil(totalCount / pageSize)
    const users = await usersCollection.find().project({_id: false}).skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray()

    return ({
      pagesCount,
      page,
      pageSize,
      totalCount,
      items: users
    })
  },
}
