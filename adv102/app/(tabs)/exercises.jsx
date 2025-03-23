import { Link } from "expo-router";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HTMLView from 'react-native-htmlview';

export default function Exercises() {

    const exercises = [
        { title: 'Exercise 3', description: '<strong>test</strong><ul><li>test</li><li>a</li></ul>', href: '/login' },
        { title: 'Exercise 4', description: 'Desc', href: '/' },
        { title: 'Exercise 5', description: 'Desc', href: '/' },
    ]

    return (
        <ScrollView style={{ padding: 20 }}>
            <View style={{ rowGap: 10 }}>
                {exercises.map((exercise, index) => {
                    return (
                        <Link 
                            key={index}
                            href={exercise.href}>
                            <View 
                                style={styles.container}>
                                <Text>{exercise.title}</Text>
                                {/* <Text>{exercise.description}</Text> */}
                                <HTMLView
                                    value={exercise.description}
                                />
                            </View>
                        </Link>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        width: '100%'
    }
})