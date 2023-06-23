export interface User {
  userData: {
    createdAt: Date,
    email: string,    
    follow: Follow,
    id: number,
    posts: Post[],
    username: string,
    picture: string
    }
    accessToken: string,
  }
export interface UserDB {
  createdAt: Date,
    email: string,    
    follow: Follow,
    id: number,
    posts: Post[],
    username: string,
    picture: string
}
export interface Post {
  authorId: number,
  comments: Comment[],
  createdAt: Date,
  description: string,
  details: string,
  id: number,
  ingredients: string,
  like: number,
  title: string,
  url: string
}
export interface Comment {
  text: string,
  authorId: number,
  postId: number,
  id: number,
  createdAt: Date
}
export interface Follow {
  id: number,
  createdAt: Date,
  userId : number,
  following_user_id: number,
  follower_user_id  : number
}
export interface Like {
  id: number,
  createdAt: Date,
  amount: number,
  userId : number,
  postId: number
}