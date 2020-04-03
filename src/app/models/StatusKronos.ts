export class StatusKronos {
  UserName: string;
  LoginUserName: string;
  BeginDate: Date;

  constructor(UserName:string, LoginUserName:string, BeginDate:Date){
      this.UserName = UserName;
      this.LoginUserName = LoginUserName;
      this.BeginDate = BeginDate;
  }
}
