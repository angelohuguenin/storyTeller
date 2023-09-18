import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './tabNavigator';
import Profile from '../screens/profile';
import StackNavigator from './stackNavigator';
import LogOut from '../screens/logOut';
import firebase from 'firebase';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      light_theme: true,
    }
  }

  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({
      light_theme: theme === "light" ? true : false
    });
  }

  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "#e91e63",
            inactiveTintColor: this.state.light_theme ? "black" : "white",
            itemStyle: { marginVertical: 5 }
          }} 
        drawerContent={props => <CustomSidebarMenu {...props} />}
        >

        <Drawer.Screen name="Home1" component={StackNavigator} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }} />
        <Drawer.Screen name="LogOut" component={LogOut} options={{ unmountOnBlur: true }} />
      </Drawer.Navigator>
    );
  }
}