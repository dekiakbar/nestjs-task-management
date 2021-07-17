import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService){}

    @Get()
    getAllTasks(): Task[] {
        return this.TasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): Task {
        return this.TasksService.deleteTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto ): Task {
        return this.TasksService.createTask(CreateTaskDto);
    }

    @Patch('/:id/status')
    updateTaskById(
        @Param('id') id: string,
        @Body('status') status: TaskStatus
    ): Task {
        return this.TasksService.updateTaskById(id, status);
    }
}
