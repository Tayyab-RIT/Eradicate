import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ROUTES } from '../../constants'; // Adjust the import path
import NotificationService from './NotificationService';

const TreatmentWalkthroughMealtimes = ({ navigation }) => {

  const [mealTimes, setMealTimes] = useState({
    breakfastTime: new Date(),
    lunchTime: new Date(),
    dinnerTime: new Date(),
    bedtime: new Date(),
  });

  const [selectedMealTime, setSelectedMealTime] = useState('breakfastTime');

  const [showPicker, setShowPicker] = useState(false);

  // Function to handle the date change
  const handleClick = (mealTime) => {
    setSelectedMealTime(mealTime)
    setShowPicker(true)
  }

  // Function to handle the time change
  const updateMealTime = async (event, selectedTime) => {
    setShowPicker(false)

    const newMealTimes = { ...mealTimes }
    newMealTimes[selectedMealTime] = selectedTime

    setMealTimes({ ...newMealTimes })
  }

  // Function to start the treatment
  const startTreatment = async () => {
    try {

      const notificationService = new NotificationService();
      await notificationService.scheduleNotification({hour: mealTimes.breakfastTime.getHours(), minute: mealTimes.breakfastTime.getMinutes(), repeats: true}, "Take 3 PYLERA capsules and 1 OMEPRAZOLE capsule now!");
      await notificationService.scheduleNotification({hour: mealTimes.lunchTime.getHours(), minute: mealTimes.lunchTime.getMinutes(), repeats: true}, "Take 3 PYLERA capsules and 0 OMEPRAZOLE capsule now!");
      await notificationService.scheduleNotification({hour: mealTimes.dinnerTime.getHours(), minute: mealTimes.dinnerTime.getMinutes(), repeats: true}, "Take 3 PYLERA capsules and 1 OMEPRAZOLE capsule now!");
      await notificationService.scheduleNotification({hour: mealTimes.bedtime.getHours(), minute: mealTimes.bedtime.getMinutes(), repeats: true}, "Take 3 PYLERA capsules and 0 OMEPRAZOLE capsule now!");
      notificationService.notificationResponseRecievedListener(navigation);

      await AsyncStorage.setItem('treatmentStarted', 'true');
      console.log('Treatment started');
    } catch (e) {
      console.log('Error starting treatment:', e);
    }
  };

  const handleNext = async (date, time) => {
    try {
      // Retrieve patient data from AsyncStorage
      let patientDataString = await AsyncStorage.getItem('patientData');
      let patientData = patientDataString ? JSON.parse(patientDataString) : {};

      // Update patient data with selected meal times
      patientData.breakfastTime = mealTimes.breakfastTime
      patientData.lunchTime = mealTimes.lunchTime
      patientData.dinnerTime = mealTimes.dinnerTime
      patientData.bedtime = mealTimes.bedtime

      // Stringify the updated patient data
      const updatedPatientDataString = JSON.stringify(patientData);

      // Save the updated patient data back to AsyncStorage
      await AsyncStorage.setItem('patientData', updatedPatientDataString);

      console.log('Meal times saved successfully:', patientData);
      
      Alert.alert(
        'Alert',
        'Before proceeding, please make sure the data you have entered is accurate. You will get reminders based on the times you have provided.',
        [
          {
            text: 'Go Back',
            onPress: () => {
              
            },
            style: 'cancel',
          },
          {
            text: 'Proceed',
            onPress: () => {
              startTreatment()
              navigation.navigate(ROUTES.TREATMENT)
            },
          },
        ],
        { cancelable: true } // Allows the user from dismissing the alert by tapping outside of it
      );

    } catch (error) {
      console.error('Error saving meal times:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Set your daily meals times:
          {'\n\n'}
        </Text>
      </View>

      <View>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleClick('breakfastTime')}>
          <Text style={styles.timeButtonText}>Breakfast Time: {mealTimes.breakfastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleClick('lunchTime')}>
          <Text style={styles.timeButtonText}>lunch Time: {mealTimes.lunchTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleClick('dinnerTime')}>
          <Text style={styles.timeButtonText}>dinner Time: {mealTimes.dinnerTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.timeButton} onPress={() => handleClick('bedtime')}>
          <Text style={styles.timeButtonText}>bedtime: {mealTimes.bedtime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          testID="timePicker"
          value={new Date()}
          mode='time'
          is24Hour={false}
          display="default"
          onChange={updateMealTime}
        />
      )}

      <View style={styles.bottomContainer}>
        <View style={styles.bubbleContainer}>
          <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_INFO)}>
            <Text style={styles.bubbleText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE)}>
            <Text style={styles.bubbleText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.activeBubble]}>
            <Text style={styles.bubbleTextActive}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE)}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Start Treatment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-ends',

  },
  infoContainer: {
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bubbleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.ACCENT,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  activeBubble: {
    backgroundColor: COLORS.WHITE,
    transform: [{ scale: 1.8 }],

  },
  bubbleText: {
    color: COLORS.WHITE,
    fontSize: 12,
  },
  bubbleTextActive: {
    color: COLORS.ACCENT,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  nextButton: {
    backgroundColor: COLORS.GREEN,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    flex: 2,
  },
  previousButton: {
    backgroundColor: COLORS.RED,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    flex: 1,
  },
  nextButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  previousButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  timeButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  timeButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
});

export default TreatmentWalkthroughMealtimes;
