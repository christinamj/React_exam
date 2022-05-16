export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENT = 'ADD_EVENT';

import Event from '../../models/Event';

export const getEvents = () => {
   return async (dispatch, getState) => {
      const token = getState().user.token;

      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth=${token}`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         },
      );
      const data = await response.json();
      console.log('get info');

      if (!response.ok) {
         console.log('Error fetching events', data);
      } else {
         //  console.log(data);

         let eventsArray = [];

         for (const key in data) {
            let event = data[key];
            event.id = key;
            // console.log(event.id);
            // console.log('event', event);
            eventsArray.push(event);
         }
         //  console.log('events', events);
         dispatch({ type: GET_EVENTS, payload: eventsArray });
      }
   };
};

export const addEvent = (
   eventTitle,
   date,
   start,
   end,
   location,
   organisation,
   email,
   token,
) => {
   return async (dispatch, getState) => {
      const token = getState().user.token;

      const response = await fetch(
         `https://kvaliapp-15741-default-rtdb.europe-west1.firebasedatabase.app/events.json?auth=${token}`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               eventTitle: eventTitle,
               date: date,
               start: start,
               end: end,
               location: location,
               organisation: organisation,
               author: email,
               imageName: 'cbs-default',
            }),
         },
      );
      const data = await response.json();

      if (!response.ok) {
         console.log('Error adding event', data);
      } else {
         //  console.log(data);
         const event = new Event(
            location,
            data.author,
            date,
            eventTitle,
            organisation,
            start,
            end,
            imageName,
         );
         dispatch({ type: ADD_EVENT, payload: event });
         console.log('added to db');
      }
   };
};
