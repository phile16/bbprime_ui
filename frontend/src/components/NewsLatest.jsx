import { Container, Card, Button } from 'react-bootstrap';

const NewsLatest= () => {
  return (
    <div className=''>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>News Latest</h1>
          <p className='text-center mb-4'>
            Topics
            -- SubTopic
          </p>

        </Card>
      </Container>
    </div>
  );
};

export default NewsLatest;