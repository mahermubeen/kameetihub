import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, Searchbar } from 'react-native-paper';

export default function HelpCenter() {
    const faqs = [
        { id: '1', question: 'What is Kameeti?', answer: 'Kameeti is a traditional rotating savings system...' },
        { id: '2', question: 'How to join a Kameeti?', answer: 'You can join by selecting an available Kameeti...' },
        { id: '3', question: 'Is my money safe?', answer: 'Yes, we use bank-grade security measures...' },
    ];

    return (
        <ScrollView style={styles.container}>
            <Searchbar
                placeholder="Search FAQs"
                style={styles.searchBar}
            />
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Frequently Asked Questions</Text>
                    {faqs.map(faq => (
                        <List.Accordion
                            key={faq.id}
                            title={faq.question}
                            style={styles.faqItem}
                        >
                            <Text style={styles.answer}>{faq.answer}</Text>
                        </List.Accordion>
                    ))}
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
    searchBar: {
        margin: 16,
        elevation: 2,
    },
    card: {
        margin: 16,
    },
    title: {
        marginBottom: 16,
    },
    faqItem: {
        backgroundColor: '#fff',
    },
    answer: {
        padding: 16,
        color: '#666',
    },
});
