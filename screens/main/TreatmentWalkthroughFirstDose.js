import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ROUTES } from '../../constants'; // Adjust the import path

const TreatmentWalkthroughFirstDose = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Show the date picker
  const showDatepicker = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  // Show the time picker
  const showTimepicker = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
  };

  // Function to handle the date change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Function to handle the time change
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const handleNext = async (date, time) => {
    try {
      // Retrieve patient data from AsyncStorage
      let patientDataString = await AsyncStorage.getItem('patientData');
      let patientData = patientDataString ? JSON.parse(patientDataString) : {};

      // Update the "firstDoseDate" and "firstDoseTime" properties with the new date
      patientData.firstDoseDate = date
      patientData.firstDoseTime = time;

      // Stringify the updated patient data
      const updatedPatientDataString = JSON.stringify(patientData);

      // Save the updated patient data back to AsyncStorage
      await AsyncStorage.setItem('patientData', updatedPatientDataString);

      console.log('Patient first dose data updated successfully:', patientData);
      navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_MEALTIMES)

    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Enter the first dose date and time:
        </Text>
      </View>

      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>Update Date: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={date}
            mode="date"
            is24Hour={false}
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>

      <View style={styles.timeContainer}>
        <TouchableOpacity style={styles.timeButton} onPress={showTimepicker}>
          <Text style={styles.timeButtonText}>Update Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={time}
            mode="time"
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.bubbleContainer}>
          <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_INFO)}>
            <Text style={styles.bubbleText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bubble, styles.activeBubble]}>
            <Text style={styles.bubbleTextActive}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bubble} onPress={() => handleNext(date, time)}>
            <Text style={styles.bubbleText}>3</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.previousButton} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_INFO)}>
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => handleNext(date, time)}>
            <Text style={styles.nextButtonText}>Next</Text>
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
    flex: 1,
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

  dateContainer: {
    marginVertical: 20,
  },
  dateButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  dateButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
  timeContainer: {
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  timeButtonText: {
    color: COLORS.WHITE,
    fontSize: 18,
  },
});

export default TreatmentWalkthroughFirstDose;
