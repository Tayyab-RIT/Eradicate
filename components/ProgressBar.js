import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const ProgressBar = ({ maxValue, currentValue }) => {
    // Calculate the percentage completion
    const percentage = (currentValue / maxValue) * 100;

    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${percentage}%` }]} />
            <Text style={styles.progressText}>{`${percentage.toFixed(2)}%`}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        height: 22,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.GREEN,
    },
    progressText: {
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 2,
        color: 'black',
    },
});

export default ProgressBar;
