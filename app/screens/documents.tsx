import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Button, IconButton } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

export default function Documents() {
    const documents = [
        { id: '1', name: 'CNIC Front', status: 'verified', date: '15 Mar 2024' },
        { id: '2', name: 'CNIC Back', status: 'verified', date: '15 Mar 2024' },
        { id: '3', name: 'Utility Bill', status: 'pending', date: '16 Mar 2024' },
    ];

    const handleUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*', 'application/pdf'],
            });
            if (result.type === 'success') {
                // Handle document upload
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>My Documents</Text>
                    {documents.map(doc => (
                        <List.Item
                            key={doc.id}
                            title={doc.name}
                            description={`Uploaded: ${doc.date}`}
                            left={props => <List.Icon {...props} icon="file-document" />}
                            right={props => (
                                <View style={styles.statusContainer}>
                                    <Text style={[
                                        styles.status,
                                        { color: doc.status === 'verified' ? '#4CAF50' : '#FFC107' }
                                    ]}>
                                        {doc.status}
                                    </Text>
                                </View>
                            )}
                        />
                    ))}
                    <Button
                        mode="contained"
                        onPress={handleUpload}
                        style={styles.uploadButton}
                        icon="upload"
                    >
                        Upload New Document
                    </Button>
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
    card: {
        margin: 16,
    },
    title: {
        marginBottom: 16,
    },
    statusContainer: {
        justifyContent: 'center',
    },
    status: {
        textTransform: 'capitalize',
    },
    uploadButton: {
        marginTop: 16,
    },
});
