import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress'; // You might need to install this library
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS } from '../constants';

const CircleTimer = () => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [timeRemainingdDifference, settimeRemainingDifference] = useState(0);
    const [mealtimeDifference, setMealtimeDifference] = useState(0);

    const [counter, setCounter] = useState(0);

    const [treatmentStarted, setTreatmentStarted] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);
        }, 1000); // Set the interval to 1000 milliseconds (1 second)

        const retrieveTreatmentStarted = async () => {
            try {
                const started = await AsyncStorage.getItem('treatmentStarted');
                // console.log('Treatment started?:', started);
                if (started === 'true') {
                    setTreatmentStarted(true);
                } else {
                    setTreatmentStarted(false);
                }
            } catch (e) {
                console.log('Error retrieving treatment started:', e);
            }
        };


        const getPatientData = async () => {
            try {
                const patientDataString = await AsyncStorage.getItem('patientData');
                if (patientDataString) {
                    const patientData = JSON.parse(patientDataString);
                    calculateTimeRemaining(patientData);
                }
            } catch (error) {
                console.error('Error retrieving patient data from AsyncStorage:', error);
            }
        };

        const calculateTimeRemaining = (patientData) => {
            const now = new Date();
            let nextMealtime;
            let mealTimeDifference;

            // Determine the next upcoming mealtime
            if (compareTime(now, new Date(patientData.breakfastTime)) < 0) {
                nextMealtime = new Date(patientData.breakfastTime);
                mealTimeDifference = getTimeDifferenceInSeconds(new Date(patientData.breakfastTime), new Date(patientData.bedtime))
            } else if (compareTime(now, new Date(patientData.lunchTime)) < 0) {
                nextMealtime = new Date(patientData.lunchTime);
                mealTimeDifference = getTimeDifferenceInSeconds(new Date(patientData.lunchTime), new Date(patientData.breakfastTime))
            } else if (compareTime(now, new Date(patientData.dinnerTime)) < 0) {
                nextMealtime = new Date(patientData.dinnerTime);
                mealTimeDifference = getTimeDifferenceInSeconds(new Date(patientData.dinnerTime), new Date(patientData.lunchTime))
            } else if (compareTime(now, new Date(patientData.bedtime)) < 0) {
                nextMealtime = new Date(patientData.bedtime);
                mealTimeDifference = getTimeDifferenceInSeconds(new Date(patientData.bedtime), new Date(patientData.dinnerTime))
            } else {
                nextMealtime = new Date(patientData.breakfastTime)
                mealTimeDifference = getTimeDifferenceInSeconds(new Date(patientData.breakfastTime), new Date(patientData.dinnerTime))
            }

            // Calculate time remaining
            const timeDifference = getTimeDifferenceInSeconds(nextMealtime, now);
            const hours = Math.floor(timeDifference / (60 * 60));
            const minutes = Math.floor((timeDifference - (hours * 60 * 60)) / 60);
            const seconds = Math.floor((timeDifference - (minutes * 60) - (hours * 60 * 60)));
            
            // console.log(minutes);
            setMealtimeDifference(mealTimeDifference)
            settimeRemainingDifference(timeDifference)
            setTimeRemaining(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        };
        function compareTime(date1, date2) {
            // Extract hours, minutes, and seconds from the first date
            const hours1 = date1.getHours();
            const minutes1 = date1.getMinutes();
            const seconds1 = date1.getSeconds();

            // Extract hours, minutes, and seconds from the second date
            const hours2 = date2.getHours();
            const minutes2 = date2.getMinutes();
            const seconds2 = date2.getSeconds();

            // Compare the time components
            if (hours1 !== hours2) {
                return hours1 - hours2;
            } else if (minutes1 !== minutes2) {
                return minutes1 - minutes2;
            } else {
                return seconds1 - seconds2;
            }
        }

        function getTimeDifferenceInSeconds(date1, date2) {
            // Extract hours, minutes, and seconds from the first date
            const hours1 = date1.getHours();
            const minutes1 = date1.getMinutes();
            const seconds1 = date1.getSeconds();

            // Extract hours, minutes, and seconds from the second date
            const hours2 = date2.getHours();
            const minutes2 = date2.getMinutes();
            const seconds2 = date2.getSeconds();

            // Calculate the total seconds for each date
            let totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
            let totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;

            // Calculate the difference in seconds
            if (totalSeconds1 - totalSeconds2 < 0) {
                totalSeconds1 += 24*60*60
            }

            const differenceInSeconds = totalSeconds1 - totalSeconds2;

            return differenceInSeconds;
        }

        retrieveTreatmentStarted();
        
        if (treatmentStarted) {
            getPatientData();
        }
        return () => clearInterval(intervalId);
    }, [counter]);

    return (
        <View style={styles.container}>
            <CircularProgress
                size={200}
                width={15}
                fill={100 - ((timeRemainingdDifference / mealtimeDifference) * 100)}
                tintColor={COLORS.GREEN}
                backgroundColor="#e0e0e0"
                rotation={0}
                backgroundWidth={8}
                lineCap='round'
            >
                {() => (
                    treatmentStarted ? (<View><Text style={styles.nextDoseText}>{'Next Dose in:\n'}</Text><Text style={styles.timerText}>{timeRemaining}</Text></View>) : (<Text style={styles.infoText}>Please start your treatment plan in the “Treatment Plan” section.</Text>)
                )}
            </CircularProgress>
        </View>
    );
};

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nextDoseText: {
        fontSize: 16,
        textAlign: 'center',
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center',
    }
})

export default CircleTimer;
