import {getDatabaseConnection} from "@libs/data-source";
import { name_age } from "src/entities/name_age";
import { NameAgeRepository } from "src/repositories/NameAgeRepository"

export class NameAgeService {
    private nameAgeRepo: NameAgeRepository;
    
    constructor() {
      this.nameAgeRepo = new NameAgeRepository()
    }
  
    
    async AddNameAge({name, age}:{name:string, age:number}) {
        const queryRunner = await (await getDatabaseConnection()).createQueryRunner()
        await queryRunner.startTransaction()
        try {
        const nameAge = await this.nameAgeRepo.AddNameAge(name, age)
        
        await queryRunner.commitTransaction()
        return { ...nameAge }
        } catch (err) {
        console.log(err)
        queryRunner.rollbackTransaction()
        throw err
        }
    }

    async GetNameAge(): Promise<name_age[]> {
        let res: name_age[]
    
        res = await this.nameAgeRepo.ListNameAge();
        
        return res
      }
}
  