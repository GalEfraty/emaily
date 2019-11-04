import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";

//SurveyForm shows a form to the user to add input
class SurveyForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field type="text" name="surveyTitle" componenet="input" />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: "surveyForm"
})(SurveyForm);
