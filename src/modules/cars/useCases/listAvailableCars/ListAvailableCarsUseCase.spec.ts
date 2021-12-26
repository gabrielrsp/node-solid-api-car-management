import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 220,
      license_plate: "KKK-1212",
      fine_amount: 500,
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 220,
      license_plate: "XXX-1212",
      fine_amount: 200,
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 320,
      license_plate: "DFE-1212",
      fine_amount: 400,
      brand: "Car Brand TEST",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 150,
      license_plate: "DFE-1212",
      fine_amount: 300,
      brand: "Car Brand TEST",
      category_id: "654321",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "654321",
    });

    expect(cars).toEqual([car]);
  });
});
