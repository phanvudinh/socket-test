import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Socket from '../screens/Socket';
import MyCamera from '../screens/MyCamera';

const DrawerScreen = DrawerNavigator(
    {
        Socket: {
            screen: Socket
        },
        MyCamera: {
            screen: MyCamera
        }
    },
    {
      drawerPosition: 'left',
      initialRouteName: 'Socket',
    }
  )

export default StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: () => null
            }

        },
        Socket: {
            screen: Socket,
            navigationOptions: {
                headerTitle: 'Socket'
            }
        },
        MyCamera: {
            screen: MyCamera,
            navigationOptions: {
                headerTitle: 'MyCamera'
            }
        },
        DrawerScreen: {
            screen: DrawerScreen
        }
    },
    {
        headerMode: 'screen',
        mode: 'card'
    }
)
