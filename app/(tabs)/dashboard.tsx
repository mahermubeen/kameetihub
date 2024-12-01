import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Card, Button, Avatar, IconButton, Modal, TextInput, Chip, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { useLanguage } from '../../components/language-context';


const availableKameetis = [
    { id: '1', amount: '100,000', duration: '12 months', members: '10/12' },
    { id: '2', amount: '50,000', duration: '6 months', members: '8/10' },
    { id: '3', amount: '25,000', duration: '3 months', members: '5/6' },
];

export default function Dashboard() {
    const [refreshing, setRefreshing] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [tempFilters, setTempFilters] = useState({
        amount: '',
        duration: '',
        totalMembers: '',
        membersLeft: '',
    });

    const [searchFilters, setSearchFilters] = useState({
        amount: '',
        duration: '',
        totalMembers: '',
        membersLeft: '',
    });

    const { t } = useLanguage();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    const handlePayment = () => {
        router.push('/screens/payment');
    };

    const handleJoinKameeti = (kameetiId) => {
        router.push({
            pathname: '/screens/join-kameeti',
            params: { id: kameetiId }
        });
    };

    const navigateToQuickAction = (action) => {
        switch (action) {
            case 'payments':
                router.push('/(tabs)/payments-history');
                break;
            case 'history':
                router.push('/screens/transactions');
                break;
            case 'profile':
                router.push('/(tabs)/profile');
                break;
        }
    };

    const renderKameetiItem = ({ item }) => (
        <Card style={styles.kameetiCard}>
            <Card.Content>
                <Text variant="titleMedium">Rs. {item.amount}</Text>
                <Text variant="bodyMedium">{item.duration}</Text>
                <Text variant="bodySmall">Members: {item.members}</Text>
                <Button
                    mode="outlined"
                    style={styles.joinButton}
                    onPress={() => handleJoinKameeti(item.id)}
                >
                    Join Now
                </Button>
            </Card.Content>
        </Card>
    );

    const filterKameetis = () => {
        return availableKameetis.filter(kameeti => {
            const matchAmount = !searchFilters.amount || kameeti.amount.includes(searchFilters.amount);
            const matchDuration = !searchFilters.duration || kameeti.duration.includes(searchFilters.duration);

            const [current, total] = kameeti.members.split('/');
            const membersLeft = parseInt(total) - parseInt(current);

            const matchTotalMembers = !searchFilters.totalMembers || total === searchFilters.totalMembers;
            const matchMembersLeft = !searchFilters.membersLeft || membersLeft.toString() === searchFilters.membersLeft;

            return matchAmount && matchDuration && matchTotalMembers && matchMembersLeft;
        });
    };


    const SearchModal = () => {
        const [tempFilters, setTempFilters] = useState({
            amount: '',
            duration: '',
            totalMembers: '',
            membersLeft: '',
        });

        const handleInputChange = (key, value) => {
            setTempFilters((prevFilters) => ({
                ...prevFilters,
                [key]: value,
            }));
        };

        const applyFilters = () => {
            // Set the filters and close the modal
            setSearchFilters(tempFilters);
            setShowSearch(false);
        };

        return (
            <Modal
                visible={showSearch}
                onDismiss={() => setShowSearch(false)}
                contentContainerStyle={[styles.modalContent]}
                dismissable={false}   // This prevents closing on outside click
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <View style={styles.modalHeader}>
                                <Text variant="titleLarge">Search Kameetis</Text>
                                <IconButton icon="close" onPress={() => setShowSearch(false)} />
                            </View>

                            <TextInput
                                label="Amount (Rs.)"
                                value={tempFilters.amount}
                                onChangeText={(value) => handleInputChange('amount', value)}
                                keyboardType="numeric"
                                style={styles.searchInput}
                                right={
                                    tempFilters.amount ? (
                                        <TextInput.Icon
                                            icon="close"
                                            onPress={() => handleInputChange('amount', '')}
                                        />
                                    ) : null
                                }
                            />

                            <TextInput
                                label="Duration (months)"
                                value={tempFilters.duration}
                                onChangeText={(value) => handleInputChange('duration', value)}
                                keyboardType="numeric"
                                style={styles.searchInput}
                                right={
                                    tempFilters.duration ? (
                                        <TextInput.Icon
                                            icon="close"
                                            onPress={() => handleInputChange('duration', '')}
                                        />
                                    ) : null
                                }
                            />

                            <TextInput
                                label="Total Members"
                                value={tempFilters.totalMembers}
                                onChangeText={(value) => handleInputChange('totalMembers', value)}
                                keyboardType="numeric"
                                style={styles.searchInput}
                                right={
                                    tempFilters.totalMembers ? (
                                        <TextInput.Icon
                                            icon="close"
                                            onPress={() => handleInputChange('totalMembers', '')}
                                        />
                                    ) : null
                                }
                            />

                            <TextInput
                                label="Members Left"
                                value={tempFilters.membersLeft}
                                onChangeText={(value) => handleInputChange('membersLeft', value)}
                                keyboardType="numeric"
                                style={styles.searchInput}
                                right={
                                    tempFilters.membersLeft ? (
                                        <TextInput.Icon
                                            icon="close"
                                            onPress={() => handleInputChange('membersLeft', '')}
                                        />
                                    ) : null
                                }
                            />

                            <Button
                                mode="contained"
                                onPress={applyFilters}
                            >
                                Apply Filters
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </Modal>
        );
    };


    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* Profile Summary */}
            <TouchableOpacity onPress={() => router.push('/profile')}>
                <Card style={styles.profileCard}>
                    <Card.Content style={styles.profileContent}>
                        <Avatar.Image
                            size={60}
                            source={require('../../assets/images/user-img.jpeg')}
                        />
                        <View style={styles.profileInfo}>
                            <Text variant="titleLarge">{t('welcome')}</Text>
                            <Text variant="bodyMedium">{t('creditScore')}: 750</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>

            {/* Active Kameeti Status */}
            <Card style={styles.activeCard}>
                <Card.Content>
                    <Text variant="titleMedium" style={styles.whiteText}>{t('activeKameeti')}</Text>
                    <Text variant="headlineMedium" style={styles.whiteText}>Rs. 50,000</Text>
                    <Text variant="bodyMedium" style={styles.whiteText}>{t('nextPayment')}: 15th March</Text>
                </Card.Content>
            </Card>

            <View style={styles.section}>
                <Button
                    mode="contained"
                    icon="plus"
                    onPress={() => router.push('/screens/create-kameeti')}
                    style={styles.createButton}
                    buttonColor="#6200ee"
                >
                    {t('createKameeti')}
                </Button>
            </View>

            {/* Available Kameetis */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text variant="titleLarge" style={styles.sectionTitle}>{t('availableKameetis')}</Text>
                    <IconButton
                        icon="filter-variant"
                        mode="contained"
                        size={24}
                        onPress={() => setShowSearch(true)}
                    />
                </View>
                <View style={styles.activeFilters}>
                    {Object.entries(searchFilters).map(([key, value]) => (
                        value ? (
                            <Chip
                                key={key}
                                style={styles.filterChip}
                                onClose={() => setSearchFilters({ ...searchFilters, [key]: '' })}
                            >
                                {`${key.replace(/([A-Z])/g, ' $1').toLowerCase()}: ${value}`}
                            </Chip>
                        ) : null
                    ))}
                </View>
                <FlatList
                    horizontal
                    data={filterKameetis()}
                    renderItem={renderKameetiItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>





            {/* Payment Schedule */}
            <Card style={styles.scheduleCard}>
                <Card.Content>
                    <Text variant="titleMedium">{t('upcomingPayment')}</Text>
                    <Text variant="headlineMedium">Rs. 5,000</Text>
                    <Text variant="bodyMedium">{t('due')}: 15th March</Text>
                    <Button
                        mode="contained"
                        style={styles.payButton}
                        onPress={handlePayment}
                        buttonColor="#6200ee"
                    >
                        {t('payNow')}
                    </Button>
                </Card.Content>
            </Card>
            <Portal>
                <SearchModal />
            </Portal>
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
        elevation: 4,
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileInfo: {
        marginLeft: 16,
    },
    activeCard: {
        margin: 16,
        backgroundColor: '#6200ee',
    },
    whiteText: {
        color: '#fff',
    },
    section: {
        marginVertical: 16,
    },
    sectionTitle: {
        marginHorizontal: 16,
        marginBottom: 8,
    },
    kameetiCard: {
        width: 200,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    joinButton: {
        marginTop: 8,
    },
    quickActions: {
        margin: 16,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
    },
    scheduleCard: {
        margin: 16,
        marginBottom: 32,
    },
    payButton: {
        marginTop: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 8,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        marginTop: -170,
        borderRadius: 8,

    },
    modalTitle: {
        textAlign: 'center',
        marginBottom: 0,
    },
    searchInput: {
        marginBottom: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    filterChip: {
        margin: 4,
    },
    activeFilters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 8,
    },
    createButton: {
        margin: 16,
        marginTop: 0,
        marginBottom: -60,
        paddingVertical: 8,
        elevation: 4,
        borderRadius: 8,
    },
});
