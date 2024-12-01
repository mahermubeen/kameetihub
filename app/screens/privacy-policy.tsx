import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function PrivacyPolicy() {
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Privacy Policy</Text>
                    <Text variant="bodyMedium" style={styles.section}>
                        Last updated: March 15, 2024
                    </Text>
                    <Text variant="bodyMedium" style={styles.paragraph}>
                        KameetiHub is committed to protecting your privacy...
                    </Text>
                    {/* Add more policy sections */}
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
    section: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    paragraph: {
        marginBottom: 16,
        lineHeight: 24,
    },
});
