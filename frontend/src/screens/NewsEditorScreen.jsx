import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNewsGetListMutation, useNewsCreateMutation, useNewsUpdateMutation, useNewsGetMutation, useNewsDeleteMutation } from '../slices/newsApiSlice';

const NewsEditorScreen = () => {
  //States
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState('');

  //Misc
  const dispatch = useDispatch();

  //Mutations
  const [saveNewsArticle, { isSaving }] = useNewsCreateMutation();
  const [updateNewsArticle, { isUpdating }] = useNewsUpdateMutation();
  const [deleteNewsArticle, { isDeleting }] = useNewsDeleteMutation();
  const [getNewsArticleList, { data: newsListData, loading: newsListLoading, error: newsListError }] = useNewsGetListMutation();
  const [getNewsArticle, { data: newsData, loading: newsLoading, error: articleError }] = useNewsGetMutation();

  //useEffect
  //OnLoad get all news articles
  // Dont think I need useEffect here
  useEffect(() => {
    const fetchData = async () => {
      await getNewsArticleList();
    }
    fetchData();
  }, []);

  //When selectedArticle changes, get article
  useEffect(() => {
    const fetchNewsArticle = () => {
      getNewsArticle({id:selectedArticle});
    }
    fetchNewsArticle();
  }, [selectedArticle]);

  useEffect(() => {
    if (newsData){
      setTitle(newsData.title);
      setSummary(newsData.summary);
      setContent(newsData.content);
      setCategory(newsData.category);
      setLocation(newsData.location);
      setVisible(newsData.visible);
    }
  }, [newsData]);

  //Handlers
  const changeSelectedArticle = async event => {
    setSelectedArticle(event.target.value);
  };

  const saveArticleHandler = async (e) => {
    e.preventDefault();
    if (title != "") {
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
      <h1>Manage News Articles</h1>
      <Form  className="sidebar">
        <h3>Select Article to Edit</h3>

          <select  value={selectedArticle} size="5" onChange={changeSelectedArticle}>

          { newsListData ?
            newsListData.map((article, index) => {
              return(
                <option value={article._id}>{article.title}</option>
              )
            })
            : <p>nada</p>
          }
          </select>

      </Form>


      <Form onSubmit={saveArticleHandler} >
        <h2>Create News Article</h2>
        <Form.Group className='my-2' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='summary'>
          <Form.Label>Summary</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='content'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='location'>
          <Form.Label>Location</Form.Label>
          <Form.Control
            type='text'
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

        <Button type='submit' variant='primary' className='mt-3'>
          Clear
        </Button>

        <Button type='submit' variant='primary' className='mt-3'>
          Delete
        </Button>

        {isSaving && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default NewsEditorScreen;
