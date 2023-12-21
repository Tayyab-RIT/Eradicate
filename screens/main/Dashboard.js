import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import PillintakeTable from '../../components/PillintakeTable'
import CircleTimer from '../../components/CircleTimer'
import { SCREEN_CONTENT } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProgressBar from '../../components/ProgressBar'
import { useIsFocused } from '@react-navigation/native'

const Dashboard = () => {

  const [language, setLanguage] = useState('en');
  const [patientData, setPatientData] = useState({})

  // Retrieve language from AsyncStorage
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

    // Retrieve patient data from AsyncStorage
    const getPatientData = async () => {
      try {
        const patientDataString = await AsyncStorage.getItem('patientData');
        if (patientDataString) {
          const storedPatientData = JSON.parse(patientDataString);
          setPatientData(storedPatientData);
          console.log('Retrieved patient data', storedPatientData);
        }
      } catch (error) {
        console.error('Error retrieving patient data from AsyncStorage:', error);
      }
    };
    getPatientData();
    retrieveLanguage();
  }, [useIsFocused()])


  return (
    <ScrollView style={styles.container}>
      <CircleTimer />
      <ProgressBar currentValue={Object.keys(patientData).length !== 0 ? Math.floor(Math.abs(new Date() - new Date(patientData.firstDoseDate)) / (1000 * 60 * 60 * 24)) : 0} maxValue={10} />
      <Text style={styles.daysProgressedText}>{SCREEN_CONTENT[language].dashboard.content.daysProgressedText}{Object.keys(patientData).length !== 0 ? Math.floor(Math.abs(new Date() - new Date(patientData.firstDoseDate)) / (1000 * 60 * 60 * 24)) : 0}{'/10'}</Text>

      <Text style={styles.text}>{SCREEN_CONTENT[language].dashboard.content.tableContent.title}</Text>

      <PillintakeTable />

    </ScrollView>

  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 30,
  },
  progressBar: {
    marginTop: 10,
  },
  daysProgressedText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  }
})