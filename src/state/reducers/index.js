import app from './app';
import initialState from '../initialState';

const reducersMap = {
  ...app,
  leaveStateUnchanged: state => state,
};

const unknownAction = type => {
  if (!type.startsWith('@@redux'))
    console.error(`Unknown action ${type}`);
  return reducersMap.leaveStateUnchanged;
}

const reducers = function reducers(state = initialState, action) {
  const reducer = reducersMap[action.type] || unknownAction(action.type);
  const newState = reducer(state, action.payload, action.meta);
  return newState;
};

export default reducers;

