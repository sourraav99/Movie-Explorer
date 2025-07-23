import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import GradientWrapper from '../../components/gradientWrapper';
import { COLORS } from '../../../res/colors';
import Icon from '../../../utils/icon';
import { RootState } from '../../../redux/store';
import { debounce } from "lodash";
import { RootStackParamList, SCREENS } from '..';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MEDIUM_IMAGE_BASE_URL } from '../../../utils/config';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 20;

const FavouritMoviesScreen = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MOVIE_DETAILS'>;
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const favorites = useSelector((state: RootState) => state.favourites.items);


  const handleSearchDebounced = useCallback(
    debounce((text) => {
      setDebouncedSearch(text);
    }, 500),
    []
  );
  useEffect(() => {
    handleSearchDebounced(search);
  }, [search]);

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <GradientWrapper
      headerChildren={
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.secondaryOpacity(0.5),
              height: 30,
              width: 30,
              borderRadius: 100,
            }}
          >
            <Icon name="triangle-left" type="Octicons" color={COLORS.white} size={22} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TextInput
            placeholder="Search in favourites"
            value={search}
            onChangeText={setSearch}
            style={[
              {
                backgroundColor: COLORS.white,
                flex: 1,
                borderRadius: 10,
                paddingLeft: 7,
                color: 'black',
              },
              Platform.OS === 'ios' ? { paddingVertical: 12 } : null,
            ]}
          />
        </>
      }
    >
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 10 }}>
        {filteredFavorites.length === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>No favourites found.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredFavorites}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { navigation.navigate(SCREENS.MOVIE_DETAILS, { id: item.id }) }}
                style={{
                  width: ITEM_WIDTH,
                  borderRadius: 10,
                  overflow: 'hidden',
                  backgroundColor: COLORS.secondaryOpacity(0.3),
                }}
              >
                <Image
                  source={{ uri: `${MEDIUM_IMAGE_BASE_URL}${item.poster_path}` }}
                  style={{ width: '100%', height: 250 }}
                  resizeMode="cover"
                />
                <View style={{ padding: 8 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </GradientWrapper>
  );
};

export default FavouritMoviesScreen;
