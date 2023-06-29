import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DisplayErrors({ error }: { error: string }): JSX.Element {
  return (
    <div className="DisplayErrors">
      {error && (
        <div className="errors">
          <FontAwesomeIcon icon={faInfoCircle} color={"#00bcd4"} /> {error}
        </div>
      )}
    </div>
  );
}

export default DisplayErrors;
