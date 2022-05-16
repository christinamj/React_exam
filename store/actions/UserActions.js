import User from '../../models/User';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const ONBOARD_USER = 'ONBOARD_USER';
export const EVENT_NOTIFICATIONS = 'EVENT_NOTIFICATIONS';
export const CHAT_NOTIFICATIONS = 'CHAT_NOTIFICATIONS';
export const EDIT_PROFILE = 'EDIT_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

import * as SecureStore from 'expo-secure-store';

const api_key = 'AIzaSyDWDmMH8BTTZylOx5YPecY6ZoSUBMGk9go';

export const restoreUser = (user, token) => {
   return { type: LOGIN, payload: { user, token } };
};

export const logOut = () => {
   SecureStore.setItemAsync('userToken', '');
   SecureStore.setItemAsync('user', '');
   SecureStore.setItemAsync('expiration', '');
   SecureStore.setItemAsync('refreshToken', '');
   return { type: LOGOUT };
};

export const refreshToken = refreshToken => {
   return async dispatch => {
      // redux thunk
      console.log('refreshToken');
      console.log(refreshToken);
      const response = await fetch(
         'https://securetoken.googleapis.com/v1/token?key=' + api_key,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               //javascript to json
               //key value pairs of data you want to send to server
               // ...

               refresh_token: refreshToken,
               grant_type: 'refresh_token',
            }),
         },
      );

      const data = await response.json(); // json to javascript
      console.log('Data after refresh token');
      console.log(data);
      if (!response.ok) {
         //There was a problem..
      } else {
         dispatch({ type: REFRESH_TOKEN, payload: data.id_token });
      }
   };
};

