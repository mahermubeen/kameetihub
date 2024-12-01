import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List, FAB, Portal, Modal } from 'react-native-paper';
import { router } from 'expo-router';

export default function Wallet() {
    const [addMoneyVisible, setAddMoneyVisible] = useState(false);

    const paymentMethods = [
        { id: '1', type: 'bank', name: 'HBL Account', number: '****1234' },
        { id: '2', type: 'card', name: 'Debit Card', number: '****5678' }
    ];

    const recentTransactions = [
        { id: '1', type: 'credit', amount: '50,000', date: '15 Mar 2024', description: 'Added to wallet' },
        { id: '2', type: 'debit', amount: '5,000', date: '1 Mar 2024', description: 'Kameeti payment' }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={styles.balanceCard}>
                    <Card.Content>
                        <Text variant="titleMedium">Available Balance</Text>
                        <Text variant="headlineLarge" style={styles.balance}>
                            Rs. 45,000
                        </Text>
                        <View style={styles.actionButtons}>
                            <Button
                                mode="contained"
                                onPress={() => setAddMoneyVisible(true)}
                                style={[styles.actionButton, { marginRight: 8 }]}
                            >
                                Add Money
                            </Button>
                            <Button
                                mode="outlined"
                                onPress={() => router.push('/withdraw')}
                                style={styles.actionButton}
                            >
                                Withdraw
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.sectionCard}>
                    <Card.Content>
                        <View style={styles.sectionHeader}>
                            <Text variant="titleMedium">Payment Methods</Text>
                            <Button
                                mode="text"
                                onPress={() => { }}
                                textColor="#6200ee"
                            >
                                Add New
                            </Button>
                        </View>
                        {paymentMethods.map(method => (
                            <List.Item
                                key={method.id}
                                title={method.name}
                                description={method.number}
                                left={props => (
                                    <List.Icon
                                        {...props}
                                        icon={method.type === 'bank' ? 'bank' : 'credit-card'}
                                    />
                                )}
                                right={props => <List.Icon {...props} icon="chevron-right" />}
                            />
                        ))}
                    </Card.Content>
                </Card>

                <Card style={styles.sectionCard}>
                    <Card.Content>
                        <View style={styles.sectionHeader}>
                            <Text variant="titleMedium">Recent Transactions</Text>
                            <Button
                                mode="text"
                                onPress={() => router.push('/screens/transactions')}
                                textColor="#6200ee"
                            >
                                View All
                            </Button>
                        </View>
                        {recentTransactions.map(transaction => (
                            <List.Item
                                key={transaction.id}
                                title={`Rs. ${transaction.amount}`}
                                description={transaction.description}
                                right={() => (
                                    <Text
                                        style={[
                                            styles.transactionAmount,
                                            { color: transaction.type === 'credit' ? '#40A040' : '#FF4040' }
                                        ]}
                                    >
                                        {transaction.type === 'credit' ? '+' : '-'} Rs. {transaction.amount}
                                    </Text>
                                )}
                            />
                        ))}
                    </Card.Content>
                </Card>
            </ScrollView>

            <Portal>
                <Modal
                    visible={addMoneyVisible}
                    onDismiss={() => setAddMoneyVisible(false)}
                    contentContainerStyle={styles.modalContent}
                >
                    <Text variant="titleLarge" style={styles.modalTitle}>Add Money to Wallet</Text>
                    {paymentMethods.map(method => (
                        <List.Item
                            key={method.id}
                            title={method.name}
                            description={method.number}
                            left={props => (
                                <List.Icon
                                    {...props}
                                    icon={method.type === 'bank' ? 'bank' : 'credit-card'}
                                />
                            )}
                            onPress={() => {
                                setAddMoneyVisible(false);
                                router.push('/add-money');
                            }}
                            style={styles.modalItem}
                        />
                    ))}
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 20,
        marginBottom: 45,
    },
    balanceCard: {
        margin: 16,
        backgroundColor: '#fff',
    },
    balance: {
        marginVertical: 8,
        color: '#6200ee',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 16,
    },
    actionButton: {
        flex: 1,
    },
    sectionCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    transactionAmount: {
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 20,
    },
    modalItem: {
        paddingVertical: 8,
    }
});
