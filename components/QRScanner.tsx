// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { Text, Button } from 'react-native-paper';
// import { BarCodeScanner } from 'expo-barcode-scanner';

// export default function QRScanner({ onScan, onClose }) {
//     const [hasPermission, setHasPermission] = useState(null);

//     useEffect(() => {
//         (async () => {
//             const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//         })();
//     }, []);

//     const handleBarCodeScanned = ({ data }) => {
//         onScan(data);
//     };

//     if (hasPermission === null) {
//         return <Text>Requesting camera permission</Text>;
//     }
//     if (hasPermission === false) {
//         return <Text>No access to camera</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <BarCodeScanner
//                 onBarCodeScanned={handleBarCodeScanned}
//                 style={styles.scanner}
//             />
//             <Button
//                 mode="contained"
//                 onPress={onClose}
//                 style={styles.closeButton}
//             >
//                 Cancel
//             </Button>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     scanner: {
//         flex: 1,
//     },
//     closeButton: {
//         position: 'absolute',
//         bottom: 50,
//         alignSelf: 'center',
//         backgroundColor: '#6200ee',
//     },
// });
