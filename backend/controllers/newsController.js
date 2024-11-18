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
// @route   GET /api/news/:id
// @access  Public
const getNewsArticle = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);

  if (news) {
    res.json({
      id: news._id,
      title: news.title,
      summary: news.summary,
      content: news.content,
      category: news.category,
      location: news.location,
      visible: news.visible,
    });
    // res.send();
  } else {
    res.status(404);
    throw new Error('News article not found');
  }
});


// @desc    Create News Article
// @route   POST /api/news
// @access  Private
const postNewsArticle = asyncHandler(async (req, res) => {
  const { title, summary, content, location, category, visible  } = req.body;
  var filter = {'title': title};
  const doc = await News.findOneAndUpdate(filter, req.body, { upsert: true, new: true });
  return res.send('Succesfully Created News Article.')

});


// @desc    Update News Article
// @route   UPDATE /api/news/:id
// @access  Private
const updateNewsArticle = asyncHandler(async (req, res) => {
  const { title, summary, content, location, category, visible  } = req.body;
  var filter = { _id: req.params.id };
  const doc = await News.findOneAndUpdate(filter, req.body, { upsert: true, new: true });
  return res.send('Succesfully Updated News Article.')
});

// @desc    Delete News Article
// @route   DELETE /api/news/:id
// @access  Private
const deleteNewsArticle = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id).remove().exec();
  return res.send('Succesfully Updated News Article.')
});


export {
  deleteNewsArticle,
  getNewsArticle,
  getNewsArticleList,
  postNewsArticle,
  updateNewsArticle,
};
