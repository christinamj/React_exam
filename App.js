import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import ChatReducer from './store/reducers/ChatReducer';
import UserReducer from './store/reducers/UserReducer';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';
import EventReducer from './store/reducers/EventReducer';

const rootReducer = combineReducers({
   chat: ChatReducer,
   user: UserReducer,
   events: EventReducer,
});

const useFonts = () => {
   return Font.loadAsync({
      'Teko-Medium': require('./assets/fonts/Teko/Teko-Medium.ttf'),
      'OpenSans-Regular': require('./assets/fonts/OpenSans/OpenSans-Regular.ttf'),
      'OpenSans-Medium': require('./assets/fonts/OpenSans/OpenSans-Medium.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans/OpenSans-Bold.ttf'),
   });
};

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
   const [fontLoaded, setFontLoaded] = React.useState(false);
   return (
      <Provider store={store}>
         {!fontLoaded ? (
            <AppLoading
               startAsync={useFonts}
               onFinish={() => setFontLoaded(true)}
               onError={error => console.error(error)}
            />
         ) : (
            <Navigation></Navigation>
         )}
      </Provider>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
