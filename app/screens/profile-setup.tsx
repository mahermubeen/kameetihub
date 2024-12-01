import { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetup() {
    const [fullName, setFullName] = useState('');
    const [cnic, setCnic] = useState('');
    const [dob, setDob] = useState('');
    const [income, setIncome] = useState('');
    const [employment, setEmployment] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const employmentOptions = [
        { label: 'Employed', value: 'employed' },
        { label: 'Business', value: 'business' },
        { label: 'Other', value: 'other' },
    ];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        router.push('/(tabs)/dashboard');
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.content}>
                        <Text style={styles.title} variant="headlineMedium">
                            Complete Your Profile
                        </Text>

                        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <View style={styles.imagePlaceholder}>
                                    <Text>Add Photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <TextInput
                            label="Full Name"
                            value={fullName}
                            onChangeText={setFullName}
                            style={styles.input}
                            mode="outlined"
                        />

                        <TextInput
                            label="CNIC Number"
                            value={cnic}
                            onChangeText={setCnic}
                            keyboardType="numeric"
                            style={styles.input}
                            mode="outlined"
                            placeholder="42201-XXXXXXX-X"
                        />

                        <TextInput
                            label="Date of Birth"
                            value={dob}
                            onChangeText={setDob}
                            style={styles.input}
                            mode="outlined"
                            placeholder="DD/MM/YYYY"
                        />

                        <TextInput
                            label="Monthly Income"
                            value={income}
                            onChangeText={setIncome}
                            keyboardType="numeric"
                            style={styles.input}
                            mode="outlined"
                            placeholder="50,000"
                        />

                        <Text style={styles.label}>Employment Status</Text>
                        <SegmentedButtons
                            value={employment}
                            onValueChange={setEmployment}
                            buttons={employmentOptions}
                            style={styles.segmentedButton}
                        />

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.button}
                            buttonColor="#6200ee"
                        >
                            Continue
                        </Button>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    imageContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    input: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#666',
    },
    segmentedButton: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        padding: 5,
    },
});
