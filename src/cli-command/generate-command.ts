import got from 'got';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import HotelGenerator from '../common/hotel-generator/hotel-generator.js';
import { MockHotelData } from '../types/mock-hotel-data.type.js';
import { CliCommandInterface } from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockHotelData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const hotelCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(`Can't fetch data from ${url}.`);
    }


    const hotelGeneratorString = new HotelGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < hotelCount; i++) {
      await tsvFileWriter.write(hotelGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
