import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMess: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMess: action.payload };

    case ActionTypes.ADD_COMMENT: //update reducer to handle action type
      const comment = action.payload; //from the action creator payload
      comment.id = state.comments.length; //add unique id property to comment based on length of comments array
      return { ...state, comments: state.comments.concat(comment) }; //don't want to directly modify the state; use concat to add comment

    default:
      return state;
  }
};
