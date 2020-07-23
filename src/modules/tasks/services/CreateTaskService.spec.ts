import AppError from '@shared/errors/AppError';

import FakeTasksRepository from '../repositories/fakes/FakeTaskRepository';
import CreateTaskService from './CreateTaskService';

describe('CreateTask', () => {
	it('should be able to create a new task', async () => {
		const fakeTasksRepository = new FakeTasksRepository();
		const createTask = new CreateTaskService(fakeTasksRepository);

		const task = await createTask.execute({
			name: 'name',
			date: new Date(),
			user_id: Math.floor(Math.random() * 6) + 1,
		});

		expect(task).toHaveProperty('id');
		expect(task.name).toBe('name');
	});

	it('should not be able to create two tasks with the same name', async () => {
		const fakeTasksRepository = new FakeTasksRepository();
		const createTask = new CreateTaskService(fakeTasksRepository);

		const name = 'name';

		await createTask.execute({
			name,
			date: new Date(),
			user_id: Math.floor(Math.random() * 6) + 1,
		});

		expect(
			createTask.execute({
				name,
				date: new Date(),
				user_id: Math.floor(Math.random() * 6) + 1,
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
