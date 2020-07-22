import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

export default interface ITaskRepository {
	findByName(name: string): Promise<Task | undefined>;
	create(data: ICreateTaskDTO): Promise<Task>;
}
