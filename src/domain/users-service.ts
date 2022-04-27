import {RequestQueryType} from '../helpers';
import {usersRepository} from '../repositories/users-db-repository';

export const usersService = {
  async findUsers(reqParams: RequestQueryType) {
    return usersRepository.findUsers(reqParams);
  },
}