export class Mudanza {
  constructor(private mudanza: Cajas[]){
  }
  addPackage(caja: Cajas){
    this.mudanza.push(caja);
  }
  showPackageForId(id: number){
    console.log(this.mudanza[id]);
  }
  showAllPackages(){
    this.mudanza.forEach(element => {
      console.log(element);
    });
  }
}

export class Cajas {
  constructor(private conjEnseres: Enseres[]){

  }
  pesoTotalCajas(): number{
    let pesoT = 0;
    this.conjEnseres.forEach(element => {
      pesoT += element.Peso();
    });
    return pesoT;
  }
}

export abstract class Enseres extends Cajas{
  constructor(){
    super([]);
  }
  abstract tipoEnser(): string; 
  abstract Peso(): number;
  abstract Nombre(): string;
}

export class Ropa extends Enseres{
  constructor(private nombre: string, private peso: number, private talla: string){
    super();
  }
  Nombre(): string {
    return this.nombre;
  }
  Peso(): number {
    return this.peso;
  }
  tipoEnser(): string{
    return "Electronico";
  }
  ShowTalla(): string{
    return this.talla;
  }
}

export class Electronica extends Enseres{
  constructor(private nombre: string, private peso: number, private price: number){
    super();
  }
  tipoEnser(): string{
    return "Electronico";
  }
  ShowPrice(): number{
    return this.price;
  }
  Peso(): number {
    return this.peso;
  }
  Nombre(): string {
    return this.nombre;
  }
}

export class Cocina extends Enseres{
  constructor(private nombre: string, private peso: number, private utilidad: string){
    super();
  }
  tipoEnser(): string{
    return "Material de cocina";
  }
  ShowUtilidad(): string{
    return this.utilidad;
  }
  Peso(): number {
    return this.peso;
  }
  Nombre(): string {
    return this.nombre;
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

const Caja1 = new Cajas([Camisa1,Camisa2,Camisa3,Pantalo1,Portatil]);
const Caja2 = new Cajas([Iphone,juegoCuchillos,vajilla,manteles,sartenes]);
const Caja3 = new Cajas([teclado,raton]);

mudanza.addPackage(Caja1);
mudanza.addPackage(Caja2);
mudanza.addPackage(Caja3);

mudanza.showAllPackages();

