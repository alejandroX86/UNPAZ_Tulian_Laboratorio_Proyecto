class Tarea {
    constructor(codigo, duracion, complejidad, costo) {
      this.codigo = codigo;
      this.duracion = duracion;
      this.complejidad = complejidad;
      this.costo = costo;
    }
  
    getDuracion() {
      return this.duracion;
    }
  
    getCosto() {
      return this.calcularCosto();
    }
  
    calcularCosto() {
      let costoBase = this.duracion * this.costo;
      let costoExtra = 0;
  
      switch (this.complejidad) {
        case 'media':
          costoExtra = costoBase * 0.05;
          break;
        case 'maxima':
          costoExtra = this.duracion <= 10 
            ? costoBase * 0.07 
            : costoBase * 0.07 + (this.duracion - 10) * 1000;
          break;
        default:
          break;
      }
  
      return costoBase + costoExtra;
    }
  
    mostrarTarea() {
      console.log(`Codigo: ${this.codigo} - Duracion: ${this.duracion} - Costo: ${this.calcularCosto()}`);
    }
  }
  
  class TareaCompuesta extends Tarea {
    constructor(codigo, duracion, complejidad, costo, tareas = []) {
      super(codigo, duracion, complejidad, costo);
      this.tareas = tareas;
    }
  
    getDuracion() {
      return this.tareas.reduce((acum, tarea) => acum + tarea.getDuracion(), this.duracion);
    }
  
    getCosto() {
      return this.calcularCosto();
    }
  
    calcularCosto() {
      const costoBase = super.calcularCosto();
      let costoSubtareas = this.tareas.reduce((acum, tarea) => acum + tarea.getCosto(), 0);
      
      if (this.tareas.length > 3) {
        costoSubtareas *= 1.04;
      }
  
      return costoBase + costoSubtareas;
    }
  
    mostrarTarea() {
      super.mostrarTarea();
      this.tareas.forEach(tarea => tarea.mostrarTarea());
    }
  }
  
  class CostoTotal {
    constructor(proyecto) {
      this.proyecto = proyecto;
    }
  
    calcularCostoTotal() {
      const costoBase = this.proyecto.getCosto();
      let descuento = this.proyecto.tareas.length > 5 ? costoBase * 0.10 : 0;
      let recargo = this.proyecto.getDuracion() > 30 ? costoBase * 0.05 : 0;
      
      return costoBase - descuento + recargo;
    }
  
    mostrarResumen() {
      console.log(`
        === RESUMEN DEL PROYECTO ===
        Tareas: ${this.proyecto.tareas.length}
        Duración Total: ${this.proyecto.getDuracion()}
        Costo Base: $${this.proyecto.getCosto()}
        Costo Total: $${this.calcularCostoTotal()}
      `);
    }
  }
  
  module.exports = { Tarea, TareaCompuesta, CostoTotal };