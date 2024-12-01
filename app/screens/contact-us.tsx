import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Card, Button, List } from 'react-native-paper';

export default function ContactUs() {
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Contact Us</Text>
                    <List.Item
                        title="Email"
                        description="support@kameetihub.com"
                        left={props => <List.Icon {...props} icon="email" />}
                        onPress={() => Linking.openURL('mailto:support@kameetihub.com')}
                    />
                    <List.Item
                        title="Phone"
                        description="+92 300 1234567"
                        left={props => <List.Icon {...props} icon="phone" />}
                        onPress={() => Linking.openURL('tel:+923001234567')}
                    />
                    <List.Item
                        title="WhatsApp"
                        description="Message us on WhatsApp"
                        left={props => <List.Icon {...props} icon="whatsapp" />}
                        onPress={() => Linking.openURL('whatsapp://send?phone=+923001234567')}
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
    card: {
        margin: 16,
    },
    title: {
        marginBottom: 16,
    },
});
