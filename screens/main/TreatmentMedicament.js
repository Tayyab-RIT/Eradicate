import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TreatmentMedicament = ({ navigation }) => {
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
    <ScrollView>
      <View style={styles.container}>

        <Text style={styles.text}>
          {SCREEN_CONTENT[language].treatment.content.medicament.content.textBlock}
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_INFO)}>
          <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.medicament.content.button1}</Text>
        </TouchableOpacity>
      </View>

    </ScrollView >
  )
}

export default TreatmentMedicament;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    width: 310,
    backgroundColor: COLORS.ACCENT,
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "blue",
    textDecorationLine: 'underline',
    textTransform: 'lowercase',
  },
  confirmationText: {
    fontSize: 18,
    color: COLORS.TEXTCOLOR,
    fontWeight: 'bold',
    marginTop: 20,
  },
});