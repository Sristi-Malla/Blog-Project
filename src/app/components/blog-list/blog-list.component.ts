import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  blogs?: Blog[];
  currentBlog: Blog = {};
  currentIndex = -1;
  title = '';

  constructor(private blogservice: BlogService) { }

  ngOnInit(): void {
    this.retrieveBlogs();
  }
  retrieveBlogs(): void {
    this.blogservice.getAll()
      .subscribe({
        next: (data) => {
          this.blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveBlogs();
    this.currentBlog = {};
    this.currentIndex = -1;
  }

  setActiveBlog(blog: Blog, index: number): void {
    this.currentBlog = blog;
    this.currentIndex = index;
  }

  removeAllBlogs(): void {
    this.blogservice.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchTitle(): void {
    this.currentBlog = {};
    this.currentIndex = -1;

    this.blogservice.findByTitle(this.title)
      .subscribe({
        next: (data) => {
          this.blogs = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
