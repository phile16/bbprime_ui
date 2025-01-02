import { Container, Card, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import HoverAnalyticsDisplay from '../components/webstatistics/HoverAnalyticsDisplay/HoverAnalyticsDisplay';
import { TimeOnPageTracker } from '../components/webstatistics/TimeOnPageTracker/TimeOnPageTracker';


const Consent = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [pid, setPid] = useState("");

  useEffect(() => {
    sessionStorage.setItem("sPid", pid);
  }, [pid]);


  return (
    <div className=''>
      <TimeOnPageTracker pageName="Consent" user={userInfo.name} pid="" />
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
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </FormContainer>

          <Button variant='primary' href='/instructions' className='me-3'>
            I Totally Agree!!
          </Button>

        </Card>
      </Container>

    </div>
  );
};

export default Consent;