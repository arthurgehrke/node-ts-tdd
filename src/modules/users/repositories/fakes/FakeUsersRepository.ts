/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/ban-types */

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async findAll(): Promise<Array<User>> {
		const findUsers = this.users.map(users => users);

		return findUsers;
	}

	public async findById(id: number): Promise<User | undefined> {
		const findUser = this.users.find(user => user.id === id);

		return findUser;
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		const user = this.users.find(user => user.email === email);

		return user;
	}

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { id: '54' }, userData);

		this.users.push(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

		this.users[findIndex] = user;

		return user;
	}
}

export default UsersRepository;
