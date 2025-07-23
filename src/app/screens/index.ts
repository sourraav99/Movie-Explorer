
export type RootStackParamList = {
    HOME: undefined;
    SEARCH: undefined;
    MOVIE_DETAILS: { id: number };
    FAVOURITE_MOVIE:undefined;
    DRAWER:undefined
};

export const SCREENS = {
    HOME: 'HOME',
    SEARCH: 'SEARCH',
    MOVIE_DETAILS: 'MOVIE_DETAILS',
    FAVOURITE_MOVIE:'FAVOURITE_MOVIE',
    DRAWER:'DRAWER'

} as const;