///(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
        screenOptions={{
            tabBarStyle: { backgroundColor: Colors[colorScheme ?? 'dark'].background },
            tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
            headerShown: false,
        }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
        <Tabs.Screen
            name="takeflight"
            options={{
                title: 'Take Flight',
                tabBarIcon: ({ color, focused }) => (
                    <TabBarIcon name={focused ? 'airplane' : 'airplane-outline'} color={color} />
                ),
            }}
        />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
