
interface Arithmeticable<T> {
    add(operator:T):number[];
    substract(operator:T):number[];
    multiply(operator:T):number[];
    divide(operator:T):number[];
}
/**
 * Clase que gestiona un conjunto de Aritméticos, mediante un vector 
 * de tipo genérico.
 */
export class ArithmeticableCollection<T extends Arithmeticable<T>>  {
    constructor(public collect: T[]){
    }
    addArithmeticable(newElement:T) {
        this.collect.push(newElement);
    }
    getArithmeticable(index: number){
        this.collect[index];
    }
    getNuberOfArithmeticable(){
        this.collect.length;
    }
}

/**
 * 
 */
 export class Complex implements Arithmeticable<Complex> {
    constructor(private real:number, private imaginario:number){
    }
    add(complejo:Complex) {
        return [this.real + complejo.getReal(), complejo.getImagin() - this.imaginario];
    }
    substract(complejo:Complex){
        return[this.real - complejo.getReal(), complejo.getImagin() + this.imaginario];
    }
    multiply(complejo:Complex) {
      return[(this.real*complejo.getReal()) - (this.imaginario*complejo.getImagin()), (this.real*complejo.getImagin()) + (this.imaginario*complejo.getReal())]
    }
    divide(complejo:Complex) {
      return [(this.real*complejo.getReal()) - (this.imaginario*complejo.getImagin()), (this.real*complejo.getImagin()) + (this.imaginario*complejo.getReal())]
    }
    getImagin():number{
        return this.imaginario;
    }
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

        const tRAtional = [newNum,this.den * racional.getDen()];
        return tRAtional;
      }
      
    /**
     * @brief Resta de números racionales.
     * @param racional Racional a restar con el actual. 
     * @returns Resultado numérico de la resta.
     */
      substract(racional:Rational) {
        const newNum: number = this.num * racional.getDen() - racional.getNum() * this.den;
        return [newNum, this.den * racional.getDen()];
      }
      
    /**
     * @brief Multiplicación de números racionales.
     * @param racional Racional en el multiplicando de la operación. 
     * @returns Resultado numérico de la multiplicación.
     */
        multiply(racional:Rational){
            return [this.num * racional.getNum(), this.den * racional.getDen()];
        }
      
    /**
     * @brief división de números racionales.
     * @param racional Racional en el dividendo. 
     * @returns Resultado numérico de la División.
     */

      divide(racional:Rational) {
        return [this.num * racional.getDen(), racional.getNum() * this.den];
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
