import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import {UserPageComponent} from './user-page.component';
import {SharedModule} from '../../../shared/shared.module';
import {CommonModule} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';
import {UserPageResolverService} from './user-page-resolver.service';
import {UserInfoComponent} from '../user-info/user-info.component';
import {UserPostsComponent} from '../user-posts/user-posts.component';
import {UserFollowersComponent} from '../user-followers/user-followers.component';
import {UserFollowingComponent} from '../user-following/user-following.component';
import {UsersPageComponent} from '../users-page/users-page.component';
import {AuthService} from '../../../core/services/auth.service';
import {ActivatedRoute, Router, Routes} from '@angular/router';
import {AuthGuard} from '../../../auth/auth.guard';
import {NotificatorService} from '../../../core/services/notificator.service';
import {Role} from '../models/user-role.dto';
import {JwtModule} from '@auth0/angular-jwt';
import {BsModalService} from 'ngx-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../../../core/core.module';
import {BrowserModule} from '@angular/platform-browser';

describe('UserPageComponent', () => {
  let route;
  let authService;
  let toastr;
  let modalService;

  let fixture: ComponentFixture<UserPageComponent>;
  let component: UserPageComponent;
  let router: Router;
  const userRoutes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard],
      component: UsersPageComponent
    },
    {
      path: ':id',
      canActivate: [AuthGuard],
      component: UserPageComponent,
      resolve: { userInfo: UserPageResolverService }
    }
  ];
  beforeEach(async(() => {
    jest.clearAllMocks();

    route = {
      // default initialize with empty array of heroes
      data: of({
        userInfo: {
          id: 2,
          posts: [{id: 2}],
        },
      }),
    };

    toastr = {
      error() {}
    };

    authService = {
      get loggedUser$() {
        return of();
      }
    };

    modalService = {};

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(userRoutes),
        SharedModule,
        CommonModule,
        HttpClientModule,
        CoreModule,
        BrowserModule,
        JwtModule.forRoot({ config: {} })
      ],
      declarations: [UserInfoComponent,
        UserPostsComponent,
        UserPageComponent,
        UserFollowersComponent,
        UserFollowingComponent,
        UsersPageComponent
      ],
      providers: [UserPageResolverService, NotificatorService],
    })
      .overrideProvider(AuthService, { useValue: authService })
      .overrideProvider(NotificatorService, { useValue: toastr })
      .overrideProvider(ActivatedRoute, { useValue: route})
      .overrideProvider(BsModalService, { useValue: modalService })
      .compileComponents();
    router = TestBed.get(Router);
  }));

  // it('should be defined', () => {
  //   // Arrange & Act & Assert
  //   expect(component).toBeDefined();
  // });

  it('should start with resolver data', () => {

    const userInfo: any = {
      id: 1,
      posts: [{id: 1}]
    };

    // change the activated route's data per test
    route.data = of({ userInfo });

    // create the component and run all changes on init
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit()

    const spyUser = jest
      .spyOn(authService, 'loggedUser$', 'get')
      .mockReturnValue(of(userInfo));

    //expect(spyUser).toHaveBeenCalledTimes(1);
    expect(component.fullUser).toBe(userInfo);
  });

  describe('ngOnInit()', () => {
    // it('should call loggedUser() to return user', (done) => {
    //   // Arrange
    //   const userInfo: any = {
    //     id: 1,
    //   };
    //
    //   const mokedUsers: any = [userInfo];
    //
    //   route.data = of({ userInfo });
    //
    //   const spyUser = jest
    //     .spyOn(authService, 'loggedUser$', 'get')
    //     .mockReturnValue(of(mokedUsers));
    //
    //   // Act
    //   component.ngOnInit();
    //
    //   // Assert
    //   // expect(spyUser).toHaveBeenCalledTimes(1);
    //   expect(component.loggedUser).toBe(mokedUsers);
    //
    //   done();
    // });
    //
    // it('should call authService.loggedUser$ once', (done) => {
    //   // Arrange
    //   const userInfo: any = {
    //     id: 1,
    //     posts: [{id: 1}]
    //   };
    //
    //   fixture = TestBed.createComponent(UserPageComponent);
    //   component = fixture.componentInstance;
    //   fixture.detectChanges();
    //
    //   const mokedUsers: any = [userInfo];
    //
    //   route.data = of({ userInfo });
    //
    //
    //   const spyUser = jest
    //     .spyOn(authService, 'loggedUser$', 'get')
    //     .mockReturnValue(of(mokedUsers));
    //
    //   // Act
    //   component.ngOnInit();
    //
    //   // Assert
    //   expect(spyUser).toHaveBeenCalledTimes(1);
    //   done();
    // });
   });
});
