import { createDrawerNavigator } from '@react-navigation/drawer';
import { SCREENS } from '../app/screens';
import HomeScreen from '../app/screens/home';
import FavouritMoviesScreen from '../app/screens/favouriteMovies';
import { COLORS } from '../res/colors'; 
import CustomIcon from '../utils/icon'; 
import CustomDrawer from '../app/components/customeDrawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: 'transparent',
          width: 260,
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.lightGray,
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
      }}
    >
      <Drawer.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => (
            <CustomIcon name="home" size={22} color={color} type='Entypo' />
          ),
        }}
      />
      <Drawer.Screen
        name={SCREENS.FAVOURITE_MOVIE}
        component={FavouritMoviesScreen}
        options={{
          title: 'Favourites',
          drawerIcon: ({ color }) => (
            <CustomIcon name="favorite" size={22} color={color} type='MaterialIcons'/>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default MyDrawer;
