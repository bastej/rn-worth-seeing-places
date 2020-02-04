import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import PlacesListScreen from '../screens/PlacesListScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';

import ColorPalette from '../constants/ColorPalette';

const PlacesNavigator = createStackNavigator({
    Places: PlacesListScreen,
    PlaceDetail: PlaceDetailScreen,
    NewPlace: NewPlaceScreen,
    Map: MapScreen,
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? ColorPalette.darkGreen : 'white',
        },
        headerTintColor: Platform.OS === "android" ? 'white' : ColorPalette.darkGreen,
    },
})

export default createAppContainer(PlacesNavigator);