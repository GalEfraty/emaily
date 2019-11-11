import React from "react";

//SurveyField contains logic to render a signle lable and text input

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: "5px" }} {...input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
