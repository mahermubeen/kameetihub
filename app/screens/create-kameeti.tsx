import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, SegmentedButtons, Checkbox, Card } from 'react-native-paper';
import { router } from 'expo-router';

export default function CreateKameeti() {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('12');
  const [members, setMembers] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const durationOptions = [
    { label: '3 Months', value: '3' },
    { label: '6 Months', value: '6' },
    { label: '12 Months', value: '12' },
  ];

  const frequencyOptions = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Bi-weekly', value: 'biweekly' },
    { label: 'Weekly', value: 'weekly' },
  ];

  const handleSubmit = () => {
    // Validation checks
    if (!amount || !members || !termsAccepted) {
      return;
    }

    router.push('/screens/kameeti-confirmation');
  };

  const calculateInstallment = () => {
    if (!amount || !members) return 0;
    return (parseFloat(amount) / parseInt(members)).toFixed(2);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text variant="headlineMedium" style={styles.title}>
          Create New Kameeti
        </Text>

        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Total Kameeti Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              placeholder="e.g., 100000"
              left={<TextInput.Affix text="Rs." />}
            />

            <Text style={styles.label}>Duration</Text>
            <SegmentedButtons
              value={duration}
              onValueChange={setDuration}
              buttons={durationOptions}
              style={styles.segmentedButton}
            />

            <TextInput
              label="Number of Members"
              value={members}
              onChangeText={setMembers}
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              placeholder="e.g., 12"
            />

            <Text style={styles.label}>Payment Frequency</Text>
            <SegmentedButtons
              value={frequency}
              onValueChange={setFrequency}
              buttons={frequencyOptions}
              style={styles.segmentedButton}
            />
          </Card.Content>
        </Card>

        <Card style={styles.summaryCard}>
          <Card.Content>
            <Text variant="titleMedium">Payment Summary</Text>
            <View style={styles.summaryItem}>
              <Text>Per Person Contribution:</Text>
              <Text variant="titleMedium">Rs. {calculateInstallment()}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Total Duration:</Text>
              <Text>{duration} Months</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text>Payment Frequency:</Text>
              <Text style={styles.capitalize}>{frequency}</Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.termsContainer}>
          <Checkbox.Item
            label="I agree to the terms and conditions"
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => setTermsAccepted(!termsAccepted)}
            position="leading"
          />
          <Button
            mode="text"
            onPress={() => router.push('/screens/privacy-policy')}
            style={styles.termsButton}
          >
            View Terms
          </Button>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          buttonColor="#6200ee"
          disabled={!amount || !members || !termsAccepted}
        >
          Create Kameeti
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
    marginBottom: 30,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    color: '#666',
  },
  segmentedButton: {
    marginBottom: 16,
  },
  summaryCard: {
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsButton: {
    marginLeft: 'auto',
  },
  button: {
    marginBottom: 32,
    padding: 5,
  },
});
