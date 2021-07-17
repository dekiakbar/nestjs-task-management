import { Body, Controller, Get, Post, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tast-filter.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private TasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        if(Object.keys(filterDto).length){
            return this.TasksService.getTasksWithFilters(filterDto);
        }else{
            return this.TasksService.getAllTasks();
        }
    }
    
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.TasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.TasksService.deleteTask(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
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
