import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, List, Switch, Button, Avatar, Divider } from 'react-native-paper';
import { router } from 'expo-router';

export default function Profile() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [biometricEnabled, setBiometricEnabled] = useState(false);

    const handleLogout = () => {
        router.replace('/onboarding');
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.profileCard}>
                <Card.Content style={styles.profileHeader}>
                    <Avatar.Image
                        size={80}
                        source={require('../../assets/images/user-img.jpeg')}
                    />
                    <View style={styles.profileInfo}>
                        <Text variant="headlineSmall">Ahmed Khan</Text>
                        <Text variant="bodyMedium">+92 300 1234567</Text>
                        <Text variant="bodySmall">Credit Score: 750</Text>
                    </View>
                </Card.Content>
            </Card>

            <Card style={styles.sectionCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Account Settings</Text>
                    <List.Item
                        title="Personal Information"
                        left={props => <List.Icon {...props} icon="account" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => router.push('/screens/personal-information')}
                    />
                    <List.Item
                        title="Bank Accounts"
                        left={props => <List.Icon {...props} icon="bank" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => router.push('/screens/bank-accounts')}
                    />
                    <List.Item
                        title="Documents"
                        left={props => <List.Icon {...props} icon="file-document" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => router.push('/screens/documents')}
                    />
                </Card.Content>
            </Card>

            <Card style={styles.sectionCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Preferences</Text>
                    <List.Item
                        title="Notifications"
                        left={props => <List.Icon {...props} icon="bell" />}
                        right={() => (
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                            />
                        )}
                    />
                    <List.Item
                        title="Biometric Login"
                        left={props => <List.Icon {...props} icon="fingerprint" />}
                        right={() => (
                            <Switch
                                value={biometricEnabled}
                                onValueChange={setBiometricEnabled}
                            />
                        )}
                    />
                    <List.Item
                        title="Language"
                        description="English"
                        left={props => <List.Icon {...props} icon="translate" />}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => router.push('/screens/language')}
                    />
                </Card.Content>
            </Card>

            <Card style={styles.sectionCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Support</Text>
                    <List.Item
                        title="Help Center"
                        left={props => <List.Icon {...props} icon="help-circle" />}
                        onPress={() => router.push('/screens/help-center')}
                    />
                    <List.Item
                        title="Contact Us"
                        left={props => <List.Icon {...props} icon="message" />}
                        onPress={() => router.push('/screens/contact-us')}
                    />
                    <List.Item
                        title="Privacy Policy"
                        left={props => <List.Icon {...props} icon="shield" />}
                        onPress={() => router.push('/screens/privacy-policy')}
                    />
                </Card.Content>
            </Card>

            <Button
                mode="outlined"
                onPress={handleLogout}
                style={styles.logoutButton}
                textColor="#FF4040"
            >
                Logout
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 20,
        marginBottom: 30,
    },
    profileCard: {
        margin: 16,
        backgroundColor: '#fff',
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 16,
    },
    sectionCard: {
        marginHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        marginBottom: 8,
        color: '#6200ee',
    },
    logoutButton: {
        margin: 16,
        marginBottom: 32,
        borderColor: '#FF4040',
    }
});
