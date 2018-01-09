import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Socket from '../screens/Socket';
import MyCamera from '../screens/MyCamera';
import MyAudio from '../screens/MyAudio';
import User from '../screens/User';

const DrawerScreen = DrawerNavigator(
    {
        Socket: {
            screen: Socket
        },
        MyCamera: {
            screen: MyCamera
        },
        MyAudio: {
            screen: MyAudio
        },
        User: {
            screen: User
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
        MyAudio: {
            screen: MyAudio,
            navigationOptions: {
                headerTitle: 'MyAudio'
            }
        },
        User: {
            screen: User,
            navigationOptions: {
                headerTitle: 'User'
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
