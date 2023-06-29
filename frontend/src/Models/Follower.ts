class Follower {
  public user_id?: number;
  public vacation_id?: number;

  public constructor(follower: Follower) {
    this.user_id = follower.user_id;
    this.vacation_id = follower.vacation_id;
  }
}

export default Follower;
