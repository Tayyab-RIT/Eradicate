import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import LanguageNavigator from './navigations/LanguageNavigator';
import SplashScreen from './components/SplashScreen';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './constants';

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      {/* Modify status bar, and show loading screen */}
      <StatusBar style='light' backgroundColor={COLORS.PRIMARY} />
      {isLoading ? <SplashScreen /> : <LanguageNavigator />}
      
    </NavigationContainer>
  );
}