import { Container, Card, Button } from 'react-bootstrap';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const NewsMarquee = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div >
        <Carousel 
            responsive={responsive}
            autoPlay={true}
            autoPlaySpeed={3000}
            infinite={true}
          >
          <div>
            <Card className=''>
              <h3 className='text-center mb-4'>News Header 1</h3>
              <p className='text-center mb-4'>
                  News Item 1
              </p>
            </Card>
          </div>
          <div>
            <Card className=''>
              <h3 className='text-center mb-4'>News Header 2</h3>
              <p className='text-center mb-4'>
                  News Item 2
              </p>
            </Card>
          </div>
          <div>
            <Card className=''>
              <h3 className='text-center mb-4'>News Header 3</h3>
              <p className='text-center mb-4'>
                  News Item 3
              </p>
            </Card>
          </div>
          <div>
            <Card className=''>
              <h3 className='text-center mb-4'>News Header 4</h3>
              <p className='text-center mb-4'>
                  News Item 4
              </p>
            </Card>
          </div>
          <div>
            <Card className=''>
              <h3 className='text-center mb-4'>News Header 5</h3>
              <p className='text-center mb-4'>
                  News Item 5
              </p>
            </Card>
          </div>                              
        </Carousel>
    </div>
  );
};

export default NewsMarquee;