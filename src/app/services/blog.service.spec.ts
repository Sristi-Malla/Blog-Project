import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { Blog } from '../models/blog.model';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('BlogService', () => {
  let service: BlogService;
  let httpCtrl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlogService]
    });
    service = TestBed.inject(BlogService);
    httpCtrl = TestBed.inject(HttpTestingController);
  });

  const BLOG_RESPONSE = [
    {
      "title": "Homemade Pumpkin Cream Cold Foam Cold Brew Coffee",
      "description": "Pumpkin cream cold foam is a mix of sweetened heavy cream with vanilla syrup and pumpkin sauce frothed together so it becomes velvety and thick but pourable. It’s nothing like the consistency of whipped cream, more of a thick, melted ice cream texture. If you live for pumpkin spice season, pumpkin cream cold foam is going to be your jam.\n\nTo be honest, pumpkin cream tastes amazing on all drinks and even as a sauce for ice cream or cake. Try it on: iced coffee, cold brew, hot coffee, espresso, lattes, and iced tea.Enjoy the pumpkin spice life!",
      "published": false,
      "id": 1
    },
    {
      "title": "Tiktok Pasta: Super Easy Baked Feta Pasta",
      "description": "The tiktok pasta everyone is talking about: baked feta pasta has it all, big bold flavors, creamy comfort, and carbs!\nBaked feta pasta is the perfect fall comfort food: it’s creamy, tomato-y, and SO damn delicious. It’s probably the simplest pasta dish you’ll make this month and the reward is so high for an incredibly low effort.\n\nWhat is this tiktok pasta trend?..\n\nIt’s super simple: cherry tomatoes are tossed with olive oil and placed in a baking dish with a block of feta. Everything gets baked up until the tomatoes burst, releasing their sweet and jammy flavors. The feta gets melty and oozy. You mix it all up into a quick sauce, toss in minced garlic, basil, crushed red pepper, and pasta. Boom, dinner is done!",
      "published": true,
      "id": 2
    }
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should return blogs from Http Get call.', () => {
    service.getAll()
      .subscribe({
        next: (response) => {
          expect(response).toBeTruthy();
          expect(response.length).toBeGreaterThan(1);
        }
      });

    const mockHttp = httpCtrl.expectOne("http://localhost:3000/blogs/");
    const httpRequest = mockHttp.request;

    expect(httpRequest.method).toEqual("GET");

    mockHttp.flush(BLOG_RESPONSE);
  });
  it('Should return error message for Blog Http request.', () => {
    service.getAll()
      .subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(error.status).withContext('status').toEqual(401);
        }
      });

    const mockHttp = httpCtrl.expectOne("http://localhost:3000/blogs/");
    const httpRequest = mockHttp.request;

    mockHttp.flush("error request", { status: 401, statusText: 'Unathorized access' });
  });
});
