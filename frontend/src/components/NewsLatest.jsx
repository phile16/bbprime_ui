import { Container, Card, Button } from 'react-bootstrap';
import parse from 'html-react-parser';

const NewsLatest = ({ articles }) => {
  return (
    <div className=''>
      <Container className=''>
        {articles &&
          articles.map((article, index) => (
            <div key={index + "_NewsLatest_" + article[1]["title"]}>
              <Card className="">
                <h3 className='' id={"NewsLatest_" + (article[1]["title"] + "_" + "_title").replace(/[^a-z0-9]/gi, '_')}>{article[1]["title"]}</h3>
                <div id={"NewsLatest_" + (article[1]["title"] + "_" + "_text").replace(/[^a-z0-9]/gi, '_')}>
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

export default NewsLatest;