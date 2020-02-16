import ActionsTypes from '../../constants/ActionsTypes';

const setUser = user => {
  return {
    type: ActionsTypes.SET_USER,
    payload: user
  };
};

export default {
  setUser
};
