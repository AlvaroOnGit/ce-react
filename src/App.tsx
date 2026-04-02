import { useState } from 'react';
import { DataTable } from './components/DataTable';
import type { ColumnDef } from "./types/DataTable.types";
import { calcularDiferenciaDias } from "./utils/dateUtil.ts";

type Estudiante = {
  id: string;
  nombre: string;
  departamento: string;
  creditos: number;
  anoEntrada: number;
};

function App() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    { id: "E001", nombre: "Ana García", departamento: "Informática", creditos: 240, anoEntrada: 2021 },
    { id: "E002", nombre: "Luis Martínez", departamento: "Matemáticas", creditos: 180, anoEntrada: 2022 },
    { id: "E003", nombre: "Sara López", departamento: "Física", creditos: 300, anoEntrada: 2020 },
    { id: "E004", nombre: "Marc Torres", departamento: "Informática", creditos: 120, anoEntrada: 2023 },
  ]);

  const columnas: ColumnDef<Estudiante>[] = [
    { key: "id", header: "ID" },
    { key: "nombre", header: "Nombre", editable: true },
    { key: "departamento", header: "Departamento", editable: true },
    { key: "creditos", header: "Créditos", editable: true },
    { key: "anoEntrada", header: "Año entrada", editable: true },
  ];

  const handleSave = (original: Estudiante, cambios: Partial<Estudiante>) => {
    setEstudiantes(prev =>
        prev.map(est =>
            est.id === original.id ? { ...est, ...cambios } : est
        )
    );
  };

  const handleDelete = (estudiante: Estudiante) => {
    setEstudiantes(prev => prev.filter(est => est.id !== estudiante.id));
  };

  const fecha1 = new Date(2026, 0, 1);
  const fecha2 = new Date(2026, 0, 15);

  const dias = calcularDiferenciaDias(fecha1, fecha2);

  return (
      <div>
        <div>
          <h1>Estudiantes</h1>
          <DataTable
              data={estudiantes}
              columns={columnas}
              keyField="id"
              onSave={handleSave}
              onDelete={handleDelete}
              caption="Lista de estudiantes"
          />
        </div>

        <div>
          <h1>Diferencia de días</h1>
          <p>
            Entre {fecha1.toDateString()} y {fecha2.toDateString()} hay {dias} días.
          </p>
        </div>
      </div>
  );
}

export default App;