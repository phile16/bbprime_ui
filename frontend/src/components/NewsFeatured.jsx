import { Container, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';

// const NewsFeatured = ({articles}) => {
function NewsFeatured({ articles }) {
  return (
    <div className=''>
      <Container className=''>
        <div className='bbp-news-featured'>
          <h3>{articles && articles[0][1]}</h3>
          <div>
              {articles &&  parse(articles[2][1])}
          </div>

        </div>
      </Container>
    </div>
  );
};

export default NewsFeatured;