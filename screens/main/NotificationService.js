import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { ROUTES } from '../../constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class NotificationService {
    constructor() {
        this.registerForPushNotifications();
    }

    // Register for push notifications. Basically ask user to enable notifications
    registerForPushNotifications = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync()

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Notifications permissions were not granted! Please allow notifications to get medication reminders.');
                return;
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }
    };

    // Listen for notification clicks
    notificationResponseRecievedListener = (navigation) => {

        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('User clicked notification');
            navigation.navigate(ROUTES.DASHBOARD)
        });
        return () => subscription.remove();
    }

    // Schedule a notification at the specified date and time
    scheduleNotification = async (time, message) => {
        // Schedule a notification at the specified date and time
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time to take your pills!",
                body: message,
                // data: { data: 'goes here' },
            },
            trigger: time,
        });
    };
}

export default NotificationService;
