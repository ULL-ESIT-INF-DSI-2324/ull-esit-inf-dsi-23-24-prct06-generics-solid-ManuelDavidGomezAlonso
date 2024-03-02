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
