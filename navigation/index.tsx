/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Theme';
import useColorScheme from '../hooks/useColorScheme';

import ModalScreen from '../screens/RUCardModal';
import NotFoundScreen from '../screens/NotFoundScreen';
import RuTab from '../screens/RuTab';
import NewsTab from '../screens/NewsTab';
import EventTab from '../screens/EventTab';
import Menu from '../screens/Menu';
import InsertCreditsModal from '../screens/InsertCreditsModal';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} options={{ title: 'Cartão RU' }} />
        <Stack.Screen name="InsertCredits" component={InsertCreditsModal} options={{ title: 'Inserir Créditos' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

// talvez fazer com que rotas novas sejam criadas baseadas no menu
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator({navigation}: RootTabScreenProps<'Menu'>) {
  const colorScheme = useColorScheme();

  const backButton = () => {
    return(
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="arrow-left"
          size={25}
          color={Colors[colorScheme].blue}
          style={{ 
            marginHorizontal: 16
          }}
        />
      </Pressable>
    )
  }

  const backToMenuButton = () => {
    return(
      <Pressable
        onPress={() => navigation.navigate('Menu')}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}>
        <FontAwesome
          name="home"
          size={25}
          color={Colors[colorScheme].blue}
          style={{ marginRight: 15 }}
        />
      </Pressable>
    )
  }

  return (
    <BottomTab.Navigator
      initialRouteName="Menu"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle:{
          display: 'none',
          alignItems: 'center'
        },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <BottomTab.Screen
        name="Menu"
        component={ Menu }
        options={({ navigation }: RootTabScreenProps<'Menu'>) => ({
          title: 'Meu Campus UFC',
          headerStyle: {
            backgroundColor: Colors[colorScheme].white
          },
          headerTitleStyle:{
            color: Colors[colorScheme].blue,
            fontWeight: 'bold',
          }
        })}
      />
      <BottomTab.Screen
        name="RuTab"
        component={ RuTab }
        options={({ navigation }: RootTabScreenProps<'RuTab'>) => ({
          title: 'Restaurante',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerLeft: backButton,
          //headerRight: backToMenuButton,
        })}
      />
      <BottomTab.Screen
        name="NewsTab"
        component={NewsTab}
        options={({ navigation }: RootTabScreenProps<'NewsTab'>) => ({
          title: 'Notícias',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerLeft: backButton,
          //headerRight: backToMenuButton,
        })}
      />
      <BottomTab.Screen
        name="EventTab"
        component={EventTab}
        options={({ navigation }: RootTabScreenProps<'EventTab'>) => ({
          title: 'Eventos',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerLeft: backButton,
          //headerRight: backToMenuButton,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
