import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, ROUTES } from '../../constants'; // Adjust the import path

const TreatmentWalkthroughInfo = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    To set your treatment plan, please enter the following data, and the application will send you notification reminders to take your doses on time.
                </Text>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.bubbleContainer}>
                    <TouchableOpacity style={[styles.bubble, styles.activeBubble]}>
                        <Text style={styles.bubbleTextActive}>1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE)}>
                        <Text style={styles.bubbleText}>2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bubble} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE)}>
                        <Text style={styles.bubbleText}>3</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.previousButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.previousButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate(ROUTES.TREATMENT_WALKTHROUGH_FIRSTDOSE)}>
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
});

export default TreatmentWalkthroughInfo;
