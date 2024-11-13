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
// @route   GET /api/news/:title
// @access  Public
const getNewsArticle = asyncHandler(async (req, res) => {
  const news = await News.find({"title": req.title});

  if (news) {
    res.json({
      title: newsList.title,
      summary: newsList.summary,
      content: newsList.content,
      category: newsList.category,
      location: newsList.location,
      visible: newsList.visible,
    });
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
// @route   UPDATE /api/news
// @access  Private
const updateNewsArticle = asyncHandler(async (req, res) => {
  const { title, summary, content, location, category, visible  } = req.body;
  var filter = {'title': title};

  const doc = await News.findOneAndUpdate(filter, req.body, { upsert: true, new: true });
  return res.send('Succesfully Updated News Article.')
});

// @desc    Delete News Article
// @route   DELETE /api/news
// @access  Private
const deleteNewsArticle = asyncHandler(async (req, res) => {
  const { title, summary, content, location, category, visible  } = req.body;
  const newsExists = await News.find({ 'title': title });

  if (newsExists) {
    const news = await News.find({ 'title': title }).remove().exec();
    return res.send('Succesfully Deleted.')
  }
});


export {
  deleteNewsArticle,
  getNewsArticle,
  getNewsArticleList,
  postNewsArticle,
  updateNewsArticle,
};
