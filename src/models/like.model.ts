export class LikeModel {
    public login: string;
    public newsfeedId: Number;

   constructor(login: string, newsfeedId: Number)
   {
       this.login = login;
       this.newsfeedId = newsfeedId;
   }
}
