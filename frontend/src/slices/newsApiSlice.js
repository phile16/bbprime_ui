import { newsApiBaseSlice } from './newsApiBaseSlice';
const NEWS_URL = '/api/news';

export const newsApiSlice = newsApiBaseSlice.injectEndpoints({
  endpoints: (builder) => ({
    newsCreate: builder.mutation({
      query: (data) => ({
        url: `${NEWS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    newsUpdate: builder.mutation({
      query: (data) => ({
        url: `${NEWS_URL}`,
        method: 'PUT',
        body: data,
      }),
    }),    
    newsDelete: builder.mutation({
      query: () => ({
        url: `${NEWS_URL}`,
        method: 'DELETE',
        body: data,
      }),
    }),
    newsGetList: builder.mutation({
      query: () => ({
        url: `${NEWS_URL}`,
        method: 'GET',
      }),
    }),
    newsGet: builder.mutation({
      query: () => ({
        url: `${NEWS_URL}/{title}`,
        method: 'GET',
      }),
    }),

  }),
});

export const {
  useNewsCreateMutation,
  useNewsUpdateMutation,
  useNewsDeleteMutation,
  useNewsGetListMutation,
  useNewsGetMutation,
} = newsApiSlice;

