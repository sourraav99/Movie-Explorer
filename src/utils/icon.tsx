import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Icon as RNIcon, IconProps as RNIconProps } from 'react-native-vector-icons/Icon';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type IconType =
  | 'MaterialIcons'
  | 'FontAwesome'
  | 'Ionicons'
  | 'Entypo'
  | 'Feather'
  | 'AntDesign'
  | 'EvilIcons'
  | 'Foundation'
  | 'Octicons'
  |'Fontisto'
  | 'SimpleLineIcons'
  | 'Zocial'
  | 'MaterialCommunityIcons';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  type?: IconType;
  style?: StyleProp<TextStyle>;
}

const ICON_MAP: Record<IconType, typeof RNIcon> = {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Entypo,
  Feather,
  AntDesign,
  EvilIcons,
  Foundation,
  Octicons,
  Fontisto,
  SimpleLineIcons,
  Zocial,
  MaterialCommunityIcons,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = 'black',
  type = 'MaterialIcons',
  style,
}) => {
  const SelectedIcon = ICON_MAP[type];

  return <SelectedIcon name={name} size={size} color={color} style={style} />;
};

export default Icon;
