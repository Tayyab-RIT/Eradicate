import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './InfoStyleSheet';
import { SCREEN_CONTENT, IMAGES, ROUTES } from '../../constants';
import InformationCard from '../../components/InformationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const HpyloriFacts = ({ navigation }) => {
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
  }, [])
  return (
    <View style={styles.container}>
      <Image source={IMAGES.hpylori} style={styles.image} />
      <ScrollView style={styles.scrollContainer}>

        {
          SCREEN_CONTENT[language].hpylori.content.facts.content.facts.map((fact, index) => (
            <InformationCard key={index} fact={fact} gradientColors={['#1f456e', '#5978af']} />
          ))
        }
        <Text>{'\n\n\n\n\n\n\n\n\n\n'}</Text>
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.HPYLORI_DOS_DONTS)}>
          <Text style={styles.buttonText}><Icon name='chevron-left' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.HPYLORI)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.invisible}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      </View>
    </View >

  )
}

export default HpyloriFacts;