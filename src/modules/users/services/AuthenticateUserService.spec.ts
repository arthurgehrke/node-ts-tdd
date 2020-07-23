import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		const user = await createUser.execute({
			email: 'email@email.com',
			password: 'password',
		});

		const response = await authenticateUser.execute({
			email: 'email@email.com',
			password: 'password',
		});

		expect(response).toHaveProperty('token');
		expect(response.user).toEqual(user);
	});

	it('should not be able to authenticate with not existing user', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		expect(
			authenticateUser.execute({
				email: 'email@email.com',
				password: 'password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with wrong password', async () => {
		const fakeUsersRepository = new FakeUsersRepository();
		const fakeHashProvider = new FakeHashProvider();

		const createUser = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);
		const authenticateUser = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider,
		);

		await createUser.execute({
			email: 'email@email.com',
			password: 'password',
		});

		expect(
			authenticateUser.execute({
				email: 'email@email.com',
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
