/**
 * @fileoverview En este ejercicio hemos modificado el código para que cumpla con el principio SOLID S - Single Responsability Principle.
 * Universidad de La Laguna.
 * Desarrollo de Sistemas Informáticos.
 * Ejercicio 3:
 * Alu0101347301@ull.edu.es
 * @author Manuel David Gómez Alonso
 * @license MIT
 */

import * as fs from 'fs';

/**
 * @brief Clase FileManagerRead, contendrá la función para leer un archivo.
 * Este código anteriormente, no cumplía con el pricipio SOLID S - Single Responsability Principle.
 * El cual nos dice que cada clase debería de ser responsable de una sola funcionalidad, de esta maenra se facilitaría la tarea de hacer pruebas sobre nuestro código.
 */
export class FileManagerRead {
  constructor(private filePath: string) {
  }

  /**
   * @brief Esta función, lee el contenido del archivo.
   * @returns Devuelve el contenido del archivo.
   */
public readFile(): string {
    try {
      const content: string = fs.readFileSync(this.filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error('Error al leer el archivo:', error.message);
      return '';
    }
  }
}

/**
 * @brief Clase FileManagerWriter, contendrá la función para escribir un archivo.
 * Este código anteriormente, no cumplía con el pricipio SOLID S - Single Responsability Principle.
 * El cual nos dice que cada clase debería de ser responsable de una sola funcionalidad, de esta maenra se facilitaría la tarea de hacer pruebas sobre nuestro código.
 */
export class FileManagerWriter {
  constructor(private filePath: string) {
  }

  /**
   * @brief Esta función, escribe el contenido en el archivo.
   * @param data Mensaje a escribrir en el archivo.
   */
  public writeFile(data: string): void {
    try {
      fs.writeFileSync(this.filePath, data, 'utf-8');
      console.log('Archivo escrito exitosamente.');
    } catch (error) {
      console.error('Error al escribir en el archivo:', error.message);
    }
  }
}

const filePath = 'example.txt';

const readFileManager = new FileManagerRead(filePath);
const writeFileManager = new FileManagerWriter(filePath);

const contentBefore = readFileManager.readFile();
console.log('Contenido antes de escribir:', contentBefore);

writeFileManager.writeFile('Hola mundo');

const contentAfter = readFileManager.readFile();
console.log('Contenido después de escribir:', contentAfter);