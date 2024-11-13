import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNewsGetListMutation, useNewsCreateMutation } from '../slices/newsApiSlice';

const NewsEditorScreen = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [visible, setVisible] = useState(false);

  const [newsList, setNewsList] = useState();

  const dispatch = useDispatch();

  const [saveNewsArticle, { isSaving }] = useNewsCreateMutation();
  const [getNewsArticleList, { data: naData, loading: naLoading, error: naError }] = useNewsGetListMutation();

  useEffect(() => {
    //getNewsArticleList()
    const fetchData = async () => {
      await getNewsArticleList();
      }
      
      fetchData();
  }, []);

  // console.log(naData);

  // useEffect(() => {
  //   setTitle(news.title);
  //   setSummary(news.summary);
  //   setContent(news.content);
  //   setCategory(news.category);
  //   setLocation(news.location);
  //   setVisible(news.visible);
  // }, [news.title, news.summary, news.content, news.category, news.location, news.visible]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (title != ""){
      try {
        const res = await saveNewsArticle({
          title,
          summary,
          content,  
          category,
          location,
          visible,
        }).unwrap();
        console.log(res);
        dispatch(useNewsCreateMutation(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (


    <FormContainer>
      <h1>Select Article</h1>
      <Form> 
        <Form.Label>Title</Form.Label>
        <div className="scroll-container">

          {naData ? <p> {JSON.stringify(naData)}  </p>: <p>nada</p>}

        </div>
      </Form>


      <h1>Create News Article</h1>
      <Form onSubmit={submitHandler}> 
        <Form.Group className='my-2' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='title'
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='summary'>
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type='summary'
            placeholder='Enter summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='content'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            type='content'
            placeholder='Enter content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='category'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='location'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='location'
            placeholder='Enter location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='visible'>
          <Form.Label>Visibility</Form.Label>
          <Form.Check
            type='checkbox'
            placeholder='Visible'
            value={visible}
            onChange={(e) => setVisible(e.target.value)}
          ></Form.Check>
        </Form.Group>


        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>

        {isSaving && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default NewsEditorScreen;
