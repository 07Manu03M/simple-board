// Verifica si 'studentPayments' ya está en localStorage, si no, lo inicializa con un array vacío
if (!localStorage.getItem("studentPayments")) {
    const samplePayments = [
        {
            name: "Juan Pérez",
            schedule: "First",
            billNumber: "00012345",
            amountPaid: "COP 500,000",
            balanceAmount: "COP 1,500,000",
            date: "05-Mar-2025"
        },
        {
            name: "María López",
            schedule: "Second",
            billNumber: "00067890",
            amountPaid: "COP 700,000",
            balanceAmount: "COP 800,000",
            date: "15-Feb-2025"
        },
        {
            name: "Carlos Ramírez",
            schedule: "First",
            billNumber: "00054321",
            amountPaid: "COP 1,000,000",
            balanceAmount: "COP 500,000",
            date: "22-Jan-2025"
        }
    ];

    // Guardar los datos en localStorage bajo la clave 'studentPayments'
    localStorage.setItem("studentPayments", JSON.stringify(samplePayments));
}

// Función para obtener los pagos desde localStorage
function getStudentPayments() {
    return JSON.parse(localStorage.getItem("studentPayments")) || [];
}

// Función para guardar pagos en localStorage
function saveStudentPayments(payments) {
    localStorage.setItem("studentPayments", JSON.stringify(payments));
}

// Función para mostrar los pagos en la tabla
function showPaymentsTable() {
    const tableBody = document.getElementById("table__payments");
    tableBody.innerHTML = ""; // Limpiar tabla antes de agregar los datos

    const payments = getStudentPayments();

    payments.forEach(payment => {
        // Crear una fila para la tabla
        const row = document.createElement("tr");

        // Crear celdas para cada campo del pago
        row.innerHTML = `
            <td>${payment.name}</td>
            <td>${payment.billNumber}</td>
            <td>${payment.amountPaid}</td>
            <td>${payment.balanceAmount}</td>
            <td>${payment.date}</td>
            <td><button class="view-btn">👁</button></td>
        `;

        // Crear un div con los detalles adicionales (inicialmente oculto)
        const detailsDiv = document.createElement("tr");
        detailsDiv.classList.add("details-row");
        detailsDiv.style.display = "none";  // Mantener oculto por defecto
        detailsDiv.innerHTML = `
            <td colspan="6">
                <div>
                    <strong>Schedule:</strong> ${payment.schedule}
                </div>
                <div>
                    <strong>Bill Number:</strong> ${payment.billNumber}
                </div>
                <div>
                    <strong>Amount Paid:</strong> ${payment.amountPaid}
                </div>
                <div>
                    <strong>Balance Amount:</strong> ${payment.balanceAmount}
                </div>
                <div>
                    <strong>Payment Date:</strong> ${payment.date}
                </div>
            </td>
        `;
        
        // Agregar la fila de detalles después de la fila principal
        tableBody.appendChild(row);
        tableBody.appendChild(detailsDiv);

        // Añadir un evento al botón para mostrar/ocultar los detalles
        const viewBtn = row.querySelector(".view-btn");
        viewBtn.addEventListener("click", () => {
            // Alternar la visibilidad del div con los detalles
            if (detailsDiv.style.display === "none") {
                detailsDiv.style.display = "table-row";
            } else {
                detailsDiv.style.display = "none";
            }
        });
    });
}

// Llamar a la función para mostrar los pagos al cargar la página
document.addEventListener("DOMContentLoaded", showPaymentsTable);
