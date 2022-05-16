import {
   LOGIN,
   SIGNUP,
   LOGOUT,
   REFRESH_TOKEN,
   ONBOARD_USER,
   EVENT_NOTIFICATIONS,
   CHAT_NOTIFICATIONS,
   EDIT_PROFILE,
   SET_ERROR,
   REMOVE_ERROR,
} from '../actions/UserActions';

const initialState = {
   loggedInUser: undefined,
   token: undefined,
   error: undefined,
};

const UserReducer = (state = initialState, action) => {
   switch (action.type) {
      case REFRESH_TOKEN:
         return { ...state, token: action.payload };

      case LOGOUT:
         return {
            ...state,
            loggedInUser: undefined,
            token: undefined,
            error: undefined,
         };

      case SIGNUP:
         // Do something here
         // const test = { ...state, loggedInUser: action.payload.user, token: action.payload.token };
         // console.log(test);

         return {
            ...state,
            loggedInUser: action.payload.user,
            token: action.payload.token,
         };

      case LOGIN:
         return {
            ...state,
            loggedInUser: action.payload.user,
            token: action.payload.token,
            error: undefined,
         };

      case ONBOARD_USER:
         return {
            ...state,
            loggedInUser: action.payload.user,
            token: action.payload.token,
         };

      case EDIT_PROFILE:
         return {
            ...state,
            loggedInUser: action.payload.user,
            token: action.payload.token,
         };

      case EVENT_NOTIFICATIONS:
         console.log('hitting the reducer');
         return {
            ...state,
            loggedInUser: {
               //copy loggedInUser
               ...state.loggedInUser,
               //set the notification
               eventToggle: action.payload.value,
            },
            token: action.payload.token,
         };

      case CHAT_NOTIFICATIONS:
         console.log('hitting the reducer');
         return {
            ...state,
            loggedInUser: {
               //copy loggedInUser
               ...state.loggedInUser,
               //set the notification
               chatToggle: action.payload.value,
            },
            token: action.payload.token,
         };

      case SET_ERROR:
         console.log('setting error');
         return {
            ...state,
            error: action.payload,
         };

      case REMOVE_ERROR:
         console.log('removing error');
         return {
            ...state,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default UserReducer;
