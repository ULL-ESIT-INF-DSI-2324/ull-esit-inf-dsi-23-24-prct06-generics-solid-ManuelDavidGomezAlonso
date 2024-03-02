/**
 * @fileoverview En este ejercicio hemos modificado el código para que cumpla con el principio SOLID I - Interface Segregation Principle.
 * Universidad de La Laguna.
 * Desarrollo de Sistemas Informáticos.
 * Ejercicio 4:
 * Alu0101347301@ull.edu.es
 * @author Manuel David Gómez Alonso
 * @license MIT
 */

/**
 * @brief Interface para los objetos imprimibles.
 * Esta interfaz no cumplia anteriormente con el principio __SOLID I - Interface Segregation Principle.__
 * Esto se debe a que no distinguía entre los objetos que podían ser impresos y escaneados.
 * Teniendo así que implementar en las posteriores clases, métodos que no tenían funcionalidad solo para cumplir con la interfaz.
 */
interface Printable {
  print(): void
}
interface Scannable {
  scan(): void
}

/**
 * @brief Clase Printer, contendrá la función para imprimir.
 * Como mecionamos anteriormente gracias al principio __SOLID I - Interface Segregation Principle.__
 * No tenemos que implementar métodos que no tienen funcionalidad.
 */
class Printer implements Printable {
  /**
   * @brief Esta función imprime.
   */
  print(): void {
    console.log('Printing...')
  }
}
/**
 * @brief Clase Scanner, contendrá la función para escanear.
 * Como mecionamos anteriormente gracias al principio __SOLID I - Interface Segregation Principle.__
 * No tenemos que implementar métodos que no tienen funcionalidad.
 */
class Scanner implements Scannable {
  /**
   * @brief Esta función escanea.
   */
  scan(): void {
    console.log('Scanning...')
  }
}

class PrinterScanner implements Printable, Scannable {
  print(): void {
    console.log('Printing...')
  }

  scan(): void {
    console.log('Scanning...')
  }
}

const printer = new Printer();

printer.print();

const scanner = new Scanner();

scanner.scan();

const printerScanner = new PrinterScanner();

printerScanner.print();

printerScanner.scan();