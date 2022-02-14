import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
  findOpenRentalByCar (car_id: string): Promise<Rental>;
  findOpenRentalByUser (user_id: string): Promise<Rental>;
  create (data: ICreateRentalDTO): Promise<Rental>;
  findById (id: string): Promise<Rental>;
  updateRental (id, end_date, total): Promise<void>;
  findByUser (user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
