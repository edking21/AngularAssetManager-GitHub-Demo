export class TimeSheetInfo{
    id: number;
    UserName: string;
    WeekBeginDate: Date;
    ActivityId: number;
    ActivityIdText: string;
    Category: string;
    Project: string;
    Task: string;
    Monday: number;
    Tuesday: number;
    Wednesday: number;
    Thursday: number;
    Friday: number;
    Saturday: number;
    Sunday: number;
    Total: number;
    IsCreateAction: boolean;
    
    constructor(id: number, UserName: string, WeekBeginDate: Date, ActivityId: number, ActivityIdText: string,
        Category: string, Project: string, Task: string, Monday: number, Tuesday: number, Wednesday: number,
        Thursday: number, Friday: number, Saturday: number, Sunday: number, Total: number, IsCreateAction: boolean){
            this.id = id;
            this.UserName = UserName;
            this.WeekBeginDate = WeekBeginDate;
            this.ActivityId =  ActivityId;
            this.ActivityIdText = ActivityIdText;
            this.Category = Category;
            this.Project = Project;
            this.Task = Task;
            this.Monday = Monday;
            this.Tuesday = Tuesday;
            this.Wednesday = Wednesday;
            this.Thursday = Thursday;
            this.Friday = Friday;
            this.Saturday = Saturday;
            this.Sunday = Sunday;
            this.Total = Total;
            this.IsCreateAction = IsCreateAction;
    }

  }
