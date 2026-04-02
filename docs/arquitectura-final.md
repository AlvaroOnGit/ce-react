# Arquitectura Final y Beneficios de TypeScript

En este proyecto, se han utilizado **genéricos**, **uniones discriminadas**, el tipo **never**, y los **tipos de utilidad** de TypeScript para construir un DataTable genérico y funcional. Esta documentación explica cómo estas herramientas han reducido la carga de errores en tiempo de ejecución, en comparación con un proyecto escrito en JavaScript estándar.

## 1. Uso de Genéricos

El componente `DataTable<T>` y los hooks como `useEditState<T>` utilizan **genéricos** para garantizar que los tipos de datos sean consistentes a lo largo de la aplicación.

* `DataTable<T>` recibe un array de datos de tipo `T` y columnas definidas con `ColumnDef<T>`.
* Esto asegura que cualquier acceso a las propiedades de `T` sea seguro, y que las columnas referencien únicamente claves existentes en `T`.

**Beneficio frente a JavaScript:**

* En JS, acceder a `row[col.key]` podría fallar si la clave no existe, provocando errores en runtime. Con TypeScript y genéricos, esto es verificado en tiempo de compilación.

## 2. Uniones Discriminadas

Para los estados de edición, se podría definir algo como:

```ts
interface EditState<T> { type: 'editing'; rowKey: React.Key; ... }
interface IdleState { type: 'idle' }

type TableState<T> = EditState<T> | IdleState;
```

* Aquí, `type` actúa como **discriminador**.
* Cuando se verifica `state.type === 'editing'`, TypeScript sabe automáticamente que las propiedades de `EditState` están disponibles.

**Beneficio:**

* Evita acceder a propiedades inexistentes según el estado, eliminando errores típicos de JS como `Cannot read property 'editDraft' of undefined`.

## 3. Tipo `never`

* Se utiliza en patrones de exhaustividad, por ejemplo, en `switch` sobre uniones discriminadas:

```ts
function assertNever(x: never): never {
  throw new Error('Caso no manejado: ' + x);
}
```

* Esto fuerza a manejar todos los casos posibles en tiempo de compilación.

**Beneficio:**

* Garantiza que si se agrega un nuevo estado o tipo de columna, el compilador advierte si olvidamos actualizar la lógica, reduciendo fallos de runtime.

## 4. Tipos de utilidad (`Partial`, `Pick`, etc.)

* `Partial<T>` se usa para manejar **drafts de edición**, permitiendo que solo algunas propiedades estén presentes mientras el usuario edita.
* `Pick<T, K>` se utiliza para operaciones de actualización parciales, asegurando que solo se modifiquen campos válidos.

**Beneficio:**

* Evita mutaciones accidentales de propiedades inexistentes o inválidas.
* Refuerza la consistencia de tipos sin necesidad de verificaciones manuales en tiempo de ejecución.

## 5. Comparación con JavaScript estándar

En JS puro:

* No hay verificación de tipos: errores como `undefined` o `null` podrían romper la UI.
* Acceder a propiedades inexistentes o usar un estado inesperado podía causar errores de runtime difíciles de depurar.
* La edición de datos requeriría múltiples validaciones manuales, aumentando la complejidad.

En TypeScript:

* El compilador detecta accesos inválidos a propiedades de objetos genéricos.
* La combinación de discriminated unions y never asegura que todos los estados sean manejados.
* Los tipos de utilidad simplifican operaciones parciales sin perder seguridad.

**Conclusión:**
El uso de estas características de TypeScript ha permitido construir un DataTable **robusto, tipado y seguro**, reduciendo la posibilidad de errores en runtime que serían comunes en JavaScript estándar, y facilitando el mantenimiento y escalabilidad del proyecto.
