// components/CustomDrawer.js
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../res/colors';

const CustomDrawer = (props: any) => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={styles.gradientContainer}
    >
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});

export default CustomDrawer;
