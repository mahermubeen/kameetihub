import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Text, Card, Avatar, Searchbar, Divider, TouchableRipple } from 'react-native-paper';
import { router } from 'expo-router';

const chatData = [
    {
        id: '1',
        name: 'Kameeti Group A',
        lastMessage: 'Next payment is due on 15th March',
        time: '2:30 PM',
        unread: 3,
        isGroup: true,
        avatar: null,
    },
    {
        id: '2',
        name: 'Asad Malik',
        lastMessage: 'JazzCash se payment kar di hai',
        time: '1:45 PM',
        unread: 0,
        isGroup: false,
        avatar: null,
    },
    {
        id: '3',
        name: 'Monthly Kameeti Group',
        lastMessage: 'Welcome new member Imran Bhai',
        time: '11:20 AM',
        unread: 5,
        isGroup: true,
        avatar: null,
    },
];

export default function Chats() {
    const [searchQuery, setSearchQuery] = useState('');

    const renderChatItem = ({ item }) => (
        <TouchableRipple
            onPress={() => router.push({
                pathname: '/screens/chat-detail',
                params: { id: item.id, name: item.name }
            })}
        >
            <View>
                <View style={styles.chatItem}>
                    <Avatar.Icon
                        size={50}
                        icon={item.isGroup ? "account-group" : "account"}
                        style={styles.avatar}
                    />
                    <View style={styles.chatContent}>
                        <View style={styles.chatHeader}>
                            <Text variant="titleMedium">{item.name}</Text>
                            <Text variant="bodySmall" style={styles.timeText}>
                                {item.time}
                            </Text>
                        </View>
                        <View style={styles.messageRow}>
                            <Text
                                variant="bodyMedium"
                                numberOfLines={1}
                                style={styles.lastMessage}
                            >
                                {item.lastMessage}
                            </Text>
                            {item.unread > 0 && (
                                <View style={styles.unreadBadge}>
                                    <Text style={styles.unreadText}>
                                        {item.unread}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <Divider />
            </View>
        </TouchableRipple>
    );

    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search chats"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchBar}
            />
            <FlatList
                data={chatData}
                renderItem={renderChatItem}
                keyExtractor={item => item.id}
            />
        </View>
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
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
    },
    avatar: {
        backgroundColor: '#6200ee',
    },
    chatContent: {
        flex: 1,
        marginLeft: 16,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        color: '#666',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    lastMessage: {
        flex: 1,
        color: '#666',
    },
    unreadBadge: {
        backgroundColor: '#6200ee',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    unreadText: {
        color: '#fff',
        fontSize: 12,
        paddingHorizontal: 8,
    },
});
