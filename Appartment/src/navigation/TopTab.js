import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Chats from '../containers/app/Chats';
import {width} from 'react-native-dimension';
import Colors from '../constants/Colors';
import ChatsHeader from '../components/ChatsHeader';
import Updates from '../containers/app/Updates';
const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <>
    <ChatsHeader/>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 16,
            color: 'white',
            fontWeight: '600',
            textTransform: 'capitalize',
          },
          tabBarStyle: {backgroundColor: Colors.darkGreen},
          tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: width(0.8),
          },
        }}>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Updates" component={Updates} />
        <Tab.Screen name="Calls" component={Chats} />
      </Tab.Navigator>
    </>
  );
};

export default TopTabs;
