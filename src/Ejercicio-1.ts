interface Enser{
  tipoEnser(): string;
  Peso(): number;
  Nombre(): string;
}
/**
 * @brief Clase Mudanza que almacenará un conjunto de cajas.
 */
export class Mudanza {

  /**
   * @brief Constructor de la clase Mudanza que almacenará todos los objetos de la misma.
   * @param mudanza Un vector con el conjunto de cajas de la mudanza.
   */
  constructor(public mudanza: Cajas<Enser>[]){
  }

  /**
   * @brief Añade una caja a la mudanza.
   * @param caja La caja que se añadirá a la mudanza (Objeto de la clase Caja).
   */
  addPackage(caja: Cajas<Enser>){
    this.mudanza.push(caja);
  }

  /**
   * @brief Muestra los elementos de una caja en concreto.
   * @param id El id de la caja que se quiere mostrar.
   */
  showPackageForId(id: number){
    console.log(this.mudanza[id]);
    return this.mudanza[id];
  }

  /**
   * @brief Muestra todos los paquetes de la mudanza.
   */
  showAllPackages() {
    this.mudanza.forEach((caja, index) => {
      console.log(`Caja ${index + 1}:`);
      caja.showElementsInCage(); // Utiliza el método existente en la clase Cajas
      console.log("\n"); // Salto de línea para separar las cajas
    });
  }

  /**
   * @brief Devuelve el peso total de la mudanza.
   * @return El peso total de la mudanza.
   */
  getTotalWeight(){
    let totalWeight = 0;
    this.mudanza.forEach(caja => {
      totalWeight += caja.pesoTotalCajas();
    });
    return totalWeight;
  }
}

/**
 * @brief Clase Cajas que almacenará un conjunto de enseres.
 * Esta clase es genérica, ya que puede almacenar cualquier tipo de enser, esto se debe a que condicionamos la generalidad T con la interface Enser.
 * `<T extends Enser>` indica que T debe ser un tipo que implemente la interfaz Enser.`
 */
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

/**
 * @brief Clase Ropa cumple con la Iterface Enser.
 */
export class Ropa implements Enser {
  /**
   * @brief Constructor de la clase Ropa.
   * @param nombre Nombre de la prenda.
   * @param peso Peso en kilogramos de la prenda.
   * @param talla Talla de la prenda (S, M, L, XL, etc).
   */
  constructor(private nombre: string, private peso: number, private talla: string){
  }

  /**
   * @brief Devuelve el nombre de la prenda.
   * @return Nombre de la prenda (Por ejemplo: Ropa: Chandal nike).
   */
  Nombre(): string {
    return `${this.tipoEnser()}: ${this.nombre}`;
  }

  /**
   * @brief Devuelve el peso de la prenda.
   * @return El peso de la prenda (Por ejemplo: 0.25).
   */
  Peso(): number {
    return this.peso;
  }

  /**
   * @brief Devuelve el tipo de Enser, en este caso Ropa.
   * @return Tipo de enser.
   */
  tipoEnser(): string{
    return "Ropa";
  }

  /**
   * @brief Devuelve la talla de la prenda.
   * @return La talla de la prenda (S, M, L, XL, etc).
   */
  ShowTalla(): string{
    return this.talla;
  }
}

/**
 * @brief Clase Electronica cumple con la Iterface Enser.
 */
export class Electronica implements Enser{

  /**
   * @brief Constructor de la clase Electronica.
   * @param nombre Nombre del aparato electrónico.
   * @param peso Peso en kilogramos del aparato electrónico.
   * @param price Precio del aparato electrónico.
   */
  constructor(private nombre: string, private peso: number, private price: number){
  }

  /**
   * @brief Devuelve el tipo de Enser, en este caso Electronica.
   * @return Tipo de enser.
   */
  tipoEnser(): string{
    return "Electronica";
  }

  /**
   * @brief Devuelve el precio del aparato electrónico.
   * @return El precio del aparato electrónico (Por ejemplo: 500).
   */
  ShowPrice(): number{
    return this.price;
  }

  /**
   * @brief Devuelve el peso del aparato electrónico.
   * @return El peso del aparato electrónico (Por ejemplo: 2).
   */
  Peso(): number {
    return this.peso;
  }

  /**
   * @brief Devuelve el nombre del aparato electrónico.
   * @return Nombre del aparato electrónico (Por ejemplo: Electrónica: Iphone).
   */
  Nombre(): string {
    return `${this.tipoEnser()}: ${this.nombre}`;
  }
}
  
/**
 * @brief Clase Cocina cumple con la Iterface Enser.
 */
export class Cocina implements Enser {
  /**
   * @brief Constructor de la clase Cocina.
   * @param nombre Nombre del enser de cocina.
   * @param peso Peso en kilogramos del enser de cocina.
   * @param utilidad Utilidad del enser de cocina.
   */
  constructor(private nombre: string, private peso: number, private utilidad: string) {
  }

  /**
   * @brief Devuelve el tipo de Enser, en este caso Cocina.
   * @return Tipo de enser.
   * */
  tipoEnser(): string {
    return "Cocina";
  }

  /**
   * @brief Devuelve la utilidad del enser.
   * @return La utilidad del enser (Por ejemplo: Cortar).
   * */
  ShowUtilidad(): string {
    return this.utilidad;
  }

  /**
   * @brief Devuelve el peso del enser.
   * @return El peso del enser (Por ejemplo: 3).
   * */
  Peso(): number {
    return this.peso;
  }

  /**
   * @brief Devuelve el nombre del enser.
   * @return Nombre del enser (Por ejemplo: Cocina: Juego de cuchillos).
   * */
  Nombre(): string {
    return `${this.tipoEnser()}: ${this.nombre}`;
  }
}


const mudanza = new Mudanza([]);

const Camisa1 = new Ropa("Camisa", 2, "M");
const Camisa2 = new Ropa("Camisa", 2, "L");
const Camisa3 = new Ropa("Camisa", 2, "S");
const Pantalo1 = new Ropa("Pantalon", 3, "M");
const Portatil = new Electronica("Laptop", 5, 500);
const Iphone = new Electronica("Iphone", 2, 300);
const juegoCuchillos = new Cocina("Juego de cuchillos", 3, "Cortar");
const vajilla = new Cocina("Vajilla", 5, "Comer");
const manteles = new Cocina("Manteles", 2, "Cubrir");
const sartenes = new Cocina("Sartenes", 3, "Cocinar");
const teclado = new Electronica("Teclado", 2, 50);
const raton = new Electronica("Raton", 2, 20);

const Caja1 = new Cajas<Ropa | Electronica>([Camisa1,Camisa2,Camisa3,Pantalo1,Portatil]);
const Caja2 = new Cajas<Cocina | Electronica>([Iphone,juegoCuchillos,vajilla,manteles,sartenes]);
const Caja3 = new Cajas<Electronica>([teclado,raton]);

mudanza.addPackage(Caja1);
mudanza.addPackage(Caja2);
mudanza.addPackage(Caja3);

mudanza.showAllPackages();

