console.log("¡Hola Proyecto Laboratorio de Programacion Omar desde Node.js!");
const Proyecto = require('./Proyecto');
const { Tarea, TareaCompuesta, CostoTotal } = require('./Tareas');

// Crear proyecto
const miProyecto = new Proyecto();

// Crear tareas
const tareaSimple = new Tarea("TS-001", 5, 'media', 100);
const tareaCompuesta = new TareaCompuesta("TC-001", 10, 'maxima', 150, [
  new Tarea("TC-001-A", 3, 'minima', 80),
  new Tarea("TC-001-B", 7, 'media', 90)
]);

// Agregar tareas al proyecto
miProyecto.agregarTarea(tareaSimple);
miProyecto.agregarTarea(tareaCompuesta);

// Mostrar detalles
console.log("=== LISTA DE TAREAS ===");
miProyecto.mostrarTareas();

// Calcular costos
const calculadorCostos = new CostoTotal(miProyecto);
calculadorCostos.mostrarResumen();