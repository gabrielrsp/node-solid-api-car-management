import { ICreateCarDto } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create (data: ICreateCarDto): Promise<Car>;
  findByLicensePlate (license_plate: string): Promise<Car>;
  findAvailable (
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
  findById (id: string): Promise<Car>;
}

export { ICarsRepository };
