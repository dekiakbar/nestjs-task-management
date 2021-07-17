import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tast-filter.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const {status, search} = filterDto;
        let tasks = this.getAllTasks();
        if (status){
            tasks = tasks.filter(task => task.status === status);
        }

        if(search){
            tasks = tasks.filter(task =>
                task.title.includes(search) || 
                task.description.includes(search)    
            );
        }

        return tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string){
        return this.tasks.find((task, index) => {
            if(task.id === id) this.tasks.splice(index);
        });
    }

    updateTaskById(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    createTask(CreateTaskDto: CreateTaskDto): Task {
        const { title, description } = CreateTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }
}
