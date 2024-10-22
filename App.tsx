import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation/index';
import { AuthProvider } from './src/context/auth';

export default function App() {
  return (
    <>
        <Navigation/>
    </>
  )
}