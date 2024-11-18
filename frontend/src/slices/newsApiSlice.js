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
        url: `${NEWS_URL}/${params.id}`,
        method: 'PUT',
        body: data,
      }),
    }),    
    newsDelete: builder.mutation({
      query: params => ({
        url: `${NEWS_URL}/${params.id}`,
        method: 'DELETE',
      }),
    }),
    newsGetList: builder.mutation({
      query: () => ({
        url: `${NEWS_URL}`,
        method: 'GET',
      }),
    }),
    newsGet: builder.mutation({
      query: params => ({
        url: `${NEWS_URL}/${params.id}`,
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

