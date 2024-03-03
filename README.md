[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/G0JN8jPZ)
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/Ksmm31Ge)
[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct06-generics-solid-ManuelDavidGomezAlonso/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct06-generics-solid-ManuelDavidGomezAlonso?branch=main)
# Desarrollo de Sistemas Informáticos.
## Práctica 6: Clases e Interfaces Genéricas y Principios SOLID.
Manuel David Gómez Alonso.

Alu0101347301.

## Índice

1. [Introducción](#Introducción)
2. [Desarrollo](#Desarrollo)
3. [Conclusiones](#Conclusiones.)
4. [Bibliografía](#Bibliografía.)

## Introducción:
Una vez adquiridos los principios de la programación orientada objetos en este lenguaje, nos toca profundizar aún más, implementando clases e interfaces genéricas y haciendo uso tambien de clases abstractas, además teniendo en cuenta para el fortmato y estructura de nustro código los principios SOLID.

__Hemos aprendido:__
- _¿A que se refiere el concepto generica (respecto a a las clases y las interfaces)?_ --> Cuando una clase o interfaz es generica quiere decir que tiene un tipo de datos más flexible, pero sin llegar a perder la comprobación de tipos y por lo tanto sin afectar tanto al tiempo de ejecución.
- _¿Que es una clase abstracta?_ --> Es una clase que no puede ser instanciada por si misma, y que servirá de molde para otras clases hijas.

  - __Principios SOLID__
    
  - __S: Principio de Responsabilidad Única (Single Responsibility):__ Una clase, una responsabilidad.
  - __O: Principio de Abierto/Cerrado (Open/Closed):__ Abierta para extensión, cerrada para modificación.
  - __L: Principio de Sustitución de Liskov:__ Subtipos deben ser sustituibles por sus tipos base.
  - __I: Principio de Segregación de Interfaces:__ Interfaces específicas, no generales.
  - __D: Principio de Inversión de Dependencia:__ Depender de abstracciones, no de implementaciones.
  
- _Además, como utilizar ambos conceptos en nuestros programa.__

Estos aprendizajes quedarán plasmados en los siguientes apartados.

## Desarrollo.

### Ejercicio 1: Gestor de Mudanza.
__Se comentará las partes más importantes del código.__

En un principio habíamos decidido implementar una clase generica enser, pero, nos dimos cuenta de que la mejor opción era crear una interfaz enser que definiera como serían los mismos, y condicionar al parámetro generico de Cajas a que implemente esta interfaz, de esta manera procedemos a crear subClases con diferentes tipos de enser que implementan la mencionada interfaz.

__Estructura del Código:__
  - Interfaz Enser.
  - Clase mudanza (Contiene un conjunto de cajas).
    - Clase genérica Cajas - `<T extends Enser>`.
      - Clases que siguen el formato de Enser (Ropa, Cocina, Electrónica).

__Ejemplo del uso de una clase genérica:__
```typescript

interface Enser{
  tipoEnser(): string;
  Peso(): number;
  Nombre(): string;
}

export class Cajas<T extends Enser> {

  /**
   * @brief Constructor de la clase Cajas que almacenará todos los objetos de la misma.
   * @param conjEnseres Un vector con el conjunto de enseres de la caja.
   */
  constructor(private conjEnseres: T[]){
  }

  /**
   * @brief Añade un enser a la caja.
   * @param enser El enser que se añadirá a la caja (Objeto de la clase Enser).
   */
  pesoTotalCajas(): number{
    let pesoT = 0;
    this.conjEnseres.forEach(element => {
      pesoT += element.Peso();
    });
    return pesoT;
  }

  showElementsInCage() {
    console.log("Contenido de la Caja:\n");
    this.conjEnseres.forEach(element => {
      console.log(`- ${element.Nombre()}\n\tPeso: ${element.Peso()} kg`);
      if (element instanceof Ropa) {
        console.log(`\tTalla: ${(element as Ropa).ShowTalla()}`);
      } else if (element instanceof Cocina) {
        console.log(`\tUtilidad: ${(element as Cocina).ShowUtilidad()}`);
      } else if (element instanceof Electronica) {
        console.log(`\tPrecio: ${(element as Electronica).ShowPrice()} USD`);
      }
      console.log("\n");
    });
    console.log(`Peso Total de la Caja: ${this.pesoTotalCajas()} kg\n`);
  }
  searchElementForId(id: number){
    console.log(this.conjEnseres[id]);
    return this.conjEnseres[id];
  }
  addEnser(enser: T){
    this.conjEnseres.push(enser);
  }
}

// Vemos como al instanciar una clase inicamos que tipo deobjetos podrán tomar el valor T, además estos deberán de cumplir con la interface (Visto en la mod en //clase).

const Caja1 = new Cajas<Ropa | Electronica>([Camisa1,Camisa2,Camisa3,Pantalo1,Portatil]);
const Caja2 = new Cajas<Cocina | Electronica>([Iphone,juegoCuchillos,vajilla,manteles,sartenes]);
const Caja3 = new Cajas<Electronica>([teclado,raton]);
```

Vemos como es __el formato de una clase abstracta__ y además como se instancia un objeto de esta manera.

### Ejercicio 2: Generador de Facturas en archivos externos.

Empezando el ejercicio y para dar formato a las clases generador de las que se nos habla en el enunciado, creamos una clase abstracta y genérica factura la cual sera padre de los mencionados generadores, y poseerá un método `generarFactura`.

```typescript
export abstract class Factura <T>{
  constructor(private cabecera: T, private products: T, private finalInformation: T) {}
  abstract generarFactura(): void;
}
```

Además como podemos observar, una factura va a poseer una cabecera, un apartado donde tendremos los productos, y un aparatado final, para ello implementaremos 3 clases `FacturaCabecera`, `FatcuraProducts`, `FacturaFinalInformation`.  Vamos a adentrarnos en el generador del PDF, que es de los dos el que más dificultad ha tenido.

```typescript
export class GeneradorPDF extends Factura<FacturaCabecera | FacturaProducts | FacturaFinalInforamtion>{
  constructor(private factCab: FacturaCabecera, private factDesc: FacturaProducts, private factFinal: FacturaFinalInforamtion) {
    super(factCab, factDesc, factFinal);
  }
  
  generarFactura() {
    const pdf = new PDFDocument();
    const stream = fs.createWriteStream(`Factura${this.factCab.getFactNum()}.pdf`);
    pdf.pipe(stream);

    pdf
      .fontSize(14)
      .text(`Factura nº ${this.factCab.getFactNum()}`, { align: 'center' })
      .fontSize(12)
      .text(`Cliente: ${this.factCab.getReceptor()}`)
      .text(`Fecha de emisión: ${this.factCab.getFechaFactEm()}`)
      .text(`Fecha de vencimiento: ${this.factCab.getFechaFactVen()}`)
      .text(`Empresa emisora: ${this.factCab.getEmisor()}`)
      .moveDown(); 
    pdf
      .fontSize(16)
      .text('Descripción', { underline: true })
      .fontSize(12)
      .text(`Cantidad: ${this.factDesc.getCant()}`)
      .text(`Precio unitario: ${this.factDesc.getUnitPrice()}`)
      .text(`Precio total: ${this.factDesc.getTotalPrice()}`)
      .moveDown();

    pdf
      .fontSize(12)
      .text(`Método de pago: ${this.factFinal.getPaymenthMethod()}`)
      .text(`Nota: ${this.factFinal.getNota()}`);

    pdf.end();
  }
}
```

Para esta clase hemos usado __pdfkit__, vemos también como la clase es hija de Factura y además también se ven especialmente respetados __los principio SOLID - S y O__ haciendo que las clases tengan funcionalidades únicas, teniendo como consecuencia unas pruebas más faciles de realizar (Single Responsablity Principle) y un código fácil de modificar, al cual podríamos añadir un nuevo generador con un formato diferente sin modificar absolutamtene nada en otras clases (Open-Close Principle).

__Uso del pdfkit y de fs:__

- `pdf.pipe(stream)`: Conecta PDF a archivo.
- `pdf.fontSize(14).text(...)`: Establece tamaño de fuente y añade texto.
- `pdf.moveDown()`: Mueve cursor hacia abajo.
- `pdf.end()`: Finaliza y guarda PDF.
- `fs.createWriteStream(...)`: Crea flujo de escritura.
- `fs.writeFileSync(...)`: Escribe contenido en archivo.

### Ejercicio 3: Gestor de ficheros.

Este ejercicio consistía en arreglar un código otorgado, para que el mismo cumpla todos los principios SOLID.

```typescript

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

```

Encontrar el principio SOLID que no se satisfacía fue bastante sencillo, había una clase FileManager, que se encargaba de leer y escribir en el archivo de texto, no cumpliendo así el principio __Single Responsability__ haciendo un código al cual es más dificil realizar pruebas, y más dependiendente de una sola clase.

### Ejercicio 4: Impresoras y Escáneres.

Este ejercicio consistía en arreglar un código otorgado, para que el mismo cumpla todos los principios SOLID.

```typescript
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

```

En este caso se incumplía con el principio __SOLID I - Interface Segregation Principle.__ y es que imaginemos que queremos implementar un objeto que solo imprima, o que sole escanee, tendríamos que modificar el código, cosa que nos ahorraríamos implementado dos interfaces de la manera anteirormente mostrada.

### Ejercicio 5: Servicio de mensajería.

Este ejercicio consistía en arreglar un código otorgado, para que el mismo cumpla todos los principios SOLID.

```typescript
/**
 * @fileoverview En este ejercicio hemos modificado el código para que cumpla con el principio SOLID D - Dependency Inversion Principle.
 * Universidad de La Laguna.
 * Desarrollo de Sistemas Informáticos.
 * Ejercicio 5.
 * Alu0101347301@ull.edu.es
 * @author Manuel David Gómez Alonso
 * @license MIT
 */

/**
 * @brief Interfaz que representa un servicio de notificación.
 * Esta interfaz fue añadida para cumplir con el principio SOLID D - Dependency Inversion Principle.
 * El cual nos dice que las clases de alto nivel no deberían depender de las clases de bajo nivel, sino de abstracciones.
 * Es decir la clase notificaciones en este caso no debe de depender de las otras dos clases, sino de una abstracción que las englobe.
 */
interface NotificationService {
  notify(message: string): void;
}

/**
 * @brief Clase que permite enviar notificaciones por correo electrónico.
 * Que además ahora implementa la interfaz NotificationService.
 */
class EmailService implements NotificationService {
  notify(message: string): void {
    console.log(`Sending notification by email: ${message}`);
  }
}

/**
 * @brief Clase que permite enviar notificaciones por mensaje corto.
 * Que además ahora implementa la interfaz NotificationService.
 */
class ShortMessageService implements NotificationService{
  notify(message: string): void {
    console.log(`Sending notification by SMS: ${message}`);
  }
}

// Class that makes use of different types of services to perform notifications
class Notifier {
  constructor(private notificationService: NotificationService) {
  }

  sendNotification(message: string): void {
    this.notificationService.notify(message);
  }
}

// Client code
const emailNotifier = new Notifier(new EmailService());
emailNotifier.sendNotification('Hello World!');

const shortMessageNotifier = new Notifier(new ShortMessageService());
shortMessageNotifier.sendNotification('Hello World!');
```

En este último ejercicio no se cumplía el principio __SOLID D - Dependency Inversion Principle__ ya que las clases de alto nivel, dependían de abstracciones para subsanar esto hemos hecho una interfaz que deben implementar ambas clases, la aplicación de este principio nos permitirá una mejor capacidad de modificación y de mantenimiento de nuestros programas en typescript.

### Modificación.

```typescript
/**
 * @brief Interfaz generica que representa un objeto aritmético.
 */
interface Arithmeticable<T> {
    add(operator:T):T;
    substract(operator:T):T;
    multiply(operator:T):T;
    divide(operator:T):T;
}
/**
 * @brief Clase que gestiona un conjunto de Aritméticos, mediante un vector de tipo genérico.
 */
export class ArithmeticableCollection<T extends Arithmeticable<T>>  {
  /**
   * @brief Constructor de la clase ArithmeticableCollection.
   * @param collect Un vector generico de tipo T que almacenará los objetos aritméticos.
   */
    constructor(public collect: T[]){
    }

    /**
     * @brief Añade un elemento aritmético al conjunto.
     * @param newElement Elemento aritmético que se añadirá al conjunto.
     */
    addArithmeticable(newElement:T) {
        this.collect.push(newElement);
    }

    /**
     * @brief Obtiene un elemento aritmético del conjunto.
     * @param index Indice del elemento aritmético que se quiere obtener.
     */
    getArithmeticable(index: number){
        this.collect[index];
    }
}

/**
 * @brief Clase que implementa números complejos y sus respectivas operaciones.
 */
 export class Complex implements Arithmeticable<Complex> {
  /**
   * @breif Constructor de la clase Complex.
   * @param real Parte real del complejo.
   * @param imaginario Parte imaginaria del complejo.
   */
    constructor(private real:number, private imaginario:number){
    }

    /**
     * @brief Suma de números complejos.
     * @param complejo Complejo a sumar con el actual. 
     * @returns Resultado numérico de la suma.
     */
    add(complejo:Complex) {
        return new Complex(this.real + complejo.getReal(), complejo.getImagin() - this.imaginario);
    }

    /**
     * @brief Resta de números complejos.
     * @param complejo Complejo a restar con el actual. 
     * @returns Resultado numérico de la resta.
     */
    substract(complejo:Complex){
        return new Complex(this.real - complejo.getReal(), complejo.getImagin() + this.imaginario);
    }

    /**
     * @brief Multiplicación de números complejos.
     * @param complejo Complejo en el multiplicando de la operación. 
     * @returns Resultado numérico de la multiplicación.
     */
    multiply(complejo:Complex) {
      return new Complex(this.real*complejo.getReal() - this.imaginario*complejo.getImagin(), this.real*complejo.getImagin() + this.imaginario*complejo.getReal());
    }

    /**
     * @brief División de números complejos.
     * @param complejo Complejo en el dividendo. 
     * @returns Resultado numérico de la División.
     */
    divide(complejo:Complex) {
      return new Complex(this.real*complejo.getReal() - this.imaginario*complejo.getImagin(), this.real*complejo.getImagin() + this.imaginario*complejo.getReal());
    }

    /**
     * @brief Obtiene la parte imaginaria del número complejo.
     * @returns Parte imaginaria del número complejo.
     */
    getImagin():number{
        return this.imaginario;
    }
    /**
     * @brief Obtiene la parte real del número complejo.
     * @returns Parte real del número complejo.
     */
    getReal():number{
        return this.real;
    }
}
/**
 * Clase que implementa numeros racionales y sus respectivas operaciones.
 */
export class Rational implements Arithmeticable<Rational> {
    constructor(private den:number, private num:number){
    }
    /**
     * @brief Suma de números racionales.
     * @param racional Racional a sumar con el actual. 
     * @returns Par numerador, denominador con el resultado de la suma.
     */
    add(racional:Rational) {
        const newNum:number = this.num * racional.getDen() + racional.getNum() * this.den;
        return new Rational(newNum,this.den * racional.getDen());
      }
      
    /**
     * @brief Resta de números racionales.
     * @param racional Racional a restar con el actual. 
     * @returns Resultado numérico de la resta.
     */
      substract(racional:Rational) {
        const newNum: number = this.num * racional.getDen() - racional.getNum() * this.den;
        return new Rational(newNum, this.den * racional.getDen());
      }
      
    /**
     * @brief Multiplicación de números racionales.
     * @param racional Racional en el multiplicando de la operación. 
     * @returns Resultado numérico de la multiplicación.
     */
        multiply(racional:Rational){
            return new Rational(this.num * racional.getNum(), this.den * racional.getDen());
        }
      
    /**
     * @brief división de números racionales.
     * @param racional Racional en el dividendo. 
     * @returns Resultado numérico de la División.
     */

      divide(racional:Rational) {
        return new Rational(this.num * racional.getDen(), racional.getNum() * this.den);
      }
    /**
     * @brief Suma de números racionales.
     * @param racional Racional a sumar con el actual. 
     * @returns Resultado numérico de la suma.
     */
      getDen():number {
        return this.den;
      }
    /**
     * @brief Suma de números racionales.
     * @param racional Racional a sumar con el actual. 
     * @returns Resultado numérico de la suma.
     */
      getNum() {
        return this.num;
      }
}

const rational1 = new Rational(1,2);
const rational2 = new Rational(5,2);
const complex1 = new Complex(1,2);
const complex2 = new Complex(-2,3);

const collect = new ArithmeticableCollection<Rational | Complex>([rational1,complex2]);

collect.addArithmeticable(rational1);
collect.addArithmeticable(rational2);
collect.addArithmeticable(complex1)
collect.getArithmeticable(1);

```

En la práctica se nos pedía implementar una clase genérica para poder interactuar con datos aritméticos, en la versión entregada, nuestra interfaz genérica devolvía vectores number `number[]`, lo cual era un error ya que sea cual sea el dato que entre, la suma, la resta, la multiplicación y división siempre debería de devolver el mismo tipo de dato.

Una parte curiosa es la de la clase genérica con un parámetro genérico que debe de cumplir con las condiciones establecidas en la interfaz genérica nombrada anteriormente `export class ArithmeticableCollection<T extends Arithmeticable<T>>  {`.

## Conclusiones.
Las clases e interfaces genéricas es una parte muy importante en la programación orientada a objetos, además es una herramienta muy potente, que permite mayor flexiblidad en los códigos, además los principios SOLID establecen un estándar en los códigos de este lenguaje dandoles mejor legibilidad, estructura, capacidad de reusabilidad, mejor capacidad para la modificación y el mantenimiento.

## Bibliografía.
[Vídeo sobre Clases e Interfaces.](https://youtu.be/j0NwW_dq1Qg?si=O8EDXeqAbDkAa5wH)

[Documentación Oficial Typescript.](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

[Guión de la Práctica.](https://ull-esit-inf-dsi-2324.github.io/prct06-generics-solid/)

[Apuntes de teoría.](https://ull-esit-inf-dsi-2324.github.io/typescript-theory/)

[Video sobre los tipos genéricos](https://youtu.be/g16brokfrQw?si=hIxNsGwRnRjaXh7m)
