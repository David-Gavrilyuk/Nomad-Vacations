import dal_mysql from "../Utils/dal_mysql";
import Follower from "../Models/Follower";

const allLikes = async () => {
  const SQLcommand = `SELECT * FROM project_vacations.followers;`;
  return await dal_mysql.execute(SQLcommand);
};

const like = async (liked: Follower) => {
  const SQLcommand = `
  INSERT INTO project_vacations.followers (user_id, vacation_id)
  SELECT '${liked.user_id}', '${liked.vacation_id}'
  WHERE NOT EXISTS (
  SELECT 1 FROM project_vacations.followers
  WHERE user_id = '${liked.user_id}' AND vacation_id = '${liked.vacation_id}'
  );
`;
  return await dal_mysql.execute(SQLcommand);
};

const unlike = async (unliked: Follower) => {
  const SQLcommand = `DELETE FROM project_vacations.followers
  WHERE (user_id = '${unliked.user_id}' AND vacation_id = '${unliked.vacation_id}' );`;
  return await dal_mysql.execute(SQLcommand);
};

export { allLikes, like, unlike };
