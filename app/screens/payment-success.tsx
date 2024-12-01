import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentSuccess() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <MaterialCommunityIcons
                    name="check-circle"
                    size={100}
                    color="#6200ee"
                />
                <Text variant="headlineMedium" style={styles.title}>
                    Payment Successful!
                </Text>
                <Text variant="bodyLarge" style={styles.amount}>
                    Rs. 5,000
                </Text>
                <Text variant="bodyMedium" style={styles.details}>
                    Transaction ID: KH78945612
                </Text>
                <Text variant="bodyMedium" style={styles.details}>
                    15th March, 2024
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => router.push('/(tabs)/dashboard')}
                    style={styles.button}
                    buttonColor="#6200ee"
                >
                    Back to Home
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => router.push('/screens/transactions')}
                    style={styles.button}
                >
                    View Transactions
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
    },
    amount: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    details: {
        color: '#666',
        marginBottom: 5,
    },
    buttonContainer: {
        paddingBottom: 20,
    },
    button: {
        marginVertical: 5,
        padding: 5,
    },
});
