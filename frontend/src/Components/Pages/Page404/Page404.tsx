import "./Page404.css";
import AirplanemodeInactiveIcon from "@mui/icons-material/AirplanemodeInactive";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <h1>
        404
        <hr />
        Page not found
        <br />
        <AirplanemodeInactiveIcon className="notFound" sx={{ width: 60, height: 60 }} />
      </h1>
    </div>
  );
}

export default Page404;
