import { nanoid } from "nanoid";
import axios from "axios";
import Export from "./Export";

const API_URL = "http://localhost:5000/positions/";

const Side = ({ position, setPositions }) => {
  const itemdate = new Date(2022, 5, 27);
  const month = itemdate.toLocaleString("en-US", { month: "long" });
  const day = itemdate.toLocaleString("en-US", { day: "2-digit" });
  const year = itemdate.getFullYear();

  const onPositionSaveClicked = async () => {
    const addedPosition = {
      id: nanoid(),
      date: new Date().toISOString(),
      position,
    };
    const { data } = await axios.post(API_URL, addedPosition);
    if (data) {
      setPositions((oldPositions) => [...oldPositions, data]);
    }
  };

  return (
    <div className="item-container">
      <div className="item">
        <div className="item_latlng">{position}</div>
        <div className="item_date">
          <div>{month}/</div>
          <div>{year}/</div>
          <div>{day}</div>
        </div>
      </div>
      <div className="button-group">
        <button
          type="button"
          className="button"
          onClick={() => onPositionSaveClicked()}
        >
          Add Coordinate
        </button>
        <Export />
      </div>
    </div>
  );
};

export default Side;
