import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {

    const userWithGames = await this.repository.findOne({
      where: {id: user_id},
      relations: ['games']
    })

    if (!userWithGames) {
      throw new Error("user does not exists!")
    }

    return userWithGames;
    // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query('SELECT * FROM users ORDER BY first_name ASC'); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {


    const query = `
    SELECT
    email,
    first_name,
    last_name
    FROM
    users
    WHERE
    LOWER(first_name) = LOWER($1)
    AND
    LOWER(last_name) = LOWER($2)
    `
    
    return this.repository.query(query, [first_name, last_name]); // Complete usando raw query
  }
}
