import React from 'react';
import { AuthProvider } from './AuthProvider';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

export default App;
