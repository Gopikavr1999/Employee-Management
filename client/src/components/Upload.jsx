import React from "react";
import "../styles/upload.css";

const Upload = ({onFileChange}) => {
 
  return (
    <div className="upload-main ">
        <input className="col-md-6 " onChange={onFileChange} type="file"  />
    </div>
  );
};

export default Upload;
