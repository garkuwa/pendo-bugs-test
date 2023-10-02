import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {WithPendoReactNavigation} from 'rn-pendo-sdk';

const TabNavigator = createBottomTabNavigator<any>();
const HomePageComponent = () => (
  <Pressable style={styles.sectionContainer} onPress={Keyboard.dismiss}>
    <Text style={styles.sectionTitle}>Welcome Home</Text>
    <Text style={styles.sectionDescription}>Some information here</Text>
  </Pressable>
);
const MyDetailsComponent = ({navigation}: any) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>255 Pitt Street, Sydney, NSW, 2065</Text>
    <Text style={styles.sectionDescription}>
      Click the button below to update the address
    </Text>
    <Button
      title="Update Address"
      onPress={() =>
        navigation.push('NAVIGATOR_MY_DETAILS', {screen: 'UPDATE_MY_ADDRESS'})
      }
    />
  </View>
);
const BottomTabNavigationComponent = () => {
  const insets = useSafeAreaInsets();
  insets.bottom = 0;
  insets.top = -50;

  return (
    <TabNavigator.Navigator>
      <TabNavigator.Screen name="HOME" component={HomePageComponent} />
      <TabNavigator.Screen name="My Details" component={MyDetailsComponent} />
    </TabNavigator.Navigator>
  );
};

const RootNavigation = createNativeStackNavigator<any>();
const MyDetailNavigation = createNativeStackNavigator<any>();

const UpdateAddressComponent = () => (
  <WebView
    source={{uri: 'https://www.google.com/'}}
    style={{flex: 1, padding: 0}}
    startInLoadingState={true}
  />
);
const MyDetailsNavigator = () => (
  <MyDetailNavigation.Navigator
    screenOptions={({navigation}: any) => ({
      headerStyle: {backgroundColor: 'tertiary'},
      title: '',
      headerHideShadow: true,
      headerLeft: () => (
        <Button onPress={navigation.goBack} title="BACK" color="black" />
      ),
      headerShadowVisible: false,
      animationTypeForReplace: 'pop',
    })}>
    <MyDetailNavigation.Screen
      name="UPDATE_MY_ADDRESS"
      options={({}) => ({
        headerStyle: {backgroundColor: 'tertiary'},
      })}
      component={UpdateAddressComponent}
    />
  </MyDetailNavigation.Navigator>
);

const NavigationComponent = () => (
  <NavigationContainer>
    <RootNavigation.Navigator initialRouteName="INITIAL">
      <RootNavigation.Screen
        name="TABS"
        options={{headerShown: false}}
        component={BottomTabNavigationComponent}
      />
      <RootNavigation.Screen
        name="NAVIGATOR_MY_DETAILS"
        options={{headerShown: false}}
        component={MyDetailsNavigator}
      />
    </RootNavigation.Navigator>
  </NavigationContainer>
);
const NavigationComponentWithPendo =
  WithPendoReactNavigation(NavigationComponent);

function App(): JSX.Element {
  return <NavigationComponentWithPendo />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
