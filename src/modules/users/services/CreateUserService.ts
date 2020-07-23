import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
	email: string;
	password: string;
}

@injectable()
class CreateUserService {
	constructor(
		private usersRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({ email, password }: IRequest): Promise<User> {
		const findUserWithSameEmail = await this.usersRepository.findByEmail(email);

		if (findUserWithSameEmail)
			throw new AppError('This email is already taken');

		const hashedPassword = await this.hashProvider.generateHash(password);

		const user = await this.usersRepository.create({
			email,
			password: hashedPassword,
		});

		return user;
	}
}

export default CreateUserService;
