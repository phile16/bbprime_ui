import express from 'express';
import {
  postNewsArticle,
  deleteNewsArticle,
  updateNewsArticle,
  getNewsArticleList,
  getNewsArticle,
} from '../controllers/newsController.js';
import { protect } from '../middleware/authMiddleware.js';

const newsRouter = express.Router();

// TODO: Move  back to protected after test
newsRouter.post('/', postNewsArticle);
newsRouter.put('/', updateNewsArticle);
newsRouter.delete('/', deleteNewsArticle);
newsRouter.get('/', getNewsArticleList);
newsRouter.get('/:title', getNewsArticle);

// newsRouter
//   .route('/api/news')
//     .post(protect, postNewsArticle)
//     .delete(protect, deleteNewsArticle)
//     .put(protect, updateNewsArticle);

export default newsRouter;
