import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, RadioButton, TextInput } from 'react-native-paper';
import { router } from 'expo-router';

export default function Payment() {
    const [paymentMethod, setPaymentMethod] = useState('bank');

    const handlePayment = () => {
        // Payment processing logic here
        router.push('/screens/payment-success');
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.amountCard}>
                <Card.Content>
                    <Text variant="titleMedium">Payment Amount</Text>
                    <Text variant="headlineLarge">Rs. 5,000</Text>
                    <Text variant="bodyMedium">Due Date: 15th March</Text>
                </Card.Content>
            </Card>

            <Card style={styles.methodCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>
                        Select Payment Method
                    </Text>

                    <RadioButton.Group onValueChange={value => setPaymentMethod(value)} value={paymentMethod}>
                        <View style={styles.methodItem}>
                            <RadioButton.Item
                                label="Bank Transfer"
                                value="bank"
                                position="leading"
                            />
                        </View>
                        <View style={styles.methodItem}>
                            <RadioButton.Item
                                label="Credit/Debit Card"
                                value="card"
                                position="leading"
                            />
                        </View>
                        <View style={styles.methodItem}>
                            <RadioButton.Item
                                label="EasyPaisa/JazzCash"
                                value="mobile"
                                position="leading"
                            />
                        </View>
                    </RadioButton.Group>
                </Card.Content>
            </Card>

            <Button
                mode="contained"
                onPress={handlePayment}
                style={styles.payButton}
                buttonColor="#6200ee"
            >
                Proceed to Pay
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        marginTop: 20,
        marginBottom: 30,
    },
    amountCard: {
        marginBottom: 16,
    },
    methodCard: {
        marginBottom: 16,
    },
    sectionTitle: {
        marginBottom: 16,
    },
    methodItem: {
        marginVertical: 4,
    },
    payButton: {
        marginTop: 16,
        padding: 5,
    },
});
