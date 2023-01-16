import Article from '../models/Article';

export interface GetAllArticlesResponse {
  articles: Article[];
}
export interface NewArticleRequest {
  title: string;
  content: string;
  publish_date: Date;
}

export interface NewArticleResponse {
  newArticle: Article;
}
