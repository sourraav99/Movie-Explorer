import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import GradientWrapper from '../../components/gradientWrapper';
import { COLORS } from '../../../res/colors';
import Icon from '../../../utils/icon';
import { END_POINT, LARGE_IMAGE_BASE_URL, MEDIUM_IMAGE_BASE_URL } from '../../../utils/config';
import API from '../../../utils/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addToFavourites, removeFromFavourites } from '../../../redux/slices/favouriteMovieSlice';
import { height, useFontScale, usePercentageHeight } from '../../hooks/responsive';

type MovieDetailsRouteParams = {
  id: number;
};
type Genre = {
  id: number;
  name: string;
};

type Movie = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  original_language: string;
  popularity: number;
  genres: Genre[];
};

const MovieDetailsScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<{ params: MovieDetailsRouteParams }, 'params'>>();
  const navigation = useNavigation();
  const movieId = route.params.id;
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Movie | null>(null);

  const favorites = useSelector((state: RootState) => state.favourites.items);
  const isFavourite = data ? favorites.some((item) => item.id === data?.id) : false;


  // console.log(typeof movieId);
  const toggleFavourite = () => {
    if (!data) return;
    const movieInfo = {
      id: data.id,
      title: data.title,
      poster_path: data.poster_path,
      popularity: data.popularity,
      overview: data.overview,
    };
    if (isFavourite) {
      dispatch(removeFromFavourites(data.id));
    } else {
      dispatch(addToFavourites(movieInfo));
    }
  };

  useEffect(() => {
    fetchMovieDetails()
  }, [])

  const fetchMovieDetails = async () => {
    try {
      const response = await API.get(`${END_POINT.singleMovie}/${movieId}`);
      const results = response?.data
      setData(results)
      console.log(results)
    } catch (error) {
      console.log("Error fetching movie:", error);
    } finally {
      setLoading(false);
    }
  }

  const LoadingLayout = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size={'large'} color={COLORS.white} />
      </View>
    )
  }

  return (
    <GradientWrapper
      headerStyles={{ justifyContent: 'flex-start' }}
      headerChildren={
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="triangle-left" type="Octicons" color={COLORS.white} size={22} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <Text style={styles.heading}>Movie Details</Text>
        </>
      }
    >
      {loading || !data ? (
        <LoadingLayout />
      ) : (
        // <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Image
              source={{ uri: `${LARGE_IMAGE_BASE_URL}${data?.poster_path}` }}
              style={styles.poster}
            />
           <View style={{alignSelf:'center',alignItems:"center"}}>
             <Text style={styles.title}>{data?.title}</Text>
            <Text style={styles.subText}>Release Date: {data?.release_date}</Text>
            <Text style={styles.subText}>Rating: {data?.vote_average.toFixed(1)} ⭐</Text>
            <Text style={styles.subText}>Language: {data?.original_language.toUpperCase()}</Text>
            <Text style={styles.subText}>Popularity: {data?.popularity.toFixed(1)}</Text>
            <View style={styles.genreContainer}>
              {data.genres.map((item: Genre, index) => (
                <View key={index} style={styles.genreChip}>
                  <Text style={styles.genreText}>{item?.name}</Text>
                </View>
              ))}
            </View>
           </View>
            <Text style={styles.overview}>{data?.overview}</Text>
            <TouchableOpacity onPress={toggleFavourite} style={{ marginTop: usePercentageHeight(1.8), padding: 12, borderRadius: 12, backgroundColor: COLORS.white, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontWeight: '700', color: COLORS.secondary }}> {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}</Text>
            </TouchableOpacity>
            <View style={{ height: 100 }}></View>
          </ScrollView>
        // </View>
      )}


    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: useFontScale(18),
    fontWeight: 'bold',
    color: COLORS.white,
    paddingHorizontal: 10,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondaryOpacity(0.5),
    height: usePercentageHeight(3),
    width: usePercentageHeight(3),
    borderRadius: 100,
  },
 container: {
  padding: 16,
  flexGrow: 1,
},
poster: {
  width: '100%',
  height: height*0.65, // fixed height avoids layout issues
  borderRadius: 12,
  marginBottom: usePercentageHeight(1.5),
  backgroundColor:COLORS.secondaryOpacity(0.5)
},
  title: {
    fontSize: useFontScale(24),
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: useFontScale(14),
    color: COLORS.white,
    marginBottom: 4,
  },
  overview: {
    marginTop: usePercentageHeight(1.5),
    fontSize: 14,
    color: COLORS.white,
    lineHeight: usePercentageHeight(1.9),
    textAlign: 'justify',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: usePercentageHeight(1),
    gap: 8,
  },
  genreChip: {
    backgroundColor: COLORS.whiteOpacity(0.3),
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  genreText: {
    color: COLORS.white,
    fontSize: useFontScale(12),
  },
});

export default MovieDetailsScreen;
