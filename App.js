import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './reducers'
import AddDeck from './components/AddDeck'
import ListDecks from './components/ListDecks'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tabs = createBottomTabNavigator(
  {
    ListDecks: {
      screen: ListDecks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='home' size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name='plus-square' size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#010101',
      style: {
        height: 56,
        backgroundColor: '#757575',
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        }
      }
    }
  }
)
const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#757575'
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#757575'
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: '#000000',
      headerStyle: {
        backgroundColor: '#757575'
      }
    }
  }
})
const AppContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor='#757575' barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
