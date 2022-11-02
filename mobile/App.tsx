import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Center, Text } from 'native-base';
import { extendedTheme } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={extendedTheme}>
      <Center flex={1} bgColor="gray.900">
        <Text color="white" fontSize={24}>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  );
}
