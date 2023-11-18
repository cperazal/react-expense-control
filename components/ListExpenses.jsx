import React from 'react'
import Expense from './Expense'

const ListExpenses = ({expenses, setExpenseEdit, handleDeleteExpense, expensesFiltered, filterSelected}) => {
    console.log(expenses, expensesFiltered)
  return (
    <div className='listado-gastos contenedor'>
        
        {
            filterSelected ? (
                <>
                    <h2>{expensesFiltered.length ? 'Gastos' : 'No hay gastos para la categoria seleccionada'}</h2>
                    {
                        expensesFiltered.map(expense => {
                            return(
                                <Expense 
                                    key={expense.id}
                                    expense={expense}
                                    setExpenseEdit={setExpenseEdit}
                                    handleDeleteExpense={handleDeleteExpense}
                                />
                            )
                        })
                    }
                </>
            ):(
                <>
                    <h2>{expenses.length ? 'Gastos' : 'No hay gastos aun'}</h2>
                    {
                        expenses.map(expense => {
                            return(
                                <Expense 
                                    key={expense.id}
                                    expense={expense}
                                    setExpenseEdit={setExpenseEdit}
                                    handleDeleteExpense={handleDeleteExpense}
                                />
                            )
                        })
                    }
                </>
            )
        }
    </div>
  )
}

export default ListExpenses