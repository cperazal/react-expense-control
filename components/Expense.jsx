import React from 'react';
import { 
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';
import "react-swipeable-list/dist/styles.css";

const Expense = ({expense, setExpenseEdit, handleDeleteExpense}) => {

  const leadingActions =() => (
    <LeadingActions>
      <SwipeAction onClick={() => setExpenseEdit(expense)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  const trailingActions =() => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => handleDeleteExpense(expense.id)}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
   <SwipeableList>
    <SwipeableListItem leadingActions={leadingActions()} trailingActions={trailingActions()}>
      <div className='gasto sombra'>
          <div className='contenido-gasto'>
              <img src={`../src/img/icono_${expense.category}.svg`} alt={`icono ${expense.category}`} />
              <div className='descripcion-gasto'>
                  <p className='categoria'>{expense.category}</p>
                  <p className='nombre-gasto'>{expense.name}</p>
                  <p className='fecha-gasto'>
                      Agregado el: {''} <span>{expense.date}</span>
                  </p>
              </div>
          </div>
          <p className='cantidad-gasto'>${expense.amount}</p>
      </div>
    </SwipeableListItem>
   </SwipeableList>
  )
}

export default Expense