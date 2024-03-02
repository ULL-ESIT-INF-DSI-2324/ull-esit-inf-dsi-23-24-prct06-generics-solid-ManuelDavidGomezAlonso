import { expect, use } from 'chai';
import chaiFs from 'chai-fs';
import 'mocha';
import { GeneradorPDF, GeneradorHTML, FacturaCabecera, FacturaProducts, FacturaFinalInforamtion } from '../src/Ejercicio-2';

use(chaiFs);

describe('Factura', () => {
  const facturaCab = new FacturaCabecera(1, new Date(), new Date(), 'Mi Empresa', 'Cliente Ejemplo');
  const facturaProd = new FacturaProducts('Producto 1', 2, 10, 20);
  const facturaFinal = new FacturaFinalInforamtion('Tarjeta', 'Sin notas');

  it('GeneradorPDF debe generar un PDF', () => {
    const generadorPDF = new GeneradorPDF(facturaCab, facturaProd, facturaFinal);
    generadorPDF.generarFactura();

    const pdfFilePath = `Factura${facturaCab.getFactNum()}.pdf`;
    expect(pdfFilePath).to.be.a.path().that.is.a.file();
  });

  it('GeneradorHTML dee generar archivo HTML', () => {
    const generadorHTML = new GeneradorHTML(facturaCab, facturaProd, facturaFinal);
    generadorHTML.generarFactura();

    const htmlFilePath = `Factura${facturaCab.getFactNum()}.html`;
    expect(htmlFilePath).to.be.a.path().that.is.a.file();
  });
});
