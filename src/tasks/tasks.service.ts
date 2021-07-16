import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string) {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string){
        return this.tasks.find((task, index) => {
            if(task.id === id) this.tasks.splice(index);
        });
    }

    updateTaskById(id: string, patch: string, param){
        return this.tasks.find((task, index) => {
            if(task.id === id) {
                if( patch == 'status'){
                    task.status = TaskStatus[param.status];
                }else if( patch == 'title' ){
                    task.title = param.title;
                }else if( patch == 'description' ){
                    task.description = param.description;
                }
            }
        });
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