export const login = (email, password) => {
   return async dispatch => {
      // redux thunk
      const response = await fetch(
         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            api_key,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email: email,
               password: password,
               returnSecureToken: true,
            }),
         },
      );

      const data = await response.json(); // json to javascript
      console.log(data);
      if (!response.ok) {
         console.log('Error (LOGIN)');
         dispatch({
            type: SET_ERROR,
            payload: 'No match found',
         });
      } else {
         dispatch({
            type: REMOVE_ERROR,
            payload: undefined,
         });
         const token = data.idToken;
         const id = data.localId;
         const responseInfo = await fetch(
            `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
            {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            },
         );
         const userInfo = await responseInfo.json();
         console.log('get info');
         console.log(userInfo);

         //Check if additional info exists
         //If not, create user with only id and email
         if (userInfo == null) {
            console.log('logIn err', data);
            const user = new User(
               data.localId,
               '',
               '',
               '',
               email?.toLowerCase(),
               '',
               '',
               '',
            );

            // convertion of time
            let expiredIn = new Date();
            expiredIn.setSeconds(
               expiredIn.getSeconds() + parseInt(data.expiresIn),
            );

            // save the user in secure storage
            SecureStore.setItemAsync('userToken', data.idToken);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            let expiration = new Date();
            expiration.setSeconds(
               expiration.getSeconds() + parseInt(data.expiresIn),
            );
            SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);

            dispatch({
               type: LOGIN,
               payload: { user: user, token: data.idToken },
            });
         }
         //If additional info DO exist,
         //Create new user with id, name, email and studyprogramme
         else {
            console.log('userinfo from login', userInfo);
            const user = new User(
               data.localId,
               userInfo.firstname,
               '',
               '',
               email?.toLowerCase(),
               userInfo.studyProgramme,
               userInfo.chatToggle,
               userInfo.eventToggle,
            );
            console.log(user);
            // convertion of time
            let expiredIn = new Date();
            expiredIn.setSeconds(
               expiredIn.getSeconds() + parseInt(data.expiresIn),
            );

            // save the user in secure storage
            SecureStore.setItemAsync('userToken', data.idToken);
            SecureStore.setItemAsync('user', JSON.stringify(user));
            let expiration = new Date();
            expiration.setSeconds(
               expiration.getSeconds() + parseInt(data.expiresIn),
            );
            SecureStore.setItemAsync('expiration', JSON.stringify(expiration));
            SecureStore.setItemAsync('refreshToken', data.refreshToken);

            dispatch({
               type: LOGIN,
               payload: { user: user, token: data.idToken },
            });
         }
      }
   };
};

export const OnboardUser = (firstname, id, email, token, studyProgramme) => {
   return async dispatch => {
      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               firstname: firstname,
               studyProgramme: studyProgramme,
               chatToggle: 'false',
               eventToggle: 'false',
            }),
         },
      );
      const data = await response.json();
      if (!response.ok) {
         console.log('ERROR updating profile');
         console.log('data', data);
         console.log('token', token);
      } else {
         const user = new User(
            data.id,
            data.firstname,
            '',
            '',
            email?.toLowerCase(),
            data.studyProgramme,
            data.chatToggle,
            data.eventToggle,
         );
         console.log('user after onboarding', user);
         dispatch({
            type: ONBOARD_USER,
            payload: { user: user, token: token },
         });
      }
   };
};

export const EditProfile = (
   firstname,
   id,
   email,
   token,
   studyProgramme,
   chatToggle,
   eventToggle,
) => {
   return async dispatch => {
      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               firstname: firstname,
               studyProgram: studyProgramme,
            }),
         },
      );
      const data = await response.json();
      if (!response.ok) {
         console.log('ERROR updating profile');
         console.log('data', data);
         console.log('token', token);
      } else {
         const user = new User(
            data.id,
            firstname,
            '',
            '',
            email?.toLowerCase(),
            studyProgramme,
            chatToggle,
            eventToggle,
         );
         dispatch({
            type: EDIT_PROFILE,
            payload: { user: user, token: token },
         });
      }
   };
};

export const signup = (email, password) => {
   // console.log(email + " " + password);
   return async dispatch => {
      // redux thunk
      // console.log("again" + email + " " + password);
      const response = await fetch(
         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            api_key,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               //javascript to json
               //key value pairs of data you want to send to server
               // ...
               email: email,
               password: password,
               returnSecureToken: true,
            }),
         },
      );

      const data = await response.json(); // json to javascript
      console.log(data);
      if (!response.ok) {
         //There was a problem..
      } else {
         const user = new User(data.localId, '', '', '', email);
         dispatch({ type: SIGNUP, payload: { user, token: data.idToken } });
      }
   };
};

export const eventNotifications = (id, value, token) => {
   return async dispatch => {
      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               eventToggle: value,
            }),
         },
      );
      const data = await response.json();
      if (!response.ok) {
         console.log('ERROR updating event notifications');
         console.log('data', data);
         console.log('token', token);
      } else {
         dispatch({
            type: EVENT_NOTIFICATIONS,
            payload: { value: value, token: token },
         });
      }
   };
};

export const chatNotifications = (id, value, token) => {
   return async dispatch => {
      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
         {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               chatToggle: value,
            }),
         },
      );
      const data = await response.json();
      if (!response.ok) {
         console.log('ERROR updating chat notifications');
         console.log('data', data);
         console.log('token', token);
      } else {
         dispatch({
            type: CHAT_NOTIFICATIONS,
            payload: { value: value, token: token },
         });
      }
   };
};

export const deleteProfile = (id, token) => {
   return async (dispatch, getState) => {
      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json?auth=${token}`,
         {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
         },
      );
      const data = await response.json();
      if (!response.ok) {
         console.log('ERROR deleting user');
         console.log('data', data);
      } else {
         SecureStore.setItemAsync('userToken', '');
         SecureStore.setItemAsync('user', '');
         SecureStore.setItemAsync('expiration', '');
         SecureStore.setItemAsync('refreshToken', '');
         dispatch({
            type: LOGOUT,
         });
      }
   };
};
