import React, { useState } from "react";
import "./Alert.css";

const Alert = ({visible, text, serverity}) => {
  const [display, setDisplay] = useState((visible)?"block":"none");

  const closeAlert = () => {
    setDisplay("none")
  };

  return (
    <div className="alert" style={{display:display, backgroundColor: (serverity === "error"?"#f44336":"#04AA6D")}}>
      <span className="closebtn" onClick={closeAlert}>
        &times;
      </span>
        <strong style={{fontSize: 20}}>{(serverity === "error"?"Error":"Success" )}!</strong> 
        {" "}{text}
    </div>
  );
};

export default Alert;
