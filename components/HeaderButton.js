import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import ColorPalette from '../constants/ColorPalette';

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'white' : ColorPalette.darkGreen } />
}

export default CustomHeaderButton;