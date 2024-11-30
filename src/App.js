import { TouchableOpacity,} from "react-native";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { ApplicationProvider, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiProvider from './api/ApiProvider';
import { default as theme } from './custom-theme.json';
import Loading from './components/LoadingContextProvider';
import Login from './screen/Login';
const App = () => {
  const Stack = createNativeStackNavigator();


  return (

    <AlertNotificationRoot>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Loading >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <BottomSheetModalProvider>
               
                  <NavigationContainer>
                      
                      <Stack.Navigator initialRouteName="Login" headerMode="none" screenOptions={{
                        headerShown: false
                      }}>
                        <Stack.Screen name="Login" component={Login} screenOptions={{
                          headerShown: false
                        }} />
                      </Stack.Navigator>


                  </NavigationContainer>
       
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </Loading>
      </ApplicationProvider>
    </AlertNotificationRoot>
  );
};

export default App;