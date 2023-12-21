import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { styles } from './InfoStyleSheet';
import { useEffect, useState } from 'react'
import { IMAGES, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const HpyloriSymptoms = ({ navigation }) => {

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
      <Image source={IMAGES.hpylori} style={styles.image} />
      <ScrollView style={styles.scrollContainer}>

        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.content.textBlock1}
        </Text>
        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.content.textBlock2}
        </Text>
        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.content.textBlock3}
        </Text>
        <Image source={IMAGES.hpylori_donts} style={{ width: '100%', height: 300, resizeMode: 'contain', marginBottom: 30 }} />
        <Text style={styles.bulletTextTitle}>
          {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.content.textBlock4}
        </Text>
        <Image source={IMAGES.hpylori_dos} style={{ width: '100%', height: 300, resizeMode: 'contain', marginBottom: 30 }} />
        <Text style={styles.bulletTextContent}>
          {SCREEN_CONTENT[language].hpylori.content.dosAndDonts.content.textBlock5}
        </Text>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.HPYLORI_PEPTIC_ULCER)}>
          <Text style={styles.buttonText}><Icon name='chevron-left' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.HPYLORI)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(ROUTES.HPYLORI_FACTS)}>
          <Text style={styles.buttonText}><Icon name='chevron-right' size={35} /></Text>
        </TouchableOpacity>
      </View>

    </View >
  )
}

export default HpyloriSymptoms;