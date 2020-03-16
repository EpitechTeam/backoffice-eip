import React from 'react';
import FormInput from '../FormInput';

function MissionForm() {
  return (
    <React.Fragment>
      <FormInput name="user_id" />
      <FormInput name="name" />
      <FormInput name="object" />
      <FormInput name="houseOwner" label="house owner" />
      <FormInput name="date" />
      <FormInput name="city" />
      <FormInput name="img" label="image" />
      <FormInput name="deal" />
    </React.Fragment>
  );
};

export default MissionForm;
