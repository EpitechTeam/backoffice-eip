import ActionsTypes from '../../constants/ActionsTypes';

const app = {
  [ActionsTypes.SET_USER]: (state, user) => {
    return { ...state, user };
  },
};

export default app;
