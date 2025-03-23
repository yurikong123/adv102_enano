import { View, Text, StyleSheet } from "react-native"
import { Link } from "expo-router";

export default function Home() {

    return (
        <View style={styles.container}>
            <Link href="/about">
                About
            </Link>
            <Link href="/settings/test">
                Navigate to Test Screen
            </Link>
            <View style={styles.child1}>
                {/* <Text style={styles.text}>Layout</Text> */}
                <View style={styles.child11}></View>
                <View style={styles.child12}></View>
            </View>
            <View style={styles.child2}></View>
            <View style={styles.child3}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    child11: {
        width: 20,
        height: 20,
        backgroundColor: 'orange',
        borderRadius: 4
    },
    child12: {
        width: 20,
        height: 20,
        backgroundColor: 'pink',
        borderRadius: 4
    },
    container: {
        flex: 1,
        // flexDirection: 'row',
        backgroundColor: 'orange',
    },
    child1: {
        flex: 5,
        flexDirection: 'row',
        backgroundColor: 'green',
        justifyContent: 'center',
        gap: 50,
        alignItems: 'center',
    },
    child2: {
        flex: 6,
        backgroundColor: 'red',
    },
    child3: {
        flex: 1,
        backgroundColor: 'blue',
    },
    text: {
        color: '#fff',
    }
})