import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, RadioButton, List } from 'react-native-paper';
import { useLanguage } from '@/components/language-context';

export default function Language() {
    const { language, setLanguage } = useLanguage();

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>Select Language</Text>
                    <RadioButton.Group onValueChange={value => setLanguage(value)} value={language}>
                        <TouchableOpacity onPress={() => setLanguage('english')}>
                            <List.Item
                                title="English"
                                left={props => <RadioButton {...props} value="english" />}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setLanguage('urdu')}>
                            <List.Item
                                title="اردو"
                                left={props => <RadioButton {...props} value="urdu" />}
                            />
                        </TouchableOpacity>
                    </RadioButton.Group>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        marginBottom: 16,
    },
    title: {
        marginBottom: 16,
    },
});
