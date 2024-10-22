import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import { ScreenCamera, ScreenImages } from '../screens/index';
import { Entypo } from '@expo/vector-icons'
import React from 'react';

type MenuDrawerParam = {
    foto: undefined
    mostra: undefined
}

type MenuScreenNavigation = DrawerNavigationProp<MenuDrawerParam, "foto">

export type MenuDrawerTypes = {
    navigation: MenuScreenNavigation;
}

export function MenuDrawer() {
    const Drawer = createDrawerNavigator<MenuDrawerParam>();
    return (
        <Drawer.Navigator screenOptions={{
            drawerActiveBackgroundColor: 'white',
            drawerInactiveBackgroundColor: '#cc9058',
            drawerActiveTintColor: '#cc9058',
            drawerInactiveTintColor: 'cc9058',
            headerStyle: { backgroundColor: '#cc9058' },
            headerTintColor: 'white'
        }}>
            <Drawer.Screen name='mostra' component={ScreenImages} options={{
                drawerIcon: () => (
                    <Entypo name="circle" size={24} color={'cc9058'} />
                ),
            }} />
            <Drawer.Screen name='foto' component={ScreenCamera} options={{
                drawerIcon: () => (
                    <Entypo name="camera" size={24} color={'#cc9058'} />
                )
            }} />
        </Drawer.Navigator>
    )
}
