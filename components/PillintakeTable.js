import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'


const PillintakeTable = () => {

  const [todaysPillIntake, setTodaysPillIntake] = useState({ date: new Date(), breakfastTime: false, lunchTime: false, dinnerTime: false, bedtime: false });


  useEffect(() => {

    const retrieveTodaysPillIntake = async () => {
      try {
        const storedTodaysPillIntake = await AsyncStorage.getItem('todaysPillIntake');

        if (storedTodaysPillIntake !== null) {
          pillIntake = JSON.parse(storedTodaysPillIntake);
          today = new Date();
          pillDate = new Date(pillIntake.date);

          if (pillDate.getDate() === today.getDate() && pillDate.getMonth() === today.getMonth() && pillDate.getFullYear() === today.getFullYear()) {
            setTodaysPillIntake(pillIntake);
          } else {
            await AsyncStorage.setItem('todaysPillIntake', JSON.stringify({ date: today, breakfastTime: false, lunchTime: false, dinnerTime: false, bedtime: false }));
            console.log('New day, new pillintake');
            setTodaysPillIntake({ date: today, breakfastTime: false, lunchTime: false, dinnerTime: false, bedtime: false });
          }
        } else {
          await AsyncStorage.setItem('todaysPillIntake', JSON.stringify(todaysPillIntake));
          console.log('saved empty pillintake');
        }

        console.log('Todays Pill Intake retrieved successfully!', todaysPillIntake);

      } catch (error) {
        console.log('Error retrieving Todays Pill Intake:', error);
        return null;
      }
    };


    retrieveTodaysPillIntake();
  }, [])

  const handlePillIntakeClick = async (name, mealtime, bool) => {
    Alert.alert(
      'Alert',
      `Toggle pill intake for ${name}?`,
      [
        {
          text: 'Go Back',
          onPress: () => {

          },
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            newPillIntake = { ...todaysPillIntake }
            newPillIntake[mealtime] = bool
            try {
              await AsyncStorage.setItem('todaysPillIntake', JSON.stringify(newPillIntake))
              console.log('Pill intake toggled successfully');
            } catch {
              console.log("Error storing new pill intake");
            }
            setTodaysPillIntake(newPillIntake)
          },
        },
      ],
      { cancelable: true } // Allows the user from dismissing the alert by tapping outside of it
    );

  }

  const tableHead = ['Time', 'Pills Taken']
  const tableData = [
    ['Breakfast', todaysPillIntake.breakfastTime ?
      <View style={styles.icons}><Icon name='check' size={28} color='black' /><TouchableOpacity style={styles.tickButton} onPress={() => handlePillIntakeClick('Breakfast', 'breakfastTime', false)}><Icon name='close' size={28} color='white' /></TouchableOpacity></View> :
      <View style={styles.icons}><Icon name='close' size={28} color='black' /><TouchableOpacity style={styles.crossButton} onPress={() => handlePillIntakeClick('Breakfast', 'breakfastTime', true)}><Icon name='check' size={28} color='white' /></TouchableOpacity></View>],

    ['Lunch', todaysPillIntake.lunchTime ?
      <View style={styles.icons}><Icon name='check' size={28} color='black' /><TouchableOpacity style={styles.tickButton} onPress={() => handlePillIntakeClick('Lunch', 'lunchTime', false)}><Icon name='close' size={28} color='white' /></TouchableOpacity></View> :
      <View style={styles.icons}><Icon name='close' size={28} color='black' /><TouchableOpacity style={styles.crossButton} onPress={() => handlePillIntakeClick('Lunch', 'lunchTime', true)}><Icon name='check' size={28} color='white' /></TouchableOpacity></View>],

    ['Dinner', todaysPillIntake.dinnerTime ?
      <View style={styles.icons}><Icon name='check' size={28} color='black' /><TouchableOpacity style={styles.tickButton} onPress={() => handlePillIntakeClick('Dinner', 'dinnerTime', false)}><Icon name='close' size={28} color='white' /></TouchableOpacity></View> :
      <View style={styles.icons}><Icon name='close' size={28} color='black' /><TouchableOpacity style={styles.crossButton} onPress={() => handlePillIntakeClick('Dinner', 'dinnerTime', true)}><Icon name='check' size={28} color='white' /></TouchableOpacity></View>],

    ['Bedtime', todaysPillIntake.bedtime ?
      <View style={styles.icons}><Icon name='check' size={28} color='black' /><TouchableOpacity style={styles.tickButton} onPress={() => handlePillIntakeClick('Bedtime', 'bedtime', false)}><Icon name='close' size={28} color='white' /></TouchableOpacity></View> :
      <View style={styles.icons}><Icon name='close' size={28} color='black' /><TouchableOpacity style={styles.crossButton} onPress={() => handlePillIntakeClick('Bedtime', 'bedtime', true)}><Icon name='check' size={28} color='white' /></TouchableOpacity></View>],
  ]

  return (
    <View style={styles.container}>
      <View style={styles.tableRow}>
        {tableHead.map((header, index) => (
          <Text key={index} style={styles.columnHeader}>
            {header}
          </Text>
        ))}
      </View>
      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {rowData.map((cellData, columnIndex) => (
            <Text key={columnIndex} style={styles.tableCell}>
              {cellData}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    padding: 10,
    backgroundColor: COLORS.ACCENT_LIGHT,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.ACCENT,
    padding: 12,
    textAlign: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  crossButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 10,
  },
  tickButton: {
    backgroundColor: COLORS.ACCENT,
    borderRadius: 10,
  },
});

export default PillintakeTable;
