export class Project{
    projectName:string;
    projectId:number;
    categoryId:number;

    constructor(projectName:string, projectId:number, categoryId:number){
        this.projectName = projectName;
        this.projectId = projectId;
        this.categoryId = categoryId;
    }
}