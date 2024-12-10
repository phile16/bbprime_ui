import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNewsGetListMutation, useNewsCreateMutation, useNewsUpdateMutation, useNewsGetMutation, useNewsDeleteMutation } from '../slices/newsApiSlice';

const NewsEditorScreen = () => {
  // Quill Setup
  const { quill, quillRef } = useQuill({ placeholder: "Enter Content" });
  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log(quill.root.innerHTML); // Get innerHTML using quill
        setContent(quill.root.innerHTML);

      });
    }
  }, [quill]);

  //States
  const [articleId, setArticleId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [visible, setVisible] = useState(false);

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

  //When articleId changes, get article
  useEffect(() => {
    const fetchNewsArticle = () => {
      getNewsArticle({ articleId });
    }
    if (articleId !== undefined) {
      fetchNewsArticle();
    }
  }, [articleId]);

  useEffect(() => {
    if (newsData) {
      setArticleId(newsData.articleId);
      setTitle(newsData.title);
      setSummary(newsData.summary);
      setContent(newsData.content);
      setCategory(newsData.category);
      setLocation(newsData.location);
      setVisible(newsData.visible);

      // Content Editor
      quill.root.innerHTML = newsData.content;
    }
  }, [newsData]);

  //Handlers
  const changeArticleId = async event => {
    setArticleId("");
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("");
    setLocation("");
    setVisible("");
    setArticleId(event.target.value);
  };

  const clearFormHandler = async (e) => {
    setArticleId("");
    setTitle("");
    setSummary("");
    setContent("");
    setCategory("");
    setLocation("");
    setVisible("");
    document.getElementById("selectArticleIdForm").reset();
    document.getElementById("articleIdForm").reset();
  }

  const locationChangeHandler = async (e) => {
    var result = [];
    var options = e.target && e.target.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }
    setLocation(result);
  }

  //News Article CRUD Handlers
  const saveArticleHandler = async (e) => {
    e.preventDefault();
    if (title != "") {
      if (articleId == "" || articleId === undefined) {

        setContent(quill.root.innerHTML);

        try {
          const res = saveNewsArticle({
            title,
            summary,
            content,
            category,
            location,
            visible,
          }).unwrap();
          getNewsArticleList();
          setArticleId(res.articleId);
          // dispatch(useNewsCreateMutation(res));
          toast.success('News article created successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      } else {
        try {
          updateNewsArticle({
            articleId,
            title,
            summary,
            content,
            category,
            location,
            visible,
          });
          toast.success('News article updated successfully');
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }

      }
    }
  };

  const deleteArticleHandler = async (e) => {
    if (articleId != "") {
      try {
        deleteNewsArticle({ articleId });
        setArticleId("");
        setTitle("");
        setSummary("");
        setContent("");
        setCategory("");
        setLocation("");
        setVisible("");
        document.getElementById("selectArticleIdForm").reset();
        document.getElementById("articleIdForm").reset();
        getNewsArticleList();
        toast.success('News article deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  }

  return (

    <FormContainer>

      <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
      <h1>Manage News Articles</h1>
      <Form className="sidebar" id='selectArticleIdForm'>
        <h3>Select Article to Edit</h3>

        <select value={articleId} size="5" onChange={changeArticleId} className="sidebar-select">

          {newsListData ?
            newsListData.map((article, index) => {
              return (
                <option value={article._id}>{article.title}</option>
              )
            })
            : <p>nada</p>
          }
        </select>

      </Form>


      <Form onSubmit={saveArticleHandler} id='articleIdForm' className="news-editor">
        <Form.Group controlId='articleId'>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type='text'
            placeholder='News Article ID'
            value={articleId}
          ></Form.Control>
        </Form.Group>
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
          <div style={{ width: '100%', height: '100%', border: '1px solid lightgray' }} id='content' className='clearfix'>
            <div ref={quillRef}>
            </div>
          </div>
        </Form.Group>


        {/* <Form.Group className='my-2' controlId='content'>
          <Form.Label>Content</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Form.Control>
        </Form.Group> */}


        <Form.Group className='clearfix' controlId='category'>
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
          <select value={location} onChange={locationChangeHandler} multiple>
            <option value="Marquee">Marquee</option>
            <option value="Featured">Featured</option>
            <option value="FeaturedSlide">Slides</option>
            <option value="Latest">Latest</option>
            <option value="Trending">Latest</option>
          </select>
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
        &nbsp;
        <Button onClick={clearFormHandler} variant='primary' className='mt-3'>
          Clear
        </Button>
        &nbsp;
        <Button onClick={deleteArticleHandler} variant='primary' className='mt-3'>
          Delete
        </Button>

        {isSaving && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default NewsEditorScreen;
