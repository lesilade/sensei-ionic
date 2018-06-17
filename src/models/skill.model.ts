export class SkillModel {
    public id?: number;
    public name: string;
    public username: string;

    constructor(name: string, username: string)
    {
        this.name = name;
        this.username = username;
    }
     
  }