import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Criar categoria", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with an existing category name", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    // Aqui é preciso esperar a execução final do EXPECT e não do create
    // Do jeito normal ele não consegue esperar o resultado do expect e dá erro passando um outro erro qualquer
    await expect(
      createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});
