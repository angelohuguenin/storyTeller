import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './tabNavigator';
import Profile from '../screens/profile';
import StackNavigator from './stackNavigator';
import LogOut from '../screens/logOut';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home1" component={StackNavigator} options={{ unmountOnBlur: true }}/>
      <Drawer.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }}/>
      <Drawer.Screen name="LogOut" component={LogOut} options={{ unmountOnBlur: true }}/>
    </Drawer.Navigator>
  );
}