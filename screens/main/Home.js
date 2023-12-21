import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react';
import HomeCard from '../../components/HomeCard';
import { COLORS, IMAGES, ROUTES, SCREEN_CONTENT } from '../../constants';
import { StyleSheet } from 'react-native';

const Home = ({ navigation }) => {

  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Retrieve language from AsyncStorage
    const retrieveLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage !== null) {
          console.log('Language retrieved successfully:', storedLanguage);
          setLanguage(storedLanguage);
        }
      } catch (error) {
        console.log('Error retrieving language:', error);
      }
    };

    retrieveLanguage();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.HPYLORI_NAVIGATOR)}>
          <HomeCard imageSource={IMAGES.hpylori} text={SCREEN_CONTENT[language].home.content.hpylori} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.PYLERA_NAVIGATOR)}>
          <HomeCard imageSource={IMAGES.medication} text={SCREEN_CONTENT[language].home.content.pylera} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.TREATMENT_NAVIGATOR)}>
          <HomeCard imageSource={IMAGES.plan} text={SCREEN_CONTENT[language].home.content.treatment} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.DASHBOARD)}>
          <HomeCard imageSource={IMAGES.dashboard} text={SCREEN_CONTENT[language].home.content.dashboard} />
        </TouchableOpacity>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORS.WHITE,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default Home;