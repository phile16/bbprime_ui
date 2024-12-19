import express from 'express';
import {
  postNewsArticle,
  deleteNewsArticle,
  updateNewsArticle,
  getNewsArticleList,
  getNewsArticle,
  getNewsArticleByLocation,
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';

const newsRouter = express.Router();

// TODO: Move  back to protected after user stuff
newsRouter.post('/', postNewsArticle);
newsRouter.put('/:id', updateNewsArticle);
newsRouter.delete('/:articleId', deleteNewsArticle);
newsRouter.get('/', getNewsArticleList);
newsRouter.get('/:id', getNewsArticle);
newsRouter.get('/location/:location', getNewsArticleByLocation);


// TODO: Dodnt forget to put protections back on
// newsRouter
//   .route('/api/news')
//     .post(protect, postNewsArticle)
//     .delete(protect, deleteNewsArticle)
//     .put(protect, updateNewsArticle);

export default newsRouter;
