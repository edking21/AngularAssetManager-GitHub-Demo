export class Task{
    taskName: string;
    taskId: number;
    categoryId: number;
    projectId: number;

    constructor(taskName: string, taskId: number, categoryId: number, projectId: number){
        this.taskName = taskName;
        this.taskId =taskId;
        this.categoryId = categoryId;
        this.projectId = projectId;
    }
}