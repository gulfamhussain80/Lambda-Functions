
import { Repository } from 'typeorm';
import { name_age } from 'src/entities/name_age';
import {getDatabaseConnection} from '@libs/data-source';

export class NameAgeRepository {
    private repo: Repository<name_age>
    private initialized: Promise<void>;

    constructor() {
        this.initialized = this.initializeRepo();
      }

    private async initializeRepo() {
        const databaseConnection = await getDatabaseConnection();
        this.repo = await databaseConnection.getRepository(name_age);
    }

    async AddNameAge(name: string, age:number): Promise<name_age> {
        await this.initialized;
        try {
          const res = await this.repo.save({ name, age })
          return res
        } catch (err) {
          console.log(err)
          throw new Error(err)
        }
    }

    async ListNameAge(): Promise<name_age[]> {
        await this.initialized;
        return this.repo.find()
    } 
}