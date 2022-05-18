import React from 'react';
import Edittraining from './ToBeEditedTraining';
import Editcustomer from './ToBeEditedCustomer';

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  if (props.text==="customerlist") {
    return (
      <div>
        <Editcustomer updateCustomer = {props.update} link={cellValue}/> 
      </div>
    );
  } else if (props.text==="traininglist") {
    return (
      <div>
        <Edittraining updateTraining = {props.update} link={cellValue}/> 
      </div>
    );
  }
};