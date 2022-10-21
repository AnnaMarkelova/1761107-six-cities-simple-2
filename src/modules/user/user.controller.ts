import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller/controller.js';
import { Component } from '../../types/component.types.js';
import { LoggerInterface } from '../../common/logger/logger.interface.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { UserServiceInterface } from './user-service.interface';
import {StatusCodes} from 'http-status-codes';
import CreateUserDto from './dto/create-user.dto';
import { fillDTO } from '../../utils/common.js';
import UserResponse from './response/user.response.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import LoginUserDto from './dto/login-user.dto.js';

@injectable()
export default class UserController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({ path: '/register', method: HttpMethod.Post, handler: this.create });
    this.addRoute({path: '/login', method: HttpMethod.Post, handler: this.login});
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existUser = await this.userService.findByEmail(body.email);

    if (existUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.config.get('SALT'));

    this.created(res, fillDTO(UserResponse, result));
  }

  public async login(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
