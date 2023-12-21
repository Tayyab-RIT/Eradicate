import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { SCREEN_CONTENT, COLORS, ROUTES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Table from '../../components/Table';
import { Alert } from 'react-native';


const Treatment = ({ navigation }) => {

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

  // Reset the dose intake timings
  const handleResetButton = () => {
    Alert.alert(
      'Alert',
      'Would you like to reset your dose intake timings? You will be taken through the steps of inputting your timing information once again.',
      [
        {
          text: 'Cancel',
          onPress: () => {

          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_INFO)
          },
        },
      ],
      { cancelable: true } // Allows the user from dismissing the alert by tapping outside of it
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>

      <Text style={styles.bulletTextContent}>
        {SCREEN_CONTENT[language].pylera.content.doseEducation.content.textBlock1}
      </Text>
      <Text style={styles.bulletTextTitle}>
        {SCREEN_CONTENT[language].pylera.content.doseEducation.content.textBlock2}
      </Text>

      <Table
        tableHead={SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableHead}
        tableData={[
          [SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[0][0], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[0][1], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[0][2]],
          [SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[1][0], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[1][1], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[1][2]],
          [SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[2][0], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[2][1], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[2][2]],
          [SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[3][0], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[3][1], SCREEN_CONTENT[language].treatment.content.treatment.content.tableState.tableData[3][2]],
        ]} />

      <Text style={styles.bulletTextContent}>
        {SCREEN_CONTENT[language].pylera.content.doseEducation.content.textBlock3}
      </Text>
      <Text style={styles.bulletTextTitle}>
        {SCREEN_CONTENT[language].pylera.content.doseEducation.content.textBlock4}
      </Text>

      <Text style={styles.bulletTextContent}>
        {SCREEN_CONTENT[language].pylera.content.doseEducation.content.textBlock5}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleResetButton}>
        <Text style={styles.buttonText}>{SCREEN_CONTENT[language].treatment.content.treatment.content.buttonText}</Text>
      </TouchableOpacity>
      <Text>{'\n\n'}</Text>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 18,
  },
  bulletTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bulletTextContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 26,
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.RED,
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Treatment;