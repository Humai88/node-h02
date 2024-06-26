import {db} from "../../src/db/db";
import { dataset1 } from "../mockData";
import {BlogsRepository} from "../../src/repositories/blogsRepository";

describe('BlogsRepository', () => {
  beforeEach(() => {
    db.blogs = dataset1.blogs;
  });

  test('getBlogs returns all blogs', () => {
    const blogs = BlogsRepository.getBlogs();
    expect(blogs.length).toBe(3);
  });

  test('findBlog returns correct blog with valid ID', () => {
    const blog = BlogsRepository.findBlog('1');
    expect(blog).toEqual({
      id: "1",
      name: "Blog 1",
      description: "Description for Blog 1",
      websiteUrl: "https://www.blog1.com",
    });
  });

  test('findBlog returns false with invalid ID', () => {
    const blog = BlogsRepository.findBlog('7');
    expect(blog).toBeFalsy();
  });

  test('createBlog adds a new blog', () => {
    const newBlog = {
      name: "Blog 8",
      description: "Description for Blog 8",
      websiteUrl: "https://www.blog1.com",
    };
    const createdBlog = BlogsRepository.createBlog(newBlog);
    expect(createdBlog).toHaveProperty('id');
    expect(db.blogs.length).toBe(4);
  });

  test('updateBlog updates blog correctly with valid ID', () => {
    const updatedBlog = {  name: "New Name",
      description: "Description for Blog 1",
      websiteUrl: "https://www.blog1.com",};
    const result = BlogsRepository.updateBlog('1', updatedBlog);
    expect(result).toBeTruthy();
    expect(db.blogs.find(blog => blog.id === '1')).toEqual({ id: '1', ...updatedBlog });
  });

  test('updateBlog returns false with invalid ID', () => {
    const result = BlogsRepository.updateBlog('5', {  name: "New Name",
      description: "Description for Blog 1",
      websiteUrl: "https://www.blog1.com",});
    expect(result).toBeFalsy();
  });

  test('deleteBlog removes blog with valid ID', () => {
    const result = BlogsRepository.deleteBlog('1');
    expect(result).toBeTruthy();
    expect(db.blogs.find(blog => blog.id === '1')).toBeUndefined();
  });

  test('deleteBlog returns false with invalid ID', () => {
    const result = BlogsRepository.deleteBlog('5');
    expect(result).toBeFalsy();
  });
});