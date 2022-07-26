import { formattingDate, momentDate } from "../utilities/formattingDate";

const ListPositions = ({ positions, deletePosition, setPosition }) => {
  const orderedList = positions.sort((a, b) => b.date.localeCompare(a.date));
  const renderedList = orderedList.map((item) => {
    const { id, date, position } = item;
    const [lat, lng] = position;

    return (
      <div className="container_latlng" key={id}>
        <h3>
          Latitute:{lat} - Longitude:{lng}
        </h3>
        <button
          className="position_button"
          onClick={() => setPosition([lat, lng])}
        >
          Go To Position
        </button>
        <span>{formattingDate(date)}</span> <br />
        <span>{momentDate(date)}</span>
        <button className="button_exit" onClick={() => deletePosition(id)}>
          x
        </button>
      </div>
    );
  });
  return <div>{renderedList}</div>;
};
export default ListPositions;
