import { inject, injectable } from 'inversify';
import express, {Express} from 'express';
import { ConfigInterface } from '../common/config/config.interface.js';
import { DatabaseInterface } from '../common/database-client/database.interface.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
// import { OfferServiceInterface } from '../modules/offer/offer-service.interface.js';
import { Component } from '../types/component.types.js';
import { getURI } from '../utils/db.js';

@injectable()
export default class Application {

  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    // @inject(Component.OfferServiceInterface) private offerService: OfferServiceInterface
  ) {
    this.expressApp = express();
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
    // console.log(offers);

    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
