import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { styles } from './InfoStyleSheet';
import { IMAGES, ROUTES, SCREEN_CONTENT } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Table from '../../components/Table';


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

        <Text>{'\n\n\n\n\n\n\n\n\n\n'}</Text>

      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.PYLERA_INDICATION_AND_USAGE)}>
          <Text style={styles.buttonText}><Icon name='chevron-left' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(ROUTES.PYLERA)}>
          <Text style={styles.buttonText}><Icon name='backup-restore' size={35} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(ROUTES.PYLERA_ADVERSE_EVENTS)}>
          <Text style={styles.buttonText}><Icon name='chevron-right' size={35} /></Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default PyleraDoseEducation;