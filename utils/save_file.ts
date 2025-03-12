'use server';
import fs from 'node:fs/promises';
import { revalidatePath } from 'next/cache';
import { DateTime } from 'luxon';
import path from 'path';
import * as fileSys from 'fs';

export async function saveFileToAppFolder(file: File, fileName: string) {
  const year = DateTime.now().year.toString();
  const relativePath = `/uploads/${year}`;
  const uploadDir = path.join(process.cwd(), `/public/${relativePath}`);

  if (!fileSys.existsSync(uploadDir)) {
    fileSys.mkdirSync(uploadDir, { recursive: true });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);


  await fs.writeFile(`${uploadDir}/${fileName}`, buffer);

  revalidatePath('/');

  return `${relativePath}/${fileName}`;
}


export async function deleteFileFromAppFolder(filePath: string) {
  const deletePath = path.join(process.cwd(), `/public${filePath}`);

  if (!fileSys.existsSync(deletePath)) {
    throw new Error('File does not exist');
  }

  await fs.rename(deletePath, `${deletePath}_deleted`);

}