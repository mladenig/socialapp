import { Resolve } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { CONFIGS } from '../configs/configs';
import {UsersService} from './users.service';
import {UserRegisterDTO} from './models/user-register.dto';

describe('UsersService', () => {
  let httpClient;
  let bookId;
  let service: UsersService;

  beforeEach(async(() => {
    jest.clearAllMocks();

    httpClient = {
      get() {},
      post() {},
      put() {},
      patch() {},
      delete() {}
    };

    bookId = '1';


    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UsersService]
    })
      .overrideProvider(HttpClient, { useValue: httpClient });

    service = TestBed.get(UsersService);
  }));

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('getAllUsers()', () => {
    it('should call the httpClient.get() method once with correct parameters', done => {
      // Arrange
      const page = {
        skip: 1,
        take: 1,
      };
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/?skip=${page.skip}&take=${page.take}`;
      const returnValue = of('return value');
      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.getAllUsers(page.skip, page.take).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const page = {
        skip: 1,
        take: 1,
      };
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/books`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.getAllUsers(page.skip, page.take);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('getUserById()', () => {
    it('should call the httpClient.get() method once with correct parameters', done => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.getUserById(id).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.getUserById(id);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('register()', () => {
    it('should call the httpClient.post() method once with correct parameters', done => {
      // Arrange
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'post').mockReturnValue(returnValue);
      const user = new UserRegisterDTO();

      // Act & Assert
      service.register(user).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url, user);

        done();
      });
    });

    it('should return the result from the httpClient.post() method', () => {
      // Arrange
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'post').mockReturnValue(returnValue);
      const user = new UserRegisterDTO();

      // Act
      const result = service.register(user);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('update()', () => {
    it('should call the httpClient.put() method once with correct parameters', done => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'put').mockReturnValue(returnValue);
      const user = { id };

      // Act & Assert
      service.update(id, user as any).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url, user);

        done();
      });
    });

    it('should return the result from the httpClient.put() method', () => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'put').mockReturnValue(returnValue);
      const user = { id };

      // Act
      const result = service.update(id, user as any);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('followUnfollowUser()', () => {
    it('should call the httpClient.patch() method once with correct parameters', done => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'patch').mockReturnValue(returnValue);
      const state = { followUnfollow: true };

      // Act & Assert
      service.followUnfollowUser(id, state as any).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url, state);

        done();
      });
    });

    it('should return the result from the httpClient.patch() method', () => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/rating`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'patch').mockReturnValue(returnValue);
      const state = { followUnfollow: true };

      // Act
      const result = service.followUnfollowUser(id, state as any);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('getUserFollowers()', () => {
    it('should call the httpClient.get() method once with correct parameters', done => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/followers`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.getUserFollowers(id).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.getUserFollowers(id);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });

  describe('getUserFollowing()', () => {
    it('should call the httpClient.get() method once with correct parameters', done => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/following`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act & Assert
      service.getUserFollowing(id).subscribe(() => {
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith(url);

        done();
      });
    });

    it('should return the result from the httpClient.get() method', () => {
      // Arrange
      const id = 1;
      const url = `${CONFIGS.API_DOMAIN_NAME}/api/users/${id}/following`;
      const returnValue = of('return value');

      const spy = jest.spyOn(httpClient, 'get').mockReturnValue(returnValue);

      // Act
      const result = service.getUserFollowing(id);

      // Assert
      expect(result).toEqual(returnValue);
    });
  });


  // describe('deleteBook()', () => {
  //   it('should call the httpClient.delete() method once with correct parameters', done => {
  //     // Arrange
  //     const id = 1;
  //     const url = `${CONFIGS.API_DOMAIN_NAME}/api/books/${id}`;
  //     const returnValue = of('return value');
  //
  //     const spy = jest.spyOn(httpClient, 'delete').mockReturnValue(returnValue);
  //
  //     // Act & Assert
  //     service.deleteBook(id).subscribe(() => {
  //       expect(spy).toBeCalledTimes(1);
  //       expect(spy).toBeCalledWith(url);
  //
  //       done();
  //     });
  //   });
  //
  //   it('should return the result from the httpClient.get() method', () => {
  //     // Arrange
  //     const id = 1;
  //     const url = `${CONFIGS.API_DOMAIN_NAME}/api/books/${id}`;
  //     const returnValue = of('return value');
  //
  //     const spy = jest.spyOn(httpClient, 'delete').mockReturnValue(returnValue);
  //
  //     // Act
  //     const result = service.deleteBook(id);
  //
  //     // Assert
  //     expect(result).toEqual(returnValue);
  //   });

});
