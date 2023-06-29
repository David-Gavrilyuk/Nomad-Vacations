import api from "../../API/axios";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/joy/IconButton";
import { RootState, store } from "../../Redux/Store";
import { setSnackNote } from "../../Redux/SnackBarReducer";
import { like, unlike } from "../../Redux/FollowersReducer";
import Follower from "../../Models/Follower";

function LikeButton({ vacation_id, user_id }: { vacation_id?: number; user_id?: number }): JSX.Element {
  const followers = useSelector((state: RootState) => state.FollowersState.followers);
  const likeCount = followers.filter((like: Follower) => like.vacation_id === vacation_id).length;

  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  const follower: Follower = { vacation_id, user_id };

  const handleFollow = async () => {
    try {
      const requestConfig: AxiosRequestConfig = {
        method: isButtonActive ? "delete" : "post",
        url: `/likes/${isButtonActive ? "unlike" : "like"}`,
        data: follower,
      };

      store.dispatch(isButtonActive ? unlike(follower) : like(follower));
      store.dispatch(setSnackNote(true, "info", `${isButtonActive ? "Vacation unliked" : "Vacation liked"}`));
      await api(requestConfig);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleButtonClick = () => {
    setIsButtonActive((prevIsActive) => !prevIsActive);
    handleFollow();
  };

  useEffect(() => {
    setIsButtonActive(followers.some((like: Follower) => like.user_id === user_id && like.vacation_id === vacation_id));
  }, [followers, user_id, vacation_id]);

  return (
    <div className="LikeButton">
      <IconButton
        size="sm"
        variant="soft"
        color={isButtonActive ? "danger" : "neutral"}
        sx={{ position: "absolute", zIndex: 1, left: "10px", top: 10, color: isButtonActive ? "red" : "neutral" }}
        onClick={handleButtonClick}
      >
        <FavoriteIcon /> {isButtonActive ? "Unlike " : "Like "}
        {likeCount || ""}
      </IconButton>
    </div>
  );
}

export default LikeButton;
