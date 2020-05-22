export class Employee
{
    id : string;
    name : string;
    age : number;
    salary : number;
    designation : string;

    constructor(id, name, age, salary, designation)
    {
        this.id = id;
        this.name = name;
        this.age=age;
        this.designation = designation;
        this.salary = salary;
    }

}