import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, Card, Chip, Divider, Searchbar, Button, Menu, Portal, Modal } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const transactions = [
    {
        id: '1',
        type: 'payment',
        amount: '5,000',
        date: '15 Mar 2024',
        status: 'completed',
        kameeti: 'Gold Plan'
    },
    {
        id: '2',
        type: 'collection',
        amount: '50,000',
        date: '1 Mar 2024',
        status: 'completed',
        kameeti: 'Gold Plan'
    },
    {
        id: '3',
        type: 'payment',
        amount: '5,000',
        date: '15 Feb 2024',
        status: 'completed',
        kameeti: 'Gold Plan'
    }
];

export default function Transactions() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [menuVisible, setMenuVisible] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selectingStartDate, setSelectingStartDate] = useState(true);
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (filterType === 'all') {
            setFilteredTransactions(transactions);
        } else {
            const filtered = transactions.filter(tx => tx.type === filterType);
            setFilteredTransactions(filtered);
        }
    }, [filterType]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            setFilteredTransactions(transactions);
            setFilterType('all');
            setSearchQuery('');
        }, 1500);
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        const filtered = transactions.filter(transaction =>
            transaction.amount.includes(query) ||
            transaction.kameeti.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTransactions(filtered);
    };

    const filterByDateRange = (start, end) => {
        const filtered = transactions.filter(transaction => {
            const txDate = new Date(transaction.date);
            const txTimestamp = txDate.getTime();
            return txTimestamp >= start.getTime() && txTimestamp <= end.getTime();
        });
        setFilteredTransactions(filtered);
    };

    const filterLast = (days) => {
        const today = new Date();
        const pastDate = new Date();
        pastDate.setDate(today.getDate() - days);
        filterByDateRange(pastDate, today);
        setMenuVisible(false);
    };

    const handleDateSelect = (date) => {
        if (selectingStartDate) {
            setStartDate(date);
            setSelectingStartDate(false);
        } else {
            setEndDate(date);
            setDatePickerVisible(false);
            filterByDateRange(startDate, date);
        }
    };

    const renderTransaction = ({ item }) => (
        <Card style={styles.transactionCard}>
            <Card.Content>
                <View style={styles.transactionHeader}>
                    <View>
                        <Text variant="titleMedium">
                            Rs. {item.amount}
                        </Text>
                        <Text variant="bodySmall" style={styles.date}>
                            {item.date}
                        </Text>
                    </View>
                    <Chip
                        mode="flat"
                        style={[
                            styles.statusChip,
                            { backgroundColor: item.type === 'payment' ? '#FFE0E0' : '#E0FFE0' }
                        ]}
                    >
                        {item.type === 'payment' ? 'Paid' : 'Received'}
                    </Chip>
                </View>
                <Divider style={styles.divider} />
                <View style={styles.transactionFooter}>
                    <Text variant="bodyMedium">{item.kameeti}</Text>
                    <Text
                        variant="bodySmall"
                        style={[
                            styles.type,
                            { color: item.type === 'payment' ? '#FF4040' : '#40A040' }
                        ]}
                    >
                        {item.type === 'payment' ? '-' : '+'} Rs. {item.amount}
                    </Text>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Searchbar
                        placeholder="Search transactions"
                        onChangeText={handleSearch}
                        value={searchQuery}
                        style={styles.searchBar}
                    />

                    <View style={styles.filterContainer}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.chipScrollView}
                        >
                            <Chip
                                selected={filterType === 'all'}
                                onPress={() => setFilterType('all')}
                                style={styles.filterChip}
                                selectedColor="#6200ee"
                                showSelectedOverlay
                            >
                                All
                            </Chip>
                            <Chip
                                selected={filterType === 'payment'}
                                onPress={() => setFilterType('payment')}
                                style={styles.filterChip}
                                selectedColor="#6200ee"
                                showSelectedOverlay
                            >
                                Payments
                            </Chip>
                            <Chip
                                selected={filterType === 'collection'}
                                onPress={() => setFilterType('collection')}
                                style={styles.filterChip}
                                selectedColor="#6200ee"
                                showSelectedOverlay
                            >
                                Collections
                            </Chip>

                            <Button
                                icon="calendar"
                                onPress={() => setMenuVisible(true)}
                                mode="outlined"
                                style={styles.dateButton}
                            >
                                Date Range
                            </Button>
                        </ScrollView>
                    </View>

                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={<View />}
                    >
                        <Menu.Item onPress={() => filterLast(7)} title="Last 7 days" />
                        <Menu.Item onPress={() => filterLast(30)} title="Last 30 days" />
                        <Menu.Item onPress={() => filterLast(90)} title="Last 3 months" />
                        <Menu.Item
                            onPress={() => {
                                setMenuVisible(false);
                                setDatePickerVisible(true);
                                setSelectingStartDate(true);
                            }}
                            title="Custom range"
                        />
                    </Menu>

                    <Portal>
                        <Modal
                            visible={datePickerVisible}
                            onDismiss={() => setDatePickerVisible(false)}
                            contentContainerStyle={styles.modalContent}
                        >
                            <Text variant="titleMedium" style={styles.modalTitle}>
                                {selectingStartDate ? 'Select Start Date' : 'Select End Date'}
                            </Text>
                            <DatePicker
                                date={selectingStartDate ? startDate : endDate}
                                onDateChange={handleDateSelect}
                                mode="date"
                            />
                        </Modal>
                    </Portal>

                    <FlatList
                        data={filteredTransactions}
                        renderItem={renderTransaction}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </TouchableWithoutFeedback>
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
    searchBar: {
        margin: 16,
        elevation: 2,
    },
    filterContainer: {
        marginBottom: 16,
    },
    chipScrollView: {
        paddingHorizontal: 16,
    },
    filterChip: {
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    dateButton: {
        marginLeft: 8,
        backgroundColor: '#fff',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    transactionCard: {
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: '#666',
        marginTop: 4,
    },
    statusChip: {
        height: 30,
    },
    divider: {
        marginVertical: 12,
    },
    transactionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    type: {
        fontWeight: 'bold',
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
});
