import { Container, Card, Button, Form } from 'react-bootstrap';
import HoverAnalyticsDisplay from '../components/webstatistics/HoverAnalyticsDisplay/HoverAnalyticsDisplay';
import FormContainer from '../components/FormContainer';

const Consent = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>BBPRIME Consent</h1>
          <p className='text-center mb-4'>
            Consent stuff Goes Here
          </p>

          <FormContainer>
              <Form >
                <Form.Group controlId='prolificID'>
                  <Form.Label>Prolific ID</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Prolific ID'

                  ></Form.Control>
                </Form.Group>
              </Form>
            </FormContainer>

          <Button variant='primary' href='/instructions' className='me-3'>
            I Totally Agree!!
          </Button>

        </Card>
        <HoverAnalyticsDisplay />
      </Container>

    </div>
  );
};

export default Consent;