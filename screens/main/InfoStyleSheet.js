import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants'

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
        position: 'absolute',
        backgroundColor: COLORS.WHITE,
        top: '20%',
        width: '100%',
        height: '80%',
        paddingHorizontal: 26,
        paddingTop: 26,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,

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
    buttons: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: COLORS.ACCENT,
        borderRadius: 100,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.WHITE,
        fontSize: 14,
        fontWeight: 'bold',
    },
    previousButton: {
        backgroundColor: COLORS.ACCENT,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: COLORS.ACCENT,
        borderRadius: 100,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invisible: {
        width: 60,
        height: 60,
    },
});

export { styles }