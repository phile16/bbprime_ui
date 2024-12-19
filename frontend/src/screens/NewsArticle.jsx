import { Container, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";


function NewsFeatured(props) {
  let { id } = useParams(); 

  useEffect(() => {
      console.log(`/something/${id}`);
  },[]);
    
  return (
    <div className=''>
      <Container className=''>
        <div className='bbp-news-article'>

        </div>
      </Container>
    </div>
  );
};

export default NewsFeatured;