import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated, Share, Platform } from 'react-native';
import { Text, Card, Button, List, Snackbar } from 'react-native-paper';
import { router } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function KameetiConfirmation() {
    const [visible, setVisible] = React.useState(false);
    const scaleValue = new Animated.Value(0);
    const kameetiCode = 'KH' + Math.random().toString(36).substr(2, 8).toUpperCase();

    useEffect(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleShare = async () => {
        const message = `Join my Kameeti on KameetiHub!\n\nKameeti Details:\n- Amount: Rs. 100,000\n- Duration: 12 Months\n- Members: 12\n- Payment: Monthly\n\nUse code: ${kameetiCode}\n\nDownload KameetiHub: [App Link]`;

        try {
            await Share.share({
                message,
                title: 'Join KameetiHub',
            });
        } catch (error) {
            console.error(error);
        }
    };

    const copyKameetiCode = async () => {
        await Clipboard.setStringAsync(kameetiCode);
        setVisible(true);
    };

    const handleConfirm = () => {
        router.push('/(tabs)/dashboard');
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Animated.View style={[styles.successIcon, { transform: [{ scale: scaleValue }] }]}>
                    <MaterialCommunityIcons name="check-circle" size={100} color="#6200ee" />
                </Animated.View>

                <Text variant="headlineMedium" style={styles.title}>
                    Kameeti Created Successfully!
                </Text>

                <Card style={styles.codeCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.codeTitle}>Kameeti Code</Text>
                        <View style={styles.codeContainer}>
                            <Text variant="headlineMedium">{kameetiCode}</Text>
                            <Button
                                icon="content-copy"
                                mode="text"
                                onPress={copyKameetiCode}
                            >
                                Copy
                            </Button>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <List.Item
                            title="Total Amount"
                            description="Rs. 100,000"
                            left={props => <List.Icon {...props} icon="cash" />}
                        />
                        <List.Item
                            title="Duration"
                            description="12 Months"
                            left={props => <List.Icon {...props} icon="calendar" />}
                        />
                        <List.Item
                            title="Members"
                            description="12 Members"
                            left={props => <List.Icon {...props} icon="account-group" />}
                        />
                        <List.Item
                            title="Payment Frequency"
                            description="Monthly"
                            left={props => <List.Icon {...props} icon="clock" />}
                        />
                    </Card.Content>
                </Card>

                <Card style={styles.paymentCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.paymentTitle}>
                            Payment Schedule
                        </Text>
                        <View style={styles.paymentRow}>
                            <Text>Per Person Contribution:</Text>
                            <Text variant="titleMedium">Rs. 8,333</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text>First Payment Due:</Text>
                            <Text>15th March 2024</Text>
                        </View>
                        <View style={styles.paymentRow}>
                            <Text>Payment Cycle:</Text>
                            <Text>Every 1st of month</Text>
                        </View>
                    </Card.Content>
                </Card>

                <Card style={styles.inviteCard}>
                    <Card.Content>
                        <Text variant="titleMedium" style={styles.inviteTitle}>
                            Invite Members
                        </Text>
                        <Text style={styles.inviteText}>
                            Share this Kameeti with potential members. They can join using the Kameeti code.
                        </Text>
                        <Button
                            mode="outlined"
                            icon="share"
                            style={styles.shareButton}
                            onPress={handleShare}
                        >
                            Share Invitation
                        </Button>
                    </Card.Content>
                </Card>

                <Button
                    mode="contained"
                    onPress={handleConfirm}
                    style={styles.button}
                    buttonColor="#6200ee"
                >
                    Go to Dashboard
                </Button>
            </ScrollView>

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={2000}
            >
                Kameeti code copied to clipboard!
            </Snackbar>
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
    successIcon: {
        alignSelf: 'center',
        marginVertical: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    codeCard: {
        margin: 16,
        marginTop: 0,
    },
    codeTitle: {
        marginBottom: 8,
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        margin: 16,
        marginTop: 0,
    },
    paymentCard: {
        margin: 16,
        backgroundColor: '#f8f8f8',
    },
    paymentTitle: {
        marginBottom: 12,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 4,
    },
    inviteCard: {
        margin: 16,
    },
    inviteTitle: {
        marginBottom: 8,
    },
    inviteText: {
        marginBottom: 12,
        color: '#666',
    },
    shareButton: {
        marginTop: 8,
    },
    button: {
        margin: 16,
        marginTop: 0,
        padding: 5,
    },
});
