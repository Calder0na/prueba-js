//Ejercicio  básico 1
const tareas = [];
const lista = document.getElementById('lista-tareas');
const input = document.getElementById('nueva-tarea');
const pills = document.querySelectorAll(".pill");

//agregar tarea
function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") {
        alert("Debe llenar el recuadro");
        return;
    }
    tareas.push({ texto: texto, completada: false });
    input.value = "";
    actualizarLista();
}

// actualizar lista de tareas
function actualizarLista() {
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        const li = document.createElement("li");

        //texto de tarea
        const span = document.createElement("span");
        span.textContent = tareas[i].texto;
        if (tareas[i].completada) {
            span.classList.add("completada");
        }

        // botón para completar con ternario
        const btnCompleta = document.createElement("button");
        btnCompleta.textContent = tareas[i].completada ? "Desmarcar" : "Completar";
        btnCompleta.onclick = function () {
            tareas[i].completada = !tareas[i].completada;
            actualizarLista();
        };

        //boton editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = function () {
            const nueva = prompt("Editar tarea:", tareas[i].texto);
            if (nueva) {
                tareas[i].texto = nueva.trim();
                actualizarLista();
            }
        };

        //eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.onclick = function () {
            tareas.splice(i, 1);
            actualizarLista();
        };

        li.appendChild(span);
        li.appendChild(btnCompleta);
        li.appendChild(btnEditar);
        li.appendChild(btnEliminar);
        lista.appendChild(li);
    }

    //actualizar contadores
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    pills[0].textContent = `Total: ${total}`;
    pills[1].textContent = `Pendientes: ${pendientes}`;
    pills[2].textContent = `Completadas: ${completadas}`;
}
//eventos de los botones agregar y limpiar
document.getElementById("btn-agregar").onclick = agregarTarea;
document.getElementById("btn-limpiar").onclick = function () {
    tareas.length = 0;
    actualizarLista();
};

