import React, { useEffect } from 'react'
import RootNavigation from './src/navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import SystemNavigationBar from 'react-native-system-navigation-bar';


const App = () => {
  useEffect(() => {
    SystemNavigationBar.setNavigationColor('transparent', 'light');
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <RootNavigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  )
}

export default App