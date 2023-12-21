import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { styles } from './InfoStyleSheet';
import { IMAGES, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const PyleraAdverseEvents = ({ navigation }) => {

  const [language, setLanguage] = useState('en');

  useEffect(() => {
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
      <Image source={IMAGES.pylera} style={styles.image} />
      <ScrollView style={styles.scrollContainer}>

        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].pylera.content.adverseEvents.content.textBlock}
        </Text>

      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.PYLERA_DOSE_EDUCATION)}>
          <Text style={styles.buttonText}><Icon name='chevron-left' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.PYLERA)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(ROUTES.PYLERA_PATIENT_COUNSELING_INFORMATION)}>
          <Text style={styles.buttonText}><Icon name='chevron-right' size={35} /></Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PyleraAdverseEvents;