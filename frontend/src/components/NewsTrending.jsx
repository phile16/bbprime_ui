import { Container, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';

const NewsTrending = ({ articles }) => {
  return (
    <div className=''>
      <Container className=''>
        {articles &&
          articles.map((article, index) => (
            <div key={index + "_NewsTrending_" + article[1]["title"]} id={"NewsTrending_" + article[1]["title"]}>
              <Card className="">
                <h3 className=''>{article[1]["title"]}</h3>
                <div>
                  {parse(article[1]["summary"])}
                </div>
              </Card>
            </div>

          ))
        }
        {!articles &&
          <div>
            <Card>
              <h3 className=''>Loading, please wait...</h3>
            </Card>
          </div>
        }
      </Container>
    </div>
  );
};

export default NewsTrending;