import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ROUTES } from '../constants';
import { TREATMENT, TREATMENT_ACKNOLEDGEMENT, TREATMENT_MEDICAMENT, TREATMENT_WALKTHROUGH_FIRSTDOSE, TREATMENT_WALKTHROUGH_INFO, TREATMENT_WALKTHROUGH_MEALTIMES } from '../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

function TreatmentNavigator() {
    const [treatmentStarted, setTreatmentStarted] = useState(false);
    const [dataRetrieved, setDataRetrieved] = useState(false);

    useEffect(() => {
        const retrieveTreatmentStarted = async () => {
            try {
                const started = await AsyncStorage.getItem('treatmentStarted');
                console.log('Treatment started?:', started);
                if (started === 'true') {
                    setTreatmentStarted(true);
                } else {
                    setTreatmentStarted(false);
                }
                setDataRetrieved(true)
            } catch (e) {
                console.log('Error retrieving treatment started:', e);
            }
        };

        retrieveTreatmentStarted();
    }, []);

    if (!dataRetrieved) {
        return null;
    }

    return (
        <Stack.Navigator initialRouteName={treatmentStarted ? ROUTES.TREATMENT : ROUTES.TREATMENT_ACKNOLEDGEMENT} screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name={ROUTES.TREATMENT} component={TREATMENT} />
            <Stack.Screen name={ROUTES.TREATMENT_ACKNOLEDGEMENT} component={TREATMENT_ACKNOLEDGEMENT} />
            <Stack.Screen name={ROUTES.TREATMENT_MEDICAMENT} component={TREATMENT_MEDICAMENT} />
            <Stack.Screen name={ROUTES.TREATMENT_WALKTHROUGH_INFO} component={TREATMENT_WALKTHROUGH_INFO} />
            <Stack.Screen name={ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE} component={TREATMENT_WALKTHROUGH_FIRSTDOSE} />
            <Stack.Screen name={ROUTES.TREATMENT_WALKTHROUGH_MEALTIMES} component={TREATMENT_WALKTHROUGH_MEALTIMES} />
        </Stack.Navigator>
    );
}

export default TreatmentNavigator;