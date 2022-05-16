import { ADD_EVENT, GET_EVENTS } from '../actions/EventActions';

const initialState = {
   events: [],
};

const EventReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_EVENTS:
         console.log('payload', action.payload);
         return {
            ...state,
            events: action.payload,
         };

      case ADD_EVENT:
         console.log('payload', action.payload);
         return {
            ...state,
            events: action.payload,
         };
      default:
         return state;
   }
};
export default EventReducer;
