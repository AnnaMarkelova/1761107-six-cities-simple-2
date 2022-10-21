import { inject, injectable } from 'inversify';
import express, {Express} from 'express';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
// import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';
import {ExceptionFilterInterface} from '../common/errors/exception-filter.interface.js';
// import { HotelType } from '../types/hotel-type.enum.js';
// import { GoodType } from '../types/good-type.enum.js';

@injectable()
export default class Application {

  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    // @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface,
    @inject(Component.OfferController) private offerController: ControllerInterface,
    @inject(Component.UserController) private userController: ControllerInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
  ) {
    this.expressApp = express();
  }

  public initRoutes() {
    this.expressApp.use('/offers', this.offerController.router);
    this.expressApp.use('/users', this.userController.router);
  }

  public initMiddleware() {
    this.expressApp.use(express.json());
  }

  public initExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization…');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    // нужны для тестирования, перед защитой удалю
    //const offers = await this.offerService.calcRating('63358d9850bcefa5f37e2e5d', 2);
    // const offers = await this.offerService.findById('63358d9850bcefa5f37e2e5d');
    // const offers = await this.offerService.create(
    //   {
    //     'title': 'Perfectly located TEST',
    //     'description': 'Odio pellentesque diam',
    //     'city': {
    //       'name': 'Hamburg',
    //       'location': {
    //         'latitude': 53.550341,
    //         'longitude': 10.000654
    //       }
    //     },
    //     'previewImage': 'hotel1.jpg',
    //     'images': [
    //       'hotel3.jpg',
    //       'hotel4.jpg'
    //     ],
    //     'isPremium': false,
    //     'rating': 4,
    //     'type': HotelType.Apartment,
    //     'bedrooms': 3,
    //     'maxAdults': 2,
    //     'price': 13929,
    //     'goods': [
    //       GoodType.BabySeat
    //     ],
    //     'host': '63358c4010021a05e36db0bf',
    //     'location': {
    //       'latitude': 53.550341,
    //       'longitude': 10.000654
    //     }
    //   }
    // );
    // console.log(offers);

    this.initMiddleware();
    this.initRoutes();
    this.initExceptionFilters();

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);

  }
}
