import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/In-memory/RentalsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental to an user that already have a rental", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental to a car that is already rented", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: "test",
        expected_return_date: dayAdd24hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
