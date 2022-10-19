import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  blog: Blog = {
    title: '',
    description: '',
    published: false
  };
  submitted = false;

  constructor(private blogservice: BlogService) { }

  ngOnInit(): void {
  }
  saveBlog(): void {
    const data = {
      title: this.blog.title,
      description: this.blog.description
    };

    this.blogservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newBlog(): void {
    this.submitted = false;
    this.blog = {
      title: '',
      description: '',
      published: false
    };
  }

}
