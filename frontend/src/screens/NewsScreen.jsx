import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import News from '../components/News';
import NewsMarquee from '../components/NewsMarquee';
import NewsFeatured from '../components/NewsFeatured';
import NewsSlider from '../components/NewsSlider';
import NewsLatest from '../components/NewsLatest';
import NewsTrending from '../components/NewsTrending';

import { useNewsGetByLocationMutation } from '../slices/newsApiSlice';

import { TimeOnPageTracker } from '../components/webstatistics/TimeOnPageTracker/TimeOnPageTracker';
import HoverTracker from '../components/webstatistics/HoverTracker/HoverTracker';


const NewsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // TODO: This should be more dynamic
  // const newsLocations = ["Marquee", "Featured", "FeaturedSlide", "Latest", "Trending"];

  // Dispatch, as required by states
  const dispatch = useDispatch();

  //States
  // const [marqueeArticles, setMarqueeArticles] = useState([]);
  // const [featuredArticles, setFeaturedArticles] = useState([]);
  // const [featuredSlideArticles, setFeaturedSlideArticles] = useState([]);
  // const [latestArticles, setLatestArticles] = useState([]);
  // const [trendingArticles, setTrendingArticles] = useState([]);



  // Mutation
  //TODO : fix this later, owrks for now
  const [getNewsArticleByLocationMarquee, { data: newsMarqueeData, loading: newsMarqueeLoading, error: newsMarqueeError }] = useNewsGetByLocationMutation();
  const [getNewsArticleByLocationFeatured, { data: newsFeaturedData, loading: newsFeaturedLoading, error: newsFeaturedError }] = useNewsGetByLocationMutation();
  const [getNewsArticleByLocationFeaturedSlide, { data: newsFeaturedSlideData, loading: newsFeaturedSlideLoading, error: newsFeaturedSlideError }] = useNewsGetByLocationMutation();
  const [getNewsArticleByLocationLatest, { data: newsLatestData, loading: newsLatestLoading, error: newsLatestError }] = useNewsGetByLocationMutation();
  const [getNewsArticleByLocationTrending, { data: newsTrendingData, loading: newsTrendingLoading, error: newsTrendingError }] = useNewsGetByLocationMutation();


  // Initialize News Data
  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleByLocationMarquee({ "location": "Marquee" });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleByLocationFeatured({ "location": "Featured" });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleByLocationFeaturedSlide({ "location": "FeaturedSlide" });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleByLocationLatest({ "location": "Latest" });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleByLocationTrending({ "location": "Trending" });
    }
    fetchData();
  }, []);



  // useEffect(() => {
  //   if (!newsMarqueeLoading && !newsMarqueeError && newsMarqueeData) {
  //     setFeaturedArticles(newsMarqueeData)
  //   }
  // }, [newsMarqueeLoading, newsMarqueeError, newsFeaturedData]);

  return (
    <div>

      <div className='newWrapper bbp-w-100'>
        <NewsMarquee articles={newsMarqueeData && Object.entries(newsMarqueeData)} />
      </div>

      <div className='newWrapper'>
        <div id="FeaturedNewsDiv" className="bbp-w-25">
          <HoverTracker pageName={window.location.pathname} user={userInfo.name} controlId="NewsFeatured">
            <NewsFeatured articles={newsFeaturedData && Object.entries(newsFeaturedData[0])} />
          </HoverTracker>
        </div>
        <div id="FeaturedSlidesNewsDiv" className="bbp-w-50">
          <HoverTracker pageName={window.location.pathname} user={userInfo.name} controlId="NewsSlider">
            <NewsSlider articles={newsFeaturedSlideData && Object.entries(newsFeaturedSlideData)} />
          </HoverTracker>
        </div>
        <div id="TrendingLatestNewsDiv" className="bbp-w-25">
          <Tabs>
            <TabList>
              <Tab>Latest</Tab>
              <Tab>Trending</Tab>
            </TabList>
            <TabPanel>
              <HoverTracker pageName={window.location.pathname} user={userInfo.name} controlId="NewsLatest">
                <NewsLatest articles={newsLatestData && Object.entries(newsLatestData)} />
              </HoverTracker>
            </TabPanel>
            <TabPanel>
              <HoverTracker pageName={window.location.pathname} user={userInfo.name} controlId="NewsTrending">
                <NewsTrending articles={newsTrendingData && Object.entries(newsTrendingData)} />
              </HoverTracker>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>

  );
};
export default NewsScreen;