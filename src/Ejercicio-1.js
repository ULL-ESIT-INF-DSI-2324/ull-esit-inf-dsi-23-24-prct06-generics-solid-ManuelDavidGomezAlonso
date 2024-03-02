"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cocina = exports.Electronica = exports.Ropa = exports.Cajas = exports.Mudanza = void 0;
/**
 * @brief Clase Mudanza que almacenará un conjunto de cajas.
 */
var Mudanza = /** @class */ (function () {
    /**
     * @brief Constructor de la clase Mudanza que almacenará todos los objetos de la misma.
     * @param mudanza Un vector con el conjunto de cajas de la mudanza.
     */
    function Mudanza(mudanza) {
        this.mudanza = mudanza;
    }
    /**
     * @brief Añade una caja a la mudanza.
     * @param caja La caja que se añadirá a la mudanza (Objeto de la clase Caja).
     */
    Mudanza.prototype.addPackage = function (caja) {
        this.mudanza.push(caja);
    };
    /**
     * @brief Muestra los elementos de una caja en concreto.
     * @param id El id de la caja que se quiere mostrar.
     */
    Mudanza.prototype.showPackageForId = function (id) {
        console.log(this.mudanza[id]);
        return this.mudanza[id];
    };
    /**
     * @brief Muestra todos los paquetes de la mudanza.
     */
    Mudanza.prototype.showAllPackages = function () {
        this.mudanza.forEach(function (caja, index) {
            console.log("Caja ".concat(index + 1, ":"));
            caja.showElementsInCage(); // Utiliza el método existente en la clase Cajas
            console.log("\n"); // Salto de línea para separar las cajas
        });
    };
    /**
     * @brief Devuelve el peso total de la mudanza.
     * @return El peso total de la mudanza.
     */
    Mudanza.prototype.getTotalWeight = function () {
        var totalWeight = 0;
        this.mudanza.forEach(function (caja) {
            totalWeight += caja.pesoTotalCajas();
        });
        return totalWeight;
    };
    return Mudanza;
}());
exports.Mudanza = Mudanza;
/**
 * @brief Clase Cajas que almacenará un conjunto de enseres.
 * Esta clase es genérica, ya que puede almacenar cualquier tipo de enser, esto se debe a que condicionamos la generalidad T con la interface Enser.
 * `<T extends Enser>` indica que T debe ser un tipo que implemente la interfaz Enser.`
 */
var Cajas = /** @class */ (function () {
    /**
     * @brief Constructor de la clase Cajas que almacenará todos los objetos de la misma.
     * @param conjEnseres Un vector con el conjunto de enseres de la caja.
     */
    function Cajas(conjEnseres) {
        this.conjEnseres = conjEnseres;
    }
    /**
     * @brief Añade un enser a la caja.
     * @param enser El enser que se añadirá a la caja (Objeto de la clase Enser).
     */
    Cajas.prototype.pesoTotalCajas = function () {
        var pesoT = 0;
        this.conjEnseres.forEach(function (element) {
            pesoT += element.Peso();
        });
        return pesoT;
    };
    Cajas.prototype.showElementsInCage = function () {
        console.log("Contenido de la Caja:\n");
        this.conjEnseres.forEach(function (element) {
            console.log("- ".concat(element.Nombre(), "\n\tPeso: ").concat(element.Peso(), " kg"));
            if (element instanceof Ropa) {
                console.log("\tTalla: ".concat(element.ShowTalla()));
            }
            else if (element instanceof Cocina) {
                console.log("\tUtilidad: ".concat(element.ShowUtilidad()));
            }
            else if (element instanceof Electronica) {
                console.log("\tPrecio: ".concat(element.ShowPrice(), " USD"));
            }
            console.log("\n");
        });
        console.log("Peso Total de la Caja: ".concat(this.pesoTotalCajas(), " kg\n"));
    };
    Cajas.prototype.searchElementForId = function (id) {
        console.log(this.conjEnseres[id]);
        return this.conjEnseres[id];
    };
    Cajas.prototype.addEnser = function (enser) {
        this.conjEnseres.push(enser);
    };
    return Cajas;
}());
exports.Cajas = Cajas;
/**
 * @brief Clase Ropa cumple con la Iterface Enser.
 */
