import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    StyleProp,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../res/colors';
import { JSX } from 'react/jsx-runtime';

interface HeaderItem {
    icon?: JSX.Element;
    image?: any;
    onPress?: () => void;
    customElement?: JSX.Element;
    input?: boolean;
}

interface GradientWrapperProps {
    children: React.ReactNode;
    headerChildren: React.ReactNode;
    showHeader?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    colors?: string[];
    headerStyles?: StyleProp<ViewStyle>;
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({
    children,
    headerChildren,
    headerStyles,
    showHeader = true,
    containerStyle,
    colors = [COLORS.primary, COLORS.secondary],
}) => {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient colors={colors} style={[styles.container, containerStyle]}>
            <View style={{ paddingTop: insets.top }} />
            {showHeader && (
                <View style={[styles.header, headerStyles]}>
                    {headerChildren}
                </View>
            )}
            {children}
                  <View style={{ backgroundColor:'translucent' }} />
        </LinearGradient>
    );
};

export default GradientWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginHorizontal: 16,
        marginVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '600',
    },
    iconButton: {
        backgroundColor: COLORS.secondaryOpacity(0.4),
        padding: 10,
        borderRadius: 999,
    },
    iconImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    input: {
        height: 38,
        minWidth: 180,
        borderRadius: 10,
        paddingHorizontal: 10,
        borderColor: COLORS.whiteOpacity(0.2),
        borderWidth: 1,
        color: COLORS.white,
    },
});
