import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card, List, Portal, Modal } from 'react-native-paper';
import { router, useLocalSearchParams } from 'expo-router';

export default function JoinKameeti() {
  const { id } = useLocalSearchParams();
  const [kameetiCode, setKameetiCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const kameetiDetails = {
    amount: '100,000',
    duration: '12 months',
    members: '10/12',
    frequency: 'Monthly',
    nextDraw: '15th March 2024',
    contribution: '8,333'
  };

  const handleVerifyCode = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 1500);
  };

  const handleJoin = () => {
    setModalVisible(false);
    router.push({
      pathname: '/screens/payment',
      params: { type: 'registration', amount: kameetiDetails.contribution }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title} variant="headlineSmall">
          Join Existing Kameeti
        </Text>

        <Card style={styles.inputCard}>
          <Card.Content>
            <TextInput
              label="Enter Kameeti Code"
              value={kameetiCode}
              onChangeText={setKameetiCode}
              style={styles.input}
              mode="outlined"
              placeholder="e.g., KH12345678"
              autoCapitalize="characters"
              maxLength={8}
            />
            <Button
              mode="contained"
              onPress={handleVerifyCode}
              loading={loading}
              contentStyle={[
                styles.button,
                { backgroundColor: kameetiCode.length === 8 ? '#6200ee' : '#e0e0e0' },
              ]}
              disabled={kameetiCode.length !== 8}
            >
              Verify Code
            </Button>
          </Card.Content>
        </Card>

        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={styles.modalContent}
          >
            <Text variant="titleLarge" style={styles.modalTitle}>
              Kameeti Details
            </Text>

            <List.Item
              title="Total Amount"
              description={`Rs. ${kameetiDetails.amount}`}
              left={props => <List.Icon {...props} icon="cash" />}
            />
            <List.Item
              title="Duration"
              description={kameetiDetails.duration}
              left={props => <List.Icon {...props} icon="calendar" />}
            />
            <List.Item
              title="Members"
              description={kameetiDetails.members}
              left={props => <List.Icon {...props} icon="account-group" />}
            />
            <List.Item
              title="Payment Frequency"
              description={kameetiDetails.frequency}
              left={props => <List.Icon {...props} icon="clock" />}
            />
            <List.Item
              title="Next Draw"
              description={kameetiDetails.nextDraw}
              left={props => <List.Icon {...props} icon="calendar-clock" />}
            />
            <List.Item
              title="Monthly Contribution"
              description={`Rs. ${kameetiDetails.contribution}`}
              left={props => <List.Icon {...props} icon="credit-card" />}
            />

            <View style={styles.modalButtons}>
              <Button
                mode="outlined"
                onPress={() => setModalVisible(false)}
                style={styles.modalButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleJoin}
                style={styles.modalButton}
              >
                Join Now
              </Button>
            </View>
          </Modal>
        </Portal>
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
  inputCard: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  verifyButton: {
    marginTop: 8,
    backgroundColor: "#6200ee"
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  buttonEnabled: {
    backgroundColor: 'red',
    color: 'red'
  },
  buttonDisabled: {
    backgroundColor: 'yelow',
    color: 'yellow'

  },
  button: {
    padding: 5,
  },
});
