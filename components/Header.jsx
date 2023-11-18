import React from 'react'
import NewBudget from './NewBudget'
import Budget from './Budget'

const Header = (
    {
        budget, 
        setBudget,
        isValidBudget, 
        setIsValidBudget, 
        expenses,
        setExpenses
    }) => {
  return (
    <header>
        <h1>Control de gastos</h1>
        {
            isValidBudget ? (
                <Budget 
                    budget={budget} 
                    expenses={expenses} 
                    setExpenses={setExpenses}
                    setIsValidBudget={setIsValidBudget}
                    setBudget={setBudget} />
            ):(
                <NewBudget 
                    budget={budget}
                    setBudget={setBudget}
                    setIsValidBudget={setIsValidBudget}
                />
            )
        }
    </header>
  )
}

export default Header