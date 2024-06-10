import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

const HomeScreen = () => {
    const titleOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(20);
    const backgroundScale = useSharedValue(1);

    useEffect(() => {
        titleOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.exp) });
        titleTranslateY.value = withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) });
        backgroundScale.value = withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) });
    }, []);

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const backgroundStyle = useAnimatedStyle(() => ({
        transform: [{ scale: backgroundScale.value }],
    }));

    return (
        <Animated.View style={[styles.background, backgroundStyle]}>
            <ImageBackground
                source={require('../../assets/images/screens/background.png')}
                style={styles.imageBackground}
            >
                <View style={styles.container}>
                    <Animated.Text style={[styles.title, titleStyle]}>Welcome to</Animated.Text>
                    <Animated.Text style={[styles.title, titleStyle]}>VFR Simulator</Animated.Text>
                </View>
            </ImageBackground>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Blur the background image
        // @ts-ignore
        backgroundColor: 'rgba(0, 0, 0, 0.5)',


    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;
