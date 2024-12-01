import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Text, TextInput, Button, Appbar } from 'react-native-paper';
import { router } from 'expo-router';

export default function PhoneVerification() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);

    const handleSendOtp = () => {
        setShowOtp(true);
    };

    const handleVerifyOtp = () => {
        router.push('/screens/profile-setup');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            {showOtp && (
                <Appbar.Header style={styles.header}>
                    <Appbar.BackAction onPress={() => setShowOtp(false)} />
                </Appbar.Header>
            )}

            <View style={styles.content}>
                <Text style={styles.title} variant="headlineMedium">
                    Verify Your Number
                </Text>

                {!showOtp ? (
                    <>
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCodeContainer}>
                                <Image
                                    source={{ uri: 'https://flagcdn.com/w40/pk.png' }}
                                    style={styles.flag}
                                />
                                <Text style={styles.countryCode}>+92</Text>
                            </View>
                            <TextInput
                                label="Phone Number"
                                value={phoneNumber}
                                maxLength={10}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                                style={styles.phoneInput}
                                mode="outlined"
                                placeholder="3XX XXXXXXX"
                            />
                        </View>
                        <Button
                            mode="contained"
                            onPress={handleSendOtp}
                            contentStyle={[
                                styles.button,
                                { backgroundColor: phoneNumber.length === 10 ? '#6200ee' : '#e0e0e0' },
                            ]}
                            disabled={phoneNumber.length !== 10}
                        >
                            Send OTP
                        </Button>
                    </>
                ) : (
                    <>
                        <Text style={styles.subtitle}>
                            Enter the code sent to +92{phoneNumber}
                        </Text>
                        <TextInput
                            label="OTP Code"
                            value={otp}
                            onChangeText={setOtp}
                            keyboardType="number-pad"
                            style={styles.input}
                            mode="outlined"
                            maxLength={6}
                        />
                        <Button
                            mode="contained"
                            onPress={handleVerifyOtp}
                            contentStyle={[
                                styles.button,
                                { backgroundColor: otp.length === 6 ? '#6200ee' : '#e0e0e0' },
                            ]}
                            disabled={otp.length !== 6}
                        >
                            Verify OTP
                        </Button>
                    </>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    header: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginRight: 10,
        marginTop: 6,
        height: 52,
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 5,
    },
    countryCode: {
        fontSize: 16,
        fontWeight: '500',
    },
    phoneInput: {
        flex: 1,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    input: {
        marginBottom: 20,
    },
    button: {
        padding: 5,
    },
});