var Ropa = /** @class */ (function () {
    /**
     * @brief Constructor de la clase Ropa.
     * @param nombre Nombre de la prenda.
     * @param peso Peso en kilogramos de la prenda.
     * @param talla Talla de la prenda (S, M, L, XL, etc).
     */
    function Ropa(nombre, peso, talla) {
        this.nombre = nombre;
        this.peso = peso;
        this.talla = talla;
    }
    /**
     * @brief Devuelve el nombre de la prenda.
     * @return Nombre de la prenda (Por ejemplo: Ropa: Chandal nike).
     */
    Ropa.prototype.Nombre = function () {
        return "".concat(this.tipoEnser(), ": ").concat(this.nombre);
    };
    /**
     * @brief Devuelve el peso de la prenda.
     * @return El peso de la prenda (Por ejemplo: 0.25).
     */
    Ropa.prototype.Peso = function () {
        return this.peso;
    };
    /**
     * @brief Devuelve el tipo de Enser, en este caso Ropa.
     * @return Tipo de enser.
     */
    Ropa.prototype.tipoEnser = function () {
        return "Ropa";
    };
    /**
     * @brief Devuelve la talla de la prenda.
     * @return La talla de la prenda (S, M, L, XL, etc).
     */
    Ropa.prototype.ShowTalla = function () {
        return this.talla;
    };
    return Ropa;
}());
exports.Ropa = Ropa;
/**
 * @brief Clase Electronica cumple con la Iterface Enser.
 */
var Electronica = /** @class */ (function () {
    /**
     * @brief Constructor de la clase Electronica.
     * @param nombre Nombre del aparato electrónico.
     * @param peso Peso en kilogramos del aparato electrónico.
     * @param price Precio del aparato electrónico.
     */
    function Electronica(nombre, peso, price) {
        this.nombre = nombre;
        this.peso = peso;
        this.price = price;
    }
    /**
     * @brief Devuelve el tipo de Enser, en este caso Electronica.
     * @return Tipo de enser.
     */
    Electronica.prototype.tipoEnser = function () {
        return "Electronica";
    };
    /**
     * @brief Devuelve el precio del aparato electrónico.
     * @return El precio del aparato electrónico (Por ejemplo: 500).
     */
    Electronica.prototype.ShowPrice = function () {
        return this.price;
    };
    /**
     * @brief Devuelve el peso del aparato electrónico.
     * @return El peso del aparato electrónico (Por ejemplo: 2).
     */
    Electronica.prototype.Peso = function () {
        return this.peso;
    };
    /**
     * @brief Devuelve el nombre del aparato electrónico.
     * @return Nombre del aparato electrónico (Por ejemplo: Electrónica: Iphone).
     */
    Electronica.prototype.Nombre = function () {
        return "".concat(this.tipoEnser(), ": ").concat(this.nombre);
    };
    return Electronica;
}());
exports.Electronica = Electronica;
/**
 * @brief Clase Cocina cumple con la Iterface Enser.
 */
var Cocina = /** @class */ (function () {
    /**
     * @brief Constructor de la clase Cocina.
     * @param nombre Nombre del enser de cocina.
     * @param peso Peso en kilogramos del enser de cocina.
     * @param utilidad Utilidad del enser de cocina.
     */
    function Cocina(nombre, peso, utilidad) {
        this.nombre = nombre;
        this.peso = peso;
        this.utilidad = utilidad;
    }
    /**
     * @brief Devuelve el tipo de Enser, en este caso Cocina.
     * @return Tipo de enser.
     * */
    Cocina.prototype.tipoEnser = function () {
        return "Cocina";
    };
    /**
     * @brief Devuelve la utilidad del enser.
     * @return La utilidad del enser (Por ejemplo: Cortar).
     * */
    Cocina.prototype.ShowUtilidad = function () {
        return this.utilidad;
    };
    /**
     * @brief Devuelve el peso del enser.
     * @return El peso del enser (Por ejemplo: 3).
     * */
    Cocina.prototype.Peso = function () {
        return this.peso;
    };
    /**
     * @brief Devuelve el nombre del enser.
     * @return Nombre del enser (Por ejemplo: Cocina: Juego de cuchillos).
     * */
    Cocina.prototype.Nombre = function () {
        return "".concat(this.tipoEnser(), ": ").concat(this.nombre);
    };
    return Cocina;
}());
exports.Cocina = Cocina;
var mudanza = new Mudanza([]);
var Camisa1 = new Ropa("Camisa", 2, "M");
var Camisa2 = new Ropa("Camisa", 2, "L");
var Camisa3 = new Ropa("Camisa", 2, "S");
var Pantalo1 = new Ropa("Pantalon", 3, "M");
var Portatil = new Electronica("Laptop", 5, 500);
var Iphone = new Electronica("Iphone", 2, 300);
var juegoCuchillos = new Cocina("Juego de cuchillos", 3, "Cortar");
var vajilla = new Cocina("Vajilla", 5, "Comer");
var manteles = new Cocina("Manteles", 2, "Cubrir");
var sartenes = new Cocina("Sartenes", 3, "Cocinar");
var teclado = new Electronica("Teclado", 2, 50);
var raton = new Electronica("Raton", 2, 20);
var Caja1 = new Cajas([Camisa1, Camisa2, Camisa3, Pantalo1, Portatil]);
var Caja2 = new Cajas([Iphone, juegoCuchillos, vajilla, manteles, sartenes]);
var Caja3 = new Cajas([teclado, raton]);
mudanza.addPackage(Caja1);
mudanza.addPackage(Caja2);
mudanza.addPackage(Caja3);
mudanza.showAllPackages();
