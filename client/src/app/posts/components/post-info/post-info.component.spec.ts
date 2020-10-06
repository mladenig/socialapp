import { CommentsService } from "./../../../comments/comments.service";
import { NotificatorService } from "./../../../core/services/notificator.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PostCommentComponent } from "../../../comments/components/post-comment/post-comment.component";
import { SingleCommentComponent } from "../../../comments/components/single-comment/single-comment.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { SinglePostWithCommentsDTO } from "../models/post-with-comments.dto";
import { Observable, of } from "rxjs";
import { PostsService } from "../../posts.service";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PostInfoComponent } from "./post-info.component";
import { MockComponent, MockedComponent, MockRender } from "ng-mocks";
import { HttpClientModule } from "@angular/common/http";
import { ToastrService, ToastrModule } from "ngx-toastr";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

const InitialMockSinglePost = {
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
  },
  comments: [],
  img: "https://i.imgur.com/kmHl4WF.png",
  isPublic: false,
  allLikes: 0
};

let mockSinglePost: SinglePostWithCommentsDTO = {
  ...(InitialMockSinglePost as any)
};

export class MockPostService extends PostsService {
  getSinglePost(id: number): Observable<SinglePostWithCommentsDTO> {
    return of(mockSinglePost);
  }

  likePost(postId: number): Observable<SinglePostWithCommentsDTO> {
    return of(null);
  }
}

describe("PostInfoComponent", () => {
  let component: PostInfoComponent;
  let fixture: ComponentFixture<PostInfoComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PostInfoComponent,
        MockComponent(SingleCommentComponent),
        MockComponent(PostCommentComponent)
      ],
      providers: [
        NotificatorService,
        {
          provide: CommentsService,
          useValue: {
            createComment: (data, id) => {
              return of(null);
            }
          }
        },
        {
          provide: PostsService,
          useClass: MockPostService
        },
        {
          provide: Router,
          useValue: {
            navigate(data) {}
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                postInfo: mockSinglePost
              }
            }
          }
        }
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInfoComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    element = fixture.nativeElement; // The HTML reference
    mockSinglePost = { ...(InitialMockSinglePost as any) };
  });

  it("should be defined", () => {
    expect(component).toBeDefined();
  });

  it("Should match user username with card header title", () => {
    const titleElement = element.querySelector(".Instagram-card-user-name");
    expect(titleElement.textContent).toContain(mockSinglePost.user.username);
  });

  it("Should like a post", () => {
    mockSinglePost = {
      ...mockSinglePost,
      allLikes: mockSinglePost.allLikes + 1
    };

    const likeSpy = spyOn(component, "likePost").and.callThrough();
    const loadSpy = spyOn(component, "loadPost").and.callThrough();
    const link = fixture.debugElement.nativeElement.querySelector(
      ".footer-action-icons.like"
    );

    const likes = fixture.debugElement.nativeElement.querySelector(
      ".likes-data"
    );

    const likesBefore = likes.textContent.trim();

    link.click();

    fixture.detectChanges();

    expect(likeSpy).toHaveBeenCalled();
    expect(likeSpy).toBeCalledTimes(1);
    expect(loadSpy).toHaveBeenCalled();
    expect(loadSpy).toBeCalledTimes(1);
    expect(likesBefore).not.toEqual(likes.textContent.trim());
  });

  it("Should create new comment", async () => {
    const comment = {
      id: 61,
      comment: "ghgjfhg",
      createdAt: "2019-12-15T13:04:49.129Z",
      user: {
        id: 1,
        username: "mladen",
        profilePic: "https://i.imgur.com/BYWRcbt.png"
      }
    };

    mockSinglePost = {
      ...mockSinglePost,
      comments: [comment as any]
    };

    const postCommentSpy = spyOn(component, "postComment").and.callThrough();
    const loadSpy = spyOn(component, "loadPost").and.callThrough();
    const mockedComponent = fixture.debugElement.query(
      By.directive(PostCommentComponent)
    ).componentInstance as PostCommentComponent; // casting to retain type safety

    mockedComponent.submitComment.emit({
      comment: comment.comment
    });

    expect(postCommentSpy).toHaveBeenCalledWith({
      comment: comment.comment
    });
    expect(postCommentSpy).toBeCalledTimes(1);

    fixture.detectChanges();

    expect(component.postData.comments.length).toEqual(
      mockSinglePost.comments.length
    );
    expect(loadSpy).toHaveBeenCalled();
    expect(loadSpy).toBeCalledTimes(1);
  });
});
