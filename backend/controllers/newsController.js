import asyncHandler from 'express-async-handler';
import News from '../models/newsModel.js';


// @desc    Get List of News Article
// @route   GET /api/news/
// @access  Public
const getNewsArticleList = asyncHandler(async (req, res) => {
  const newsList = await News.find();
  
  var newsListMap = {}

  if (newsList) {
    newsList.forEach(function(news) {
      newsListMap[news.title] = news;
    });

    res.send(newsList);
    
  } else {
    res.status(404);
    throw new Error('News articles not found');
  }
});

// @desc    Get News Article
// @route   GET /api/news/:articleId
// @access  Public
const getNewsArticle = asyncHandler(async (req, res) => { 
  // console.log(req.params)
  const news = await News.findById(req.params.id);

  if (news) {
    res.json({
      articleId: news._id,
      title: news.title,
      summary: news.summary,
      content: news.content,
      category: news.category,
      location: news.location,
      visible: news.visible,
    });
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});

// @desc    Get News Article By Location
// @route   GET /api/news/location/:location
// @access  Public
const getNewsArticleByLocation = asyncHandler(async (req, res) => { 
  // console.log(req.params)
  var filter = {'location': req.params.location, "visible": true};
  const newsList = await News.find(filter);

  var newsListMap = {}

  if (newsList) {
    newsList.forEach(function(news, index) {
      news = {
        "title": news.title,
        "summary": news.summary,
        "content": news.content,
        "category": news.category,
        "articleId": news._id,
      }
      newsListMap[index] = news;
    });

    res.send(newsListMap);
    
  } else {
    res.status(404);
    throw new Error('News articles not found');
  }


  // if (news) {
  //   res.json({
  //     articleId: news._id,
  //     title: news.title,
  //     summary: news.summary,
  //     content: news.content,
  //     category: news.category,
  //     location: news.location,
  //     visible: news.visible,
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error('News article not found');
  // }
});


// @desc    Create News Article
// @route   POST /api/news
// @access  Private
const postNewsArticle = asyncHandler(async (req, res) => {
  const { title, summary, content, location, category, visible  } = req.body;
  var filter = {'title': title};
  const news = await News.findOneAndUpdate(filter, req.body, { upsert: true, new: true });
  // console.log(news);
  // if (news) {
  //   // return res.send('Succesfully Created News Article.')
  //   return res.json({"articleId":news._id})
  // } else  {
  //   res.status(404);
  //   return res.send('Failed to create news article.')

  // }
});


// @desc    Update News Article
// @route   UPDATE /api/news/:articleId
// @access  Private
const updateNewsArticle = asyncHandler(async (req, res) => {
  const { articleId, title, summary, content, location, category, visible  } = req.body;
  var filter = { _id: req.params.articleId };
  var updatedDoc = {
    title: title,
    summary: summary,
    content: content,
    category: category,
    location: location,
    visible: visible,
  }
  const news = await News.findByIdAndUpdate(articleId, updatedDoc);
  if (news) {
    return res.send('Succesfully Updated News Article.')
  } else {
    res.status(404);
    throw new Error('Update failed, news article not found');    
  }
  
});

// @desc    Delete News Article
// @route   DELETE /api/news/:articleId
// @access  Private
const deleteNewsArticle = asyncHandler(async (req, res) => {
  const news = await News.findByIdAndDelete(req.params.articleId);
  console.log(news);
  // if (news) {
  //   return res.send('Succesfully Deleted News Article.')
  // } else {
  //   res.status(404);
  //   throw new Error('Delete failed, news article not found');    
  // }
});


export {
  deleteNewsArticle,
  getNewsArticle,
  getNewsArticleList,
  postNewsArticle,
  updateNewsArticle,
  getNewsArticleByLocation,
};
