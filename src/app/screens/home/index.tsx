import React, { useEffect, useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Image, Platform, ListRenderItem, FlatList, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import { COLORS } from '../../../res/colors'
import { IMAGES } from '../../../res/images'
import Icon from "../../../utils/icon";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, SCREENS } from '..'
import API from '../../../utils/axiosConfig'
import { END_POINT, MEDIUM_IMAGE_BASE_URL, SMALL_IMAGE_BASE_URL, LARGE_IMAGE_BASE_URL } from '../../../utils/config'
import GradientWrapper from '../../components/gradientWrapper'
import { fontSizes, height, useFontScale, usePercentageHeight, usePercentageWidth } from '../../hooks/responsive'

interface Movie {
    id: number
    title: string
    vote_average: number
    release_date: number
    poster_path: string
}

const HomeScreen = () => {
    const insets = useSafeAreaInsets()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // for shimmer on first load
    const [loadingMore, setLoadingMore] = useState(false); // for pagination spinner
    const [hasMore, setHasMore] = useState(true); // for pagination limit

    const firstMovie = movies[0];
    const restMovies = movies.slice(1);

    useEffect(() => {
        fetchPopularMovies(1)
    }, [])

    const fetchPopularMovies = async (pageNumber = 1) => {
        try {
            if (pageNumber === 1) setLoading(true);
            else setLoadingMore(true);

            const response = await API.get(`${END_POINT.popular}?language=en-US&page=${pageNumber}`);
            const results = response.data.results;

            setMovies(prev => (pageNumber === 1 ? results : [...prev, ...results]));

            setHasMore(response.data.page < response.data.total_pages);
            setPage(pageNumber);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMore = () => {
        if (!loadingMore && hasMore) {
            fetchPopularMovies(page + 1);
        }
    };

    const renderItem: ListRenderItem<Movie> = ({ item }) => (
        <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.MOVIE_DETAILS, { id: item.id }) }} style={styles.card}>
            <Image resizeMode='cover' source={{ uri: `${SMALL_IMAGE_BASE_URL}${item?.poster_path}` }} style={styles.poster} />
            <View style={styles.cardInfo}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.details}>{item?.release_date}</Text>
                <Text style={styles.details}>⭐ {item?.vote_average.toFixed(1)}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderFeaturedMovie = (movie: Movie) => {
        return (
            <View style={{ padding: 6, borderWidth: 3, justifyContent: 'center', marginBottom: usePercentageHeight(1.5), borderRadius: 16, borderColor: COLORS.whiteOpacity(0.5) }}>
                <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.MOVIE_DETAILS, { id: movie.id }) }} activeOpacity={1} style={styles.featuredContainer}>
                    <Image resizeMode='contain' source={{ uri: `${LARGE_IMAGE_BASE_URL}${movie?.poster_path}` }} style={styles.featuredPoster} />
                    <LinearGradient
                        colors={[COLORS.secondary, 'transparent']}
                        start={{ x: 0.4, y: 1 }}
                        end={{ x: 0.4, y: 0 }}
                        style={styles.featuredOverlay}
                    />
                    <View style={styles.featuredContent}>
                        <Text style={styles.featuredTitle}>{movie?.title}</Text>
                        <Text style={styles.featuredSubtitle}>{movie?.release_date}</Text>
                        <Text style={styles.featuredSubtitle}>⭐ {movie?.vote_average.toFixed(1)}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate(SCREENS.MOVIE_DETAILS, { id: movie.id }) }} style={{ backgroundColor: COLORS.whiteOpacity(0.3), position: "absolute", height: usePercentageHeight(3), width: usePercentageHeight(3), borderRadius: 100, alignItems: 'center', justifyContent: 'center', right: 20, bottom: 25 }}>
                    <Icon name='info' type='Fontisto' color={COLORS.white} size={18} />
                </TouchableOpacity>
            </View>
        );
    };
    const renderShimmerLayout = () => {
        return (
            <ScrollView style={{ paddingHorizontal: 16 }}>
                {/* Featured Shimmer Card */}
                <View style={{ marginBottom: 20, padding: 6, borderRadius: 16 }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        shimmerColors={[
                            'rgba(60, 60, 60, 0.3)',
                            'rgba(80, 80, 80, 0.4)',
                            'rgba(60, 60, 60, 0.3)',
                        ]}
                        style={{
                            height: 400,
                            width: '100%',
                            borderRadius: 16,
                        }}
                    />
                </View>

                {/* Multiple Movie Cards Shimmer */}
                {[...Array(4)].map((_, index) => (
                    <View key={index} style={[styles.card]}>
                        <ShimmerPlaceHolder
                            LinearGradient={LinearGradient}
                            shimmerColors={[
                                'rgba(60, 60, 60, 0.3)',
                                'rgba(80, 80, 80, 0.4)',
                                'rgba(60, 60, 60, 0.3)',
                            ]}

                            style={styles.poster}
                        />
                        <View style={{ flex: 1, padding: 10 }}>
                            <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                style={{ height: 20, width: '60%', marginBottom: 6, borderRadius: 8 }}
                            />
                            <ShimmerPlaceHolder
                                LinearGradient={LinearGradient}
                                style={{ height: 14, width: '40%', borderRadius: 6 }}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
        )
    }


    return (
        <GradientWrapper
            headerChildren={<>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.secondaryOpacity(0.5), padding: 10, borderRadius: 100 }}>
                        <Image source={IMAGES.whiteLogo} style={{ height: usePercentageHeight(2), width: usePercentageHeight(2), }} />
                    </TouchableOpacity>
                    <Text style={styles.heading}>Popular Movies</Text>
                </View>

                <TouchableOpacity
                    onPress={() => { navigation.navigate(SCREENS.SEARCH) }}
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.secondaryOpacity(0.5), padding: 8, borderRadius: 100 }}>
                    <Icon type='Feather' name='search' color={COLORS.white} size={17} />
                </TouchableOpacity>
            </>}
        >

            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content" 
            />
            {loading ? renderShimmerLayout() : (
                <FlatList
                    data={restMovies}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                    ListHeaderComponent={renderFeaturedMovie(firstMovie)}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loadingMore ? (
                            <View style={{ padding: 16, height: usePercentageHeight(7) }}>
                                <ActivityIndicator color={COLORS.white} size="small" />
                            </View>
                        ) : (
                            <View style={{ height: 80 }} />
                        )
                    }
                />
            )}
        </GradientWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontSize: useFontScale(18),
        fontWeight: 'bold',
        color: COLORS.white,
        paddingHorizontal: usePercentageHeight(1)
    },
    scrollView: {
        paddingHorizontal: 16,
        paddingBottom: usePercentageHeight(2)
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: usePercentageHeight(1.5),
        flexDirection: 'row'
    },
    poster: {
        width: usePercentageWidth(22),
        height: usePercentageHeight(15)
    },
    cardInfo: {
        padding: 10,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: useFontScale(18),
        fontWeight: 'bold',
        color: '#fff'
    },
    details: {
        fontSize: 14,
        color: '#ccc',
        marginTop: 4
    },
    list: {
        paddingHorizontal: usePercentageWidth(4),
        paddingBottom: 20,
    },
    featuredContainer: {
        height: height*0.55,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    featuredPoster: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    featuredContent: {
        position: 'absolute',
        bottom: usePercentageHeight(1.6),
        left: usePercentageHeight(1.6),
    },
    featuredTitle: {
        fontSize: useFontScale(22),
        fontWeight: 'bold',
        color: '#fff',
    },
    featuredSubtitle: {
        fontSize: useFontScale(14),
        color: '#ccc',
        marginTop: 4,
    },

})

export default HomeScreen
