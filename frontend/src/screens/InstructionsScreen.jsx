import { Container, Card, Button } from 'react-bootstrap';

const Instructions = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>BBPRIME Instructions</h1>
          <p className='text-center mb-4'>
            Instructions stuff Goes Here
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/news' className='me-3'>
              I Understand!
            </Button>

          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Instructions;