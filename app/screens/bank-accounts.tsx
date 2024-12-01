import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Card, Button, List, FAB, Portal, Modal, TextInput, IconButton } from 'react-native-paper';
import { router } from 'expo-router';

export default function BankAccounts() {
    const [accounts, setAccounts] = useState([
        { id: '1', bankName: 'HBL', accountNumber: '****1234', accountTitle: 'Ahmed Khan', isPrimary: true },
        { id: '2', bankName: 'UBL', accountNumber: '****5678', accountTitle: 'Ahmed Khan', isPrimary: false },
    ]);
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [newAccount, setNewAccount] = useState({
        bankName: '',
        accountNumber: '',
        accountTitle: '',
    });

    const handleAddAccount = () => {
        const newId = (accounts.length + 1).toString();
        setAccounts([...accounts, { ...newAccount, id: newId, isPrimary: false }]);
        setNewAccount({ bankName: '', accountNumber: '', accountTitle: '' });
        setShowAddAccount(false);
    };

    const setPrimaryAccount = (id) => {
        setAccounts(accounts.map(account => ({
            ...account,
            isPrimary: account.id === id
        })));
    };

    const removeAccount = (id) => {
        setAccounts(accounts.filter(account => account.id !== id));
    };

    const AddAccountModal = () => {
        const [errors, setErrors] = useState({
            bankName: '',
            accountNumber: '',
            accountTitle: '',
        });

        const validateInputs = () => {
            const newErrors = {
                bankName: !tempAccount.bankName ? 'Bank name is required' : '',
                accountNumber: !tempAccount.accountNumber ? 'Account number is required' : '',
                accountTitle: !tempAccount.accountTitle ? 'Account title is required' : '',
            };
            setErrors(newErrors);
            return !Object.values(newErrors).some(error => error);
        };

        const handleAddAccount = () => {
            if (validateInputs()) {
                const newId = (accounts.length + 1).toString();
                const newAccount = {
                    id: newId,
                    bankName: tempAccount.bankName,
                    accountNumber: tempAccount.accountNumber,
                    accountTitle: tempAccount.accountTitle,
                    isPrimary: accounts.length === 0
                };
                setAccounts([...accounts, newAccount]);
                setTempAccount({ bankName: '', accountNumber: '', accountTitle: '' });
                setShowAddAccount(false);
            }
        };

        const [tempAccount, setTempAccount] = useState({
            bankName: '',
            accountNumber: '',
            accountTitle: '',
        });

        const handleInputChange = (key, value) => {
            setTempAccount((prevAccount) => ({
                ...prevAccount,
                [key]: value,
            }));
        };


        return (
            <Modal
                visible={showAddAccount}
                onDismiss={() => setShowAddAccount(false)}
                contentContainerStyle={styles.modalContent}
                dismissable={false}
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <View style={styles.modalHeader}>
                                <Text variant="titleLarge">Add Bank Account</Text>
                                <IconButton icon="close" onPress={() => setShowAddAccount(false)} />
                            </View>

                            {/* <TextInput
                                label="Bank Name"
                                value={tempAccount.bankName}
                                onChangeText={(text) => handleInputChange('bankName', text)}
                                style={styles.input}
                                mode="outlined"
                            />
                            <TextInput
                                label="Account Number"
                                value={tempAccount.accountNumber}
                                onChangeText={(text) => handleInputChange('accountNumber', text)}
                                style={styles.input}
                                mode="outlined"
                                keyboardType="numeric"
                            />
                            <TextInput
                                label="Account Title"
                                value={tempAccount.accountTitle}
                                onChangeText={(text) => handleInputChange('accountTitle', text)}
                                style={styles.input}
                                mode="outlined"
                            /> */}


                            <TextInput
                                label="Bank Name"
                                value={tempAccount.bankName}
                                onChangeText={(text) => {
                                    handleInputChange('bankName', text);
                                    setErrors({ ...errors, bankName: '' });
                                }}
                                style={styles.input}
                                mode="outlined"
                                error={!!errors.bankName}
                                helperText={errors.bankName}
                            />

                            <TextInput
                                label="Account Number"
                                value={tempAccount.accountNumber}
                                onChangeText={(text) => {
                                    handleInputChange('accountNumber', text);
                                    setErrors({ ...errors, accountNumber: '' });
                                }}

                                style={styles.input}
                                mode="outlined"
                                keyboardType="numeric"
                                error={!!errors.accountNumber}
                                helperText={errors.accountNumber}
                            />

                            <TextInput
                                label="Account Title"
                                value={tempAccount.accountTitle}
                                onChangeText={(text) => {
                                    handleInputChange('accountTitle', text);
                                    setErrors({ ...errors, accountTitle: '' });
                                }}
                                style={styles.input}
                                mode="outlined"
                                error={!!errors.accountTitle}
                                helperText={errors.accountTitle}
                            />
                            <Button
                                mode="contained"
                                onPress={handleAddAccount}

                            >
                                Add Account
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Modal >
        );
    };



    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Your Bank Accounts
                        </Text>
                        {accounts.map(account => (
                            <List.Item
                                key={account.id}
                                title={account.bankName}
                                description={`${account.accountTitle}\nAccount Number: ${account.accountNumber}`}
                                left={props => <List.Icon {...props} icon="bank" />}
                                right={props => (
                                    <View style={styles.accountActions}>
                                        {account.isPrimary ? (
                                            <Button mode="contained-tonal" compact>Primary</Button>
                                        ) : (
                                            <>
                                                <IconButton
                                                    icon="star-outline"
                                                    onPress={() => setPrimaryAccount(account.id)}
                                                />
                                                <IconButton
                                                    icon="delete-outline"
                                                    onPress={() => removeAccount(account.id)}
                                                />
                                            </>
                                        )}
                                    </View>
                                )}
                                style={styles.accountItem}
                            />
                        ))}

                    </Card.Content>
                </Card>

                <Card style={styles.infoCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.sectionTitle}>
                            Bank Account Guidelines
                        </Text>
                        <List.Item
                            title="Verified Accounts Only"
                            description="Only add accounts that are registered in your name"
                            left={props => <List.Icon {...props} icon="shield-check" />}
                        />
                        <List.Item
                            title="Primary Account"
                            description="Set a primary account for receiving payments"
                            left={props => <List.Icon {...props} icon="star" />}
                        />
                        <List.Item
                            title="Account Security"
                            description="Your account details are encrypted and secure"
                            left={props => <List.Icon {...props} icon="lock" />}
                        />
                    </Card.Content>
                </Card>
            </ScrollView>

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => setShowAddAccount(true)}
                color="#ffffff"
            />

            <Portal>
                <AddAccountModal />
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 20,
        marginBottom: 30,
    },
    infoCard: {
        margin: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        marginBottom: 16,
    },
    accountItem: {
        paddingVertical: 8,
        backgroundColor: '#fff',
    },
    accountActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ee',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: -240,
        borderRadius: 8,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 16,
    },
});
