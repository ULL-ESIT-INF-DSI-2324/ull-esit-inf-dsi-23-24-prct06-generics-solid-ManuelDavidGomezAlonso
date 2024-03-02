/**
 * @fileoverview Archivo que implementará un generador de facturas en código html o en pdf, además cumpliendo con los principios SOLID en especial con el principio O.
 * Podríamos agregar facilmente más generadores, ya que cada clase tiene una funcionalidad específica y esto nos permitirá no tener que modificarlas al implementar un nuevo formato.
 * Universidad de La Laguna.
 * Desarrollo de Sistemas Informáticos.
 * Ejercicio 2: Generando Facturas en archivos externos.
 * Alu0101347301@ull.edu.es
 * @author Manuel David Gómez Alonso
 * @license MIT
 */
import * as fs from 'fs';
import PDFDocument from 'pdfkit';

type paymentMethods = "Efectivo" | "Tarjeta" | "Transferencia";

/**
 * @brief Clase genérica y abstracta factura implementará el formato de la factura y la misma.
 */
export abstract class Factura <T>{
  constructor(private cabecera: T, private products: T, private finalInformation: T) {}
  abstract generarFactura(): void;
}

/**
 * @brief Clase Generador PDF hija de Factura, generará la misma en pdf.
 */
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

/**
 * @brief Clase Generador HTML hija de Factura, generará la misma en html.
 */
export class GeneradorHTML extends Factura<FacturaCabecera | FacturaProducts | FacturaFinalInforamtion>{
  constructor(private factCab:FacturaCabecera, private factDesc:FacturaProducts, private factFinal:FacturaFinalInforamtion){
    super(factCab, factDesc, factFinal);
  }
  /**
   * @brief Método que genera la factura en formato html.
   * Realmente esta función es de tipo void, pero al ejecutarse nos generará un archivo html.
   * @returns Devuelve un archivo html con la factura.
   */
  generarFactura(){
    const htmlContent:string = `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Factura nº ${this.factCab.getFactNum()}</title>
  </head>
  <body>
    <h1>Factura nº ${this.factCab.getFactNum()} - ${this.factCab.getEmisor()}</h1>
    <p>Cliente: ${this.factCab.getReceptor()}</p>
    <p>Fecha de emisión: ${this.factCab.getFechaFactEm()}</p>
    <p>Fecha de vencimiento: ${this.factCab.getFechaFactVen()}</p>
    <p>Empresa emisora: ${this.factCab.getEmisor()}</p>
    <br>
    <hr>
    <table border = "1">
      <tr>
        <th>Descripción</th>
        <th>Cantidad</th>
        <th>Precio unitario</th>
        <th>Precio total</th>
      </tr>
      <tr>
      <th>Cantidad</th>
        <td>${this.factDesc.getDescription()}</td>
        <td>${this.factDesc.getCant()}</td>
        <td>${this.factDesc.getUnitPrice()}</td>
        <td>${this.factDesc.getTotalPrice()}</td>
      </tr>
    </table>
    <br>
    Método de pago: ${this.factFinal.getPaymenthMethod()}
    <br>
    Nota: ${this.factFinal.getNota()}
  </body>
</html>`;
    fs.writeFileSync(`Factura${this.factCab.getFactNum()}.html`, htmlContent);
  }
}

/**
 * @brief Clase FacturaCabecera, contendrá la información de la cabecera de la factura.
 */
export class FacturaCabecera {
  constructor(private factNum:number, 
    private fechaFactEm: Date, 
    private fechaFactVen: Date, 
    private Emisor: string, 
    private Receptor: string){
  }

  /**
   * @brief Esta función, devuelve el número de la factura.
   * @returns Devuelve el número de la factura.
   */
  getFactNum():number{
    return this.factNum;
  }

/**
 * @brief Esta función, devuelve la fecha de emisión de la factura.
 * @returns Devuelve la fecha de emisión de la factura.
 */
  getFechaFactEm():Date{
    return this.fechaFactEm;
  }

  /**
   * @brief Esta función, devuelve la fecha de vencimiento de la factura.
   * @returns Devuelve la fecha de vencimiento.
   */
  getFechaFactVen():Date{
    return this.fechaFactVen;
  }

  /**
   * @brief Esta función, devuelve el nombre de la persona u entidad que emite la factura.
   * @returns Devuelve el emisor de la factura.
   */
  getEmisor():string{
    return this.Emisor;
  }

  /**
   * @brief Esta función, devuelve el nombre de la persona u entidad a quien va dirigida la factura.
   * @returns Devuelve el receptor de la factura.
   */
  getReceptor():string{
    return this.Receptor;
  }
}

/**
 * @brief Clase FacturaProducts, contendrá la información de los productos de la factura.
 */
export class FacturaProducts {
  constructor(private description: string,
    private cant: number,
    private unitPrice: number,
    private totalPrice: number){
    }

  /**
   * @brief Esta función, devuelve la descripción de los productos comprados.
   * @returns Devuelve la descripción de los productos.
   */
  getDescription():string{
    return this.description;
  }

  /**
   * @brief Esta función, devuelve la cantidad de productos.
   * @returns Devuelve la cantidad de productos.
   */
  getCant():number{
    return this.cant;
  }

  /**
   * @brief Esta función, devuelve el precio unitario de los productos.
   * @returns Devuelve el precio unitario de los productos.
   */
  getUnitPrice():number{
    return this.unitPrice;
  }

  /**
   * @brief Esta función, devuelve el precio total a abonar.
   * @returns Devuelve el precio total de los productos.
   */
  getTotalPrice():number{
    return this.totalPrice;
  }
}

/**
 * @brief Clase FacturaFinalInforamtion, contendrá la información final de la factura.
 */
export class FacturaFinalInforamtion {
  constructor(private paymenthMethod: paymentMethods,
    private nota: string){
  }

/**
 * @brief Método que devuelve el método de pago.
 * @returns Método de pago
 */
  getPaymenthMethod():paymentMethods{
    return this.paymenthMethod;
  }

/**
 * @brief Método que devuelve la nota.
 * @returns Devuelve una nota con información adicional de la factura.
 */
  getNota():string{
    return this.nota;
  }
}


const facturaCab = new FacturaCabecera(1, new Date(), new Date(), 'Mi Empresa', 'Cliente Ejemplo');
const facturaProd = new FacturaProducts('Producto 1', 2, 10, 20);
const facturaFinal = new FacturaFinalInforamtion('Tarjeta', 'Sin notas');

const generadorHTML = new GeneradorHTML(facturaCab, facturaProd, facturaFinal);

generadorHTML.generarFactura();
const generadorPDF = new GeneradorPDF(facturaCab, facturaProd, facturaFinal);
generadorPDF.generarFactura();