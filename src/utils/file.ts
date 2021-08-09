import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename); // verify if file exists
  } catch (error) {
    return;
  }

  await fs.promises.unlink(filename); // remove file
};
