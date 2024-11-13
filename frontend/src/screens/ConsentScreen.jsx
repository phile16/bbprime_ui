import { Container, Card, Button } from 'react-bootstrap';

const Consent = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>BBPRIME Consent</h1>
          <p className='text-center mb-4'>
            Consent stuff Goes Here
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/instructions' className='me-3'>
              I Totally Agree!!
            </Button>

          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Consent;