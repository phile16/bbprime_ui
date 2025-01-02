import { Container, Card, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const NewsSlider = ({ articles }) => {
  const containerRef = useRef(null);
  // Add ID's to elements in the article content
  // This really is some grandular tracking... 
  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('*');
      elements.forEach((element, index) => {
        element.id = containerRef.current.id + `-${index}-${element.tagName}`;
        console.log(element.id);
      });
    }
  }, [articles]);



  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div >
      <Container >
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
        >
          {articles &&
            articles.map((article, index) => (
              <div key={"NewsSliderDiv_" + index}>
                <Card className="bbp-news-slides">
                  <h3 className='' id={"NewsSlider_" + (article[1]["title"]).replace(/[^a-z0-9]/gi, '') + "_title"}>{article[1]["title"]}</h3>
                  <div id={"NewsSlider_" + (article[1]["title"]).replace(/[^a-z0-9]/gi, '') + "_content"} ref={containerRef}>
                    {parse(article[1]["content"])}
                  </div>

                </Card>
              </div>

            ))
          }
          {!articles &&
            <div>
              <Card>
                <h3 className='text-center mb-4'>Loading, please wait...</h3>
              </Card>
            </div>
          }

        </Carousel>
      </Container>
    </div>
  );
};

export default NewsSlider;