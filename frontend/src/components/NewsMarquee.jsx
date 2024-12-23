import { Container, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";




const NewsMarquee = ({ articles }) => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div >
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={3000}
        infinite={true}
        pauseOnHover={true}
        arrows={false}
      >

        {articles &&
          articles.map((article, index) => (
            <div key={"marqueeDiv_" + index}>
              <Card className='bbp-marquee-card' id={"marquee_" + article[1]["title"].replace(/[^a-z0-9]/gi, '_')+"_card"}>
              <p className="marqueeCategory" id={"marquee_" + article[1]["title"].replace(/[^a-z0-9]/gi, '_') + "_category"} >{article[1]["category"]}</p>
              <p className="marqueeTItle" id={"marquee_" + article[1]["title"].replace(/[^a-z0-9]/gi, '_') + "_title"} >{article[1]["title"]}</p>
              </Card>
            </div>

          ))
        }
        {!articles &&
          <div>
            <Card>
              <h4 className='text-center mb-4'>Loading, please wait...</h4>
            </Card>
          </div>
        }

      </Carousel>
    </div>
  );
};

export default NewsMarquee;