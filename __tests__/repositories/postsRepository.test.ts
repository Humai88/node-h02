
import { db } from "../../src/db/db";
import { dataset1 } from "../mockData";
import {PostsRepository} from "../../src/repositories/postsRepository";

describe('PostsRepository', () => {
  beforeEach(() => {
    db.posts = dataset1.posts; 
    db.blogs = dataset1.blogs;
  });

  test('getPosts returns all posts', () => {
    const posts = PostsRepository.getPosts();
    expect(posts.length).toBe(dataset1.posts.length); 
  });

  test('findPost returns correct post with valid ID', () => {
    const validPostId = dataset1.posts[0].id; 
    const post = PostsRepository.findPost(validPostId);
    expect(post).toEqual(dataset1.posts[0]);
  });

  test('findPost returns false with invalid ID', () => {
    const post = PostsRepository.findPost('invalid_id');
    expect(post).toBeFalsy();
  });

  test('createPost adds a new post', () => {
    const newPost = {
      blogId: "1", 
      title: "New Post",
      content: "Content of the new post",
      shortDescription: "Short description of the new post",
    };
    const createdPost = PostsRepository.createPost(newPost);
    expect(createdPost).toHaveProperty('id');
    expect(createdPost).toHaveProperty('blogName');
    expect(db.posts.length).toBe(dataset1.posts.length + 1);
  });

  test('updatePost updates post correctly with valid ID', () => {
    const validPostId = "1";
    const updatedPost = {
      blogId: "1", 
      title: "Updated Post",
      content: "Updated content",
      shortDescription: "Short description of the new post",
    };
    const result = PostsRepository.updatePost(validPostId, updatedPost);
    expect(result).toBeTruthy();
    expect(db.posts.find(post => post.id === validPostId)).toEqual({ id: validPostId, ...updatedPost, blogName: expect.any(String), createdAt: "011-10-05T14:48:00.000Z"});
  });

  test('updatePost returns false with invalid ID', () => {
    const result = PostsRepository.updatePost('invalid_id', {
      blogId: "1",
      title: "Shouldn't Work",
      content: "This shouldn't update anything",
      shortDescription: "Short description of the new post",
    });
    expect(result).toBeFalsy();
  });

  test('deletePost removes post with valid ID', () => {
    const validPostId = dataset1.posts[0].id;
    const result = PostsRepository.deletePost(validPostId);
    expect(result).toBeTruthy();
    expect(db.posts.find(post => post.id === validPostId)).toBeUndefined();
  });

  test('deletePost returns false with invalid ID', () => {
    const result = PostsRepository.deletePost('invalid_id');
    expect(result).toBeFalsy();
  });
});