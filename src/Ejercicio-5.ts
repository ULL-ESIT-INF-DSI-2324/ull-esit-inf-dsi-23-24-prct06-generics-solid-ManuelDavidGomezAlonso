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