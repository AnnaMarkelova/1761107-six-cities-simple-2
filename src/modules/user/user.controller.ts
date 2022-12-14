import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UserServiceInterface } from './user-service.interface';
import {StatusCodes} from 'http-status-codes';
import CreateUserDto from './dto/create-user.dto.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import LoginUserDto from './dto/login-user.dto.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import { UploadFileMiddleware } from '../../common/middlewares/upload-file.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import { JWT_ALGORITM } from './user.constant.js';
import LoggedUserResponse from './response/logged-user.response.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');
    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate
    });
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email ??${body.email}?? exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.config.get('SALT'));

    this.created(res, fillDTO(UserResponse, result));
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response
  ): Promise<void> {

    const user = await this.userService.verifyUser(body, this.config.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.config.get('JWT_SECRET'),
      { email: user.email, id: user.id}
    );

    this.ok(res, fillDTO(LoggedUserResponse, {email: user.email, token}));
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

  public async checkAuthenticate(req: Request, res: Response) {
    const user = await this.userService.findByEmail(req.user.email);
    this.ok(res, fillDTO(LoggedUserResponse, user));
  }
}
