/* eslint-disable no-unused-expressions */
import ITaskRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '@modules/tasks/infra/typeorm/entities/Task';

class TasksRepository implements ITaskRepository {
	private tasks: Task[] = [];

	public async findByName(name: string): Promise<Task | undefined> {
		const findTask = this.tasks.find(task => task.name === name);

		return findTask;
	}

	public async create({ name, date, user_id }: ICreateTaskDTO): Promise<Task> {
		const task = new Task();

		Object.assign(task, {
			id: Math.floor(Math.random() * 6) + 1,
			name,
			date,
			user_id,
		});

		this.tasks.push(task);

		return task;
	}
}

export default TasksRepository;
