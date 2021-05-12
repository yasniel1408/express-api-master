import React from "react";
import "./Alert.css";

const Alert = ({visible, setAlert, text, serverity}) => {

  return (
    <div className="alert" style={{display:(visible)?"block":"none", backgroundColor: (serverity === "error"?"#f44336":"#04AA6D")}}>
      <span className="closebtn" onClick={()=>setAlert(false)}>
        &times;
      </span>
        <strong style={{fontSize: 20}}>{(serverity === "error"?"Error":"Success" )}!</strong> 
        {" "}{text}
    </div>
  );
};

export default Alert;
