import { Container, Card, Button } from 'react-bootstrap';
import { useState, useEffect, useRef  } from 'react';
import parse from 'html-react-parser';



function NewsFeatured({ articles }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('*');
      elements.forEach((element, index) => {
        element.id = `element-${index}`;
      });
    }
  }, []);

  return (
    <div className=''>
      <Container className=''>
        <div className='bbp-news-featured'>
          <h3 className='' id={articles && "NewsFeatured_" + (articles[0][1] + "_" + "_title").replace(/[^a-z0-9]/gi, '_')}>{articles && articles[0][1]}</h3>
          <div id={articles && "NewsLatest_" + (articles[0][1] + "_" + "_text").replace(/[^a-z0-9]/gi, '_')} ref={containerRef}>
              {articles &&  parse(articles[2][1])}
          </div>

        </div>
      </Container>
    </div>
  );
};

export default NewsFeatured;