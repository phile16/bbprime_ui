import { Container, Card, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import parse from 'html-react-parser';

function NewsFeatured({ articles }) {
  const containerRef = useRef(null);
  // Add ID's to elements in the article content
  // This really is some grandular tracking... 
  // Put "containerRef" on whatever container we want to break elements id down for
  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('*');
      elements.forEach((element, index) => {
        element.id = containerRef.current.id + `-${index}-${element.tagName}`;
      });
    }
  }, []);

  return (
    <div className=''>
      <Container className=''>
        <div className='bbp-news-featured'>
          <h3 className='' id={articles && "NewsFeatured_" + (articles[0][1]).replace(/[^a-z0-9]/gi, '') + "_title"}>{articles && articles[0][1]}</h3>
          <div id={articles && "NewsFeatured_" + (articles[0][1]).replace(/[^a-z0-9]/gi, '') + "_content"} ref={containerRef}>
            {articles && parse(articles[2][1])}
          </div>

        </div>
      </Container>
    </div>
  );
};

export default NewsFeatured;