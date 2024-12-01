import React, { createContext, useState, useContext } from 'react';

const translations = {
    english: {
        welcome: "Welcome, Ahmed",
        creditScore: "Credit Score",
        activeKameeti: "Active Kameeti",
        nextPayment: "Next Payment",
        availableKameetis: "Available Kameetis",
        quickActions: "Quick Actions",
        upcomingPayment: "Upcoming Payment",
        payNow: "Pay Now",
        joinNow: "Join Now",
        searchKameetis: "Search Kameetis",
        amount: "Amount (Rs.)",
        duration: "Duration (months)",
        totalMembers: "Total Members",
        membersLeft: "Members Left",
        applyFilters: "Apply Filters",
        due: "Due",
        members: "Members",
        createKameeti: "Create Kameeti"
    },
    urdu: {
        welcome: "خوش آمدید، احمد",
        creditScore: "کریڈٹ سکور",
        activeKameeti: "فعال کمیٹی",
        nextPayment: "اگلی ادائیگی",
        availableKameetis: "دستیاب کمیٹیاں",
        quickActions: "فوری اقدامات",
        upcomingPayment: "آنے والی ادائیگی",
        payNow: "ابھی ادا کریں",
        joinNow: "شامل ہوں",
        searchKameetis: "کمیٹیاں تلاش کریں",
        amount: "رقم (روپے)",
        duration: "مدت (مہینے)",
        totalMembers: "کل ممبران",
        membersLeft: "باقی ممبران",
        applyFilters: "فلٹرز لگائیں",
        due: "واجب الادا",
        members: "ممبران",
        createKameeti: "کمیٹی بنائیں"
    }
};

const LanguageContext = createContext({
    language: 'english',
    t: (key: string) => '',
    setLanguage: (lang: string) => { }
});

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('english');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, t, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
