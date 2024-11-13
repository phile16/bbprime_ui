import { Container, Card, Button } from 'react-bootstrap';

const News = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>News Content will go here!</h1>
          <p className='text-center mb-4'>
            Topics
            -- SubTopic
          </p>

        </Card>
      </Container>
    </div>
  );
};

export default News;