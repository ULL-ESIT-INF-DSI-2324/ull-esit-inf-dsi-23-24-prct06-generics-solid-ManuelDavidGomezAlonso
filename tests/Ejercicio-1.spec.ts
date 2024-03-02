import 'mocha';
import { expect } from 'chai';
import { Mudanza, Cajas, Ropa, Electronica, Cocina } from '../src/Ejercicio-1';

describe('Mudanza', () => {
  it('debería agregar una caja correctamente, además el vector mudanza y la caja deben tener mismo peso', () => {
    const mudanza = new Mudanza([]);
    const Caja1 = new Cajas<Ropa>([new Ropa("Camisa", 2, "M")]);

    mudanza.addPackage(Caja1);
    expect(mudanza.mudanza).to.deep.include(Caja1);
  });

  it('debería calcular el peso total correctamente con múltiples cajas', () => {
    const mudanza = new Mudanza([]);
    const Caja1 = new Cajas<Ropa>([new Ropa("Camisa", 2, "M")]);
    const Caja2 = new Cajas<Electronica>([new Electronica("Laptop", 2, 800)]);
    const Caja3 = new Cajas<Cocina>([new Cocina("Juego de cuchillos", 3, "Cortar")]);

    mudanza.addPackage(Caja1);
    mudanza.addPackage(Caja2);
    mudanza.addPackage(Caja3);

    expect(mudanza.getTotalWeight()).to.equal(Caja1.pesoTotalCajas() + Caja2.pesoTotalCajas() + Caja3.pesoTotalCajas());
  });

  it('debería de poder ponerse elementos de clases distintas en la misma caja.', () => {
    const mudanza = new Mudanza([]);
    const Caja1 = new Cajas<Ropa | Electronica>([new Ropa("Camisa", 2, "M")]);
    Caja1.addEnser(new Electronica("Laptop", 2, 800));
    const Caja3 = new Cajas<Cocina>([new Cocina("Juego de cuchillos", 3, "Cortar")]);

    mudanza.addPackage(Caja1);
    mudanza.addPackage(Caja3);

    expect(mudanza.mudanza).to.deep.include(Caja1);
    expect(mudanza.mudanza).to.deep.include(Caja3);
  });  
  it('debería calcular el precio total de aparatos electrónicos correctamente', () => {
    const mudanza = new Mudanza([]);
    const laptopPrice = 800;
    const smartphonePrice = 500;

    const Caja1 = new Cajas<Electronica>([new Electronica("Laptop", 2, laptopPrice)]);
    const Caja2 = new Cajas<Electronica>([new Electronica("Smartphone", 1, smartphonePrice)]);

    mudanza.addPackage(Caja1);
    mudanza.addPackage(Caja2);

    const totalElectronicPrice = Caja1.searchElementForId(0).ShowPrice();

    expect(laptopPrice).to.equal(totalElectronicPrice);
  });
});
