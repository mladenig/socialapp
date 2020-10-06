import { CreateUserDTO } from './../users/models/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersDataService } from '../users/users-data.service';
import { ShowUserDTO } from '../users/models/show-user.dto';
import { TodosSystemError } from '../common/exceptions/todos-system.error';

describe('AuthService', () => {
  let service: AuthService;

  let usersDataService: any;
  let jwtService: any;

  beforeEach(async () => {
    usersDataService = {
      createUser() {
        /* empty */
      },
      findUserByUsername() {
        /* empty */
      },
      validateUserPassword() {
        /* empty */
      },
    };

    jwtService = {
      signAsync() {
        /* empty */
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersDataService, useValue: usersDataService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    // Arrange & Act & Assert
    expect(service).toBeDefined();
  });

  describe('login()', () => {
    it('should call usersDataService findUserByUsername() once with correct username', async () => {
      // Arrange
      const foundFakeUser = new ShowUserDTO();
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(foundFakeUser));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act
      await service.login(fakeUser);

      // Assert
      expect(findUserByUsernameSpy).toBeCalledWith(fakeUser.username);
      expect(findUserByUsernameSpy).toBeCalledTimes(1);
    });

    it('should throw error if user with such username does not exists', async () => {
      // Arrange
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(undefined));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act & Assert
      expect(service.login(fakeUser)).rejects.toThrow(TodosSystemError);
    });

    it('should call usersDataService validateUserPassword() once with correct user', async () => {
      // Arrange
      const foundFakeUser = new ShowUserDTO();
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(foundFakeUser));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act
      await service.login(fakeUser);

      // Assert
      expect(validateUserPasswordSpy).toBeCalledWith(fakeUser);
      expect(validateUserPasswordSpy).toBeCalledTimes(1);
    });

    it('should throw error if the passed user password is invalid', async () => {
      // Arrange
      const foundFakeUser = new ShowUserDTO();
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(foundFakeUser));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(false));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act & Assert
      expect(service.login(fakeUser)).rejects.toThrow(TodosSystemError);
    });

    it('should call jwtService signAsync() once with correct payload', async () => {
      // Arrange
      const foundFakeUser = new ShowUserDTO();
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(foundFakeUser));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act
      await service.login(fakeUser);

      // Assert
      expect(signAsyncSpy).toBeCalledWith(foundFakeUser);
      expect(signAsyncSpy).toBeCalledTimes(1);
    });

    it('should return the token from the jwtService signAsync()', async () => {
      // Arrange
      const foundFakeUser = new ShowUserDTO();
      const findUserByUsernameSpy = jest
        .spyOn(usersDataService, 'findUserByUsername')
        .mockReturnValue(Promise.resolve(foundFakeUser));

      const validateUserPasswordSpy = jest
        .spyOn(usersDataService, 'validateUserPassword')
        .mockReturnValue(Promise.resolve(true));

      const fakeToken = 'token';
      const signAsyncSpy = jest
        .spyOn(jwtService, 'signAsync')
        .mockReturnValue(Promise.resolve(fakeToken));

      const fakeUser: CreateUserDTO = {
        username: 'username',
        password: 'password',
      };

      // Act
      const result = await service.login(fakeUser);

      // Assert
      expect(result).toEqual({ token: fakeToken });
    });
  });

  describe('blacklistToken()', () => {
    it('should add the passed token to the blacklist collection', () => {
      // Arrange
      const fakeToken = 'token';

      // Act
      service.blacklistToken(fakeToken);

      // Assert
      expect((service as any).blacklist.includes(fakeToken)).toEqual(true);
    });
  });

  describe('isTokenBlacklisted()', () => {
    it('should return true if the passed token exist in the blacklist collection', () => {
      // Arrange
      const fakeToken = 'token';
      (service as any).blacklist.push(fakeToken);

      // Act
      const result = service.isTokenBlacklisted(fakeToken);

      // Assert
      expect(result).toEqual(true);
    });

    it('should return false if the passed token does not exist in the blacklist collection', () => {
      // Arrange
      const fakeToken = 'token';

      // Act
      const result = service.isTokenBlacklisted(fakeToken);

      // Assert
      expect(result).toEqual(false);
    });
  });
});
