import 'mocha';
import { expect } from 'chai';
import {ArithmeticableCollection, Complex, Rational } from '../src/modificacion-1';

// Test suite for Mudanza class
describe('Pruebas añadiendo elementos a la colección.', () => {
    const complex1 = new Complex(1,2);
    const rational1 = new Rational(1,2);
    const rational2 = new Rational(5,2);
    const complex2 = new Complex(-2,3);
    const collection = new ArithmeticableCollection([rational1,complex2]); // Añadimos 2

  it('Añadimos 1 elemeto', () => {
    collection.addArithmeticable(complex1);                                // Añadimos 1
    expect(collection.collect).to.have.lengthOf(3);
  });

  it('Añadimos 2 elementos', () => {
    collection.addArithmeticable(complex1);                                 // Añadimos 1
    collection.addArithmeticable(rational2);                                // Añadimos 1
    expect(collection.collect).to.have.lengthOf(5);
  });
});

describe('Pruebas Comprobando tamaño', () => {
  const rational1 = new Rational(1,2);
  const complex2 = new Complex(-2,3);
  const collection = new ArithmeticableCollection([rational1,complex2]);
  it('Comprobando tamaño = 2', () =>{
    expect(collection.collect.length).to.equal(2);
  });
});