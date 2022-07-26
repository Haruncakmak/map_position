import React from "react";
import positionData from "../api/positions.json";

const downloadFile = ({ data, fileName, fileType }) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([data], { type: fileType });
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};

const exportToJson = (e) => {
  e.preventDefault();
  downloadFile({
    data: JSON.stringify(positionData.positions),
    fileName: "position.json",
    fileType: "text/json",
  });
};

const Export = () => {
  return (
    <div>
      <div>
        <button className="button" type="button" onClick={exportToJson}>
          Export to JSON
        </button>
      </div>
    </div>
  );
};

export default Export;
