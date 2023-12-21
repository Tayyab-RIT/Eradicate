import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { IMAGES, ROUTES, SCREEN_CONTENT } from '../../constants';
import { styles } from './InfoStyleSheet';
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PyleraDoseEducation = ({ navigation }) => {

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

        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock1}
        </Text>
        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock2}
        </Text>

        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock3}
        </Text>
        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock4}
        </Text>

        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock5}
        </Text>
        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].pylera.content.faq.content.textBlock6}
        </Text>

      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.PYLERA_DOSE_EDUCATION)}>
          <Text style={styles.buttonText}><Icon name='chevron-left' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.PYLERA)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invisible}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PyleraDoseEducation;