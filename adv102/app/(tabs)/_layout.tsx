import { Tabs } from "expo-router"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text } from "react-native";

export default function Layout() {

    return (
        <Tabs>
            <Tabs.Screen 
                name="index"
                options={{
                    title: 'Home',
                    tabBarActiveTintColor: 'orange',
                    tabBarInactiveTintColor: 'gray',
                    tabBarIcon: ({ color }) => (
                            <MaterialIcons 
                                color={color}
                                size={24} 
                                name="home" />
                    )
                }}
            />
            <Tabs.Screen 
                name="exercises"
                options={{
                    tabBarActiveTintColor: 'orange',
                    tabBarInactiveTintColor: 'gray',
                    title: 'Exercises',
                    tabBarIcon: () => <MaterialIcons size={24} name="5k-plus" />

                }}
            />
        </Tabs>
    )
}