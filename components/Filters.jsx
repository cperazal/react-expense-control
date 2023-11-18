import {useState, useEffect} from 'react'

const Filters = ({filterSelected, setFilterSelected}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form>
            <div className='campo'>
                <label>Filtrar gastos</label>
                <select value={filterSelected} onChange={e => setFilterSelected(e.target.value)}>
                    <option value=''>--Todas las categorias--</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filters