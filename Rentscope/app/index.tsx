import { View, Text, StyleSheet, Animated, Image } from 'react-native';
import { useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
export default function SplashScreen(){
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter()
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            router.replace("/"));
        }, 2000);
    
        return () => clearTimeout(timer);
    }, []);

    return(
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Image
                    source={require('@/assets/images/Rentscope.png')} 
                    style={{ width: 200, height: 150 }} 
                    resizeMode='contain'
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F6FF'
    },
    iconContainer: {
        alignItems: "center"
    }
});
