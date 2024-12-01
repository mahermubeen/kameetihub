import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Text, TextInput, Button, Avatar, Card, SegmentedButtons } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

export default function PersonalInformation() {
    const [profileData, setProfileData] = useState({
        fullName: 'Ahmed Khan',
        email: 'ahmed.khan@example.com',
        phone: '+92 300 1234567',
        cnic: '42201-1234567-1',
        dob: '15-03-1990',
        address: 'House 123, Street 4, Karachi',
        occupation: 'Business',
        monthlyIncome: '100,000',
    });
    const [profileImage, setProfileImage] = useState('../../assets/images/user-img.jpeg');
    const [isEditing, setIsEditing] = useState(false);

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

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save the changes to your backend
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.profileCard}>
                <Card.Content style={styles.profileHeader}>
                    <TouchableOpacity onPress={pickImage} disabled={!isEditing}>
                        <Avatar.Image
                            size={100}
                            source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
                        />
                        {isEditing && (
                            <Text style={styles.changePhotoText}>Change Photo</Text>
                        )}
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            <Card style={styles.infoCard}>
                <Card.Content>
                    <View style={styles.headerRow}>
                        <Text variant="titleLarge">Personal Details</Text>
                        <Button
                            mode={isEditing ? "contained" : "outlined"}
                            onPress={() => isEditing ? handleSave() : setIsEditing(true)}
                            buttonColor={isEditing ? '#6200ee' : undefined}
                            textColor={isEditing ? 'red' : '#6200ee'}
                        >
                            {isEditing ? "Save" : "Edit"}
                        </Button>
                    </View>

                    <TextInput
                        label="Full Name"
                        value={profileData.fullName}
                        onChangeText={(text) => setProfileData({ ...profileData, fullName: text })}
                        style={styles.input}
                        disabled={!isEditing}
                    />
                    <TextInput
                        label="Email"
                        value={profileData.email}
                        onChangeText={(text) => setProfileData({ ...profileData, email: text })}
                        style={styles.input}
                        disabled={!isEditing}
                        keyboardType="email-address"
                    />
                    <TextInput
                        label="Phone Number"
                        value={profileData.phone}
                        onChangeText={(text) => setProfileData({ ...profileData, phone: text })}
                        style={styles.input}
                        disabled={!isEditing}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        label="CNIC"
                        value={profileData.cnic}
                        onChangeText={(text) => setProfileData({ ...profileData, cnic: text })}
                        style={styles.input}
                        disabled={!isEditing}
                    />
                    <TextInput
                        label="Date of Birth"
                        value={profileData.dob}
                        onChangeText={(text) => setProfileData({ ...profileData, dob: text })}
                        style={styles.input}
                        disabled={!isEditing}
                    />
                    <TextInput
                        label="Address"
                        value={profileData.address}
                        onChangeText={(text) => setProfileData({ ...profileData, address: text })}
                        style={styles.input}
                        disabled={!isEditing}
                        multiline
                    />

                    <Text style={styles.sectionTitle}>Employment Details</Text>

                    <SegmentedButtons
                        value={profileData.occupation}
                        onValueChange={value => setProfileData({ ...profileData, occupation: value })}
                        buttons={employmentOptions}
                        disabled={!isEditing}
                        style={styles.segmentedButton}
                    />

                    <TextInput
                        label="Monthly Income"
                        value={profileData.monthlyIncome}
                        onChangeText={(text) => setProfileData({ ...profileData, monthlyIncome: text })}
                        style={styles.input}
                        disabled={!isEditing}
                        keyboardType="numeric"
                        left={<TextInput.Affix text="Rs." />}
                    />
                </Card.Content>
            </Card>
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
    changePhotoText: {
        marginTop: 8,
        color: '#6200ee',
        textAlign: 'center',
    },
    infoCard: {
        margin: 16,
        backgroundColor: '#fff',
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 8,
    },
    segmentedButton: {
        marginBottom: 16,
    }
});
