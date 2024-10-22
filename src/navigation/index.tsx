import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { MenuDrawer } from './MenuDrawer';
import { useAuth } from '../hook/auth';
import { Loading } from '../components/Loading';

export default function Navigation () {
    const {user, loading} = useAuth()
    if (loading) {
        return <Loading/>
    }
    return (
        <NavigationContainer>
            <MenuDrawer/>
        </NavigationContainer>
    )
}