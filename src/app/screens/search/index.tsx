import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Image, FlatList, Platform, Text, ActivityIndicator, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from '../../../utils/icon';
import { COLORS } from '../../../res/colors';
import GradientWrapper from '../../components/gradientWrapper';
import { RootStackParamList } from '..';
import API from '../../../utils/axiosConfig';
import { END_POINT, MEDIUM_IMAGE_BASE_URL } from '../../../utils/config';
import { usePercentageHeight } from '../../hooks/responsive';

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const response = await API.get(`${END_POINT.serachMovie}`, {
          params: { query }
        });

        const data = response?.data?.results
        // console.log('rspiklm======>>>', data)
        setResults(data || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchMovies(searchText);
  }, [searchText]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={{
        width: '30%',
        margin: '1.66%',
        aspectRatio: 2 / 3,
        borderRadius: 10,
        overflow: 'hidden',
      }}
      onPress={() => navigation.navigate('MOVIE_DETAILS', { id: item.id })}
    >
      <Image
        source={{ uri: `${MEDIUM_IMAGE_BASE_URL}${item.poster_path}` }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  return (
    <GradientWrapper
      headerStyles={{ justifyContent: 'flex-start' }}
      headerChildren={
        <>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.secondaryOpacity(0.5),
              height: usePercentageHeight(3.5),
              width:  usePercentageHeight(3.5),
              borderRadius: 100,
            }}
          >
            <Icon name="triangle-left" type="Octicons" color={COLORS.white} size={24} />
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TextInput
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            style={[
              {
                backgroundColor: COLORS.white,
                flex: 1,
                borderRadius: 10,
                paddingLeft: 7,
              },
              Platform.OS === 'ios' ? { paddingVertical: 12 } : null,
            ]}
          />
        </>
      }
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator size={'large'} color={COLORS.white}/>
        ) : (
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 5,
            }}
            ListEmptyComponent={
              searchText ? (
                <Text style={{ color: 'white', marginTop: 20 }}>No results found</Text>
              ) : null
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </GradientWrapper>
  );
};

export default SearchScreen;
