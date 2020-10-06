import { SinglePostWithCommentsDTO } from "./components/models/post-with-comments.dto";
import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

import { PostsService } from "./posts.service";

const InitialMockSinglePost: SinglePostWithCommentsDTO = {
  id: 20,
  title: "Modified pic 2",
  description: "gfgfgfgf",
  user: {
    id: 1,
    username: "mladen",
    email: "mladen@mladen.com",
    bio: null,
    profilePic: "https://i.imgur.com/BYWRcbt.png",
    followersCount: 1,
    followingCount: 2
  } as any,
  comments: [],
  img: "https://i.imgur.com/kmHl4WF.png",
  isPublic: false,
  allLikes: 0
} as SinglePostWithCommentsDTO;

fdescribe("PostsService", () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  // it("should be created", () => {
  //   expect(service).toBeTruthy();
  // });

  it("should get all posts", () => {
    const mockPosts: SinglePostWithCommentsDTO[] = [
      {
        ...InitialMockSinglePost,
        title: "Post 1",
        id: 1
      },
      {
        ...InitialMockSinglePost,
        title: "Post 2",
        id: 2
      }
    ];
    const page = {
      skip: 0,
      take: 2
    };
    const url = `api/posts/?skip=${page.skip}&take=${page.take}`;
    httpClient.get<SinglePostWithCommentsDTO[]>(url).subscribe(result => {
      expect(result).toEqual(mockPosts);
      expect(result.length).toEqual(page.take);
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual("GET");

    req.flush(mockPosts);
  });

  it("should get single post", () => {
    const mockPosts: SinglePostWithCommentsDTO = {
      ...InitialMockSinglePost,
      title: "Post 1",
      id: 1
    };
    const page = {
      skip: 0,
      take: 2
    };
    const url = `api/posts/?skip=${page.skip}&take=${page.take}`;
    httpClient.get<SinglePostWithCommentsDTO[]>(url).subscribe(result => {
      expect(result).toEqual(mockPosts);
      expect(result.length).toEqual(page.take);
    });

    const req = httpTestingController.expectOne(url);

    expect(req.request.method).toEqual("GET");

    req.flush(mockPosts);
  });
});
