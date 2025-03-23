import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    title: 'Settings'
                }}
            />
            <Stack.Screen 
                name="test" 
                options={{
                    title: 'Settings - test'
                }}
            />
        </Stack>
    )
}