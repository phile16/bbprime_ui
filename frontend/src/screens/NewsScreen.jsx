import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import News from '../components/News';
import NewsMarquee from '../components/NewsMarquee';
import NewsFeatured from '../components/NewsFeatured';
import NewsSlider from '../components/NewsSlider';
import NewsLatest from '../components/NewsLatest';
import NewsTrending from '../components/NewsTrending';
// import { useMediaQuery } from 'react-responsive';


// const isDesktop = useMediaQuery({ minWidth: 1224 });
// const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1223 });
// const isMobile = useMediaQuery({ maxWidth: 767 });
// const isPortrait = useMediaQuery({ orientation: 'portrait' });

const NewsScreen = () => {
  return (
    <div>

      <div className='newWrapper bbp-w-100'>
        <NewsMarquee />
      </div>

      <div className='newWrapper'>
        <div id="FeaturedNewsDiv" classname="bbp-w-25">
          <NewsFeatured />
        </div>
        <div id="MajorNewsDiv" classname="bbp-w-50">
          <NewsSlider />
        </div>
        <div id="TrendingLatestNewsDiv" classname="bbp-w-25">
          <Tabs>
            <TabList>
              <Tab>Latest</Tab>
              <Tab>Trending</Tab>
            </TabList>
            <TabPanel>
              <NewsLatest />
            </TabPanel>
            <TabPanel>
              <NewsTrending />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>

  );
};
export default NewsScreen;