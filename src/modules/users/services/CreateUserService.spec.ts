import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
	it('should be able to create a new user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUser = new CreateUserService(fakeUsersRepository);

		const user = await createUser.execute({
			email: 'email@email.com',
			password: 'password',
		});

		expect(user).toHaveProperty('id');
	});

	it('should not be able to create a new user with the same email from another', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const createUser = new CreateUserService(fakeUsersRepository);

		await createUser.execute({
			email: 'email@email.com',
			password: 'password',
		});

		expect(
			createUser.execute({
				email: 'email@email.com',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
