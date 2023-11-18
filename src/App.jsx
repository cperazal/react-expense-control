import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NewExpenseIcon from './img/nuevo-gasto.svg';
import { Modal } from '../components/Modal';
import { formatDate, generateId } from '../helpers';
import ListExpenses from '../components/ListExpenses';
import Filters from '../components/Filters';

function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAnimated, setModalAnimated] = useState(false);
  const [expenseEdit, setExpenseEdit] = useState({});
  const [filterSelected, setFilterSelected] = useState("");
  const [expensesFiltered, setExpensesFiltered] = useState([]);

  useEffect(() => {
    if(Object.keys(expenseEdit).length > 0){
      handleEditExpense();
    }
  }, [expenseEdit])

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0)
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses])

  useEffect(() => {
    const budgetStorage = Number(localStorage.getItem('budget')) ?? 0;
    if(budgetStorage > 0){
      setIsValidBudget(true);
    }
  },[])

  useEffect(() => {
    if(filterSelected){
      const expensesFiltered = expenses.filter(e => e.category === filterSelected);
      setExpensesFiltered(expensesFiltered);
    }
  }, [filterSelected])

  const handleNewExpense = () => {
    setModal(true);
    setExpenseEdit({});
    setTimeout(() => {
      setModalAnimated(true);
    }, 500);
  }

  const handleEditExpense = () => {
    setModal(true);
    setTimeout(() => {
      setModalAnimated(true);
    }, 500);
  }

  const handleExpenses = expense => {

    if(expense.id) {
      // actualizar
      const expensesEdit = expenses.map(expenseState => expenseState.id === expense.id ? expense: expenseState);
      setExpenses(expensesEdit);
      setExpenseEdit({});
    }else{
      // registrar
      expense.id = generateId();
      expense.date = formatDate(Date.now());
      setExpenses([...expenses, expense]);
    }

    
    setModalAnimated(false);
        setTimeout(() => {
            setModal(false);
        }, 250);
  }

  const handleDeleteExpense = expense_id => {
    const expensesUpdated = expenses.filter(expense => expense.id != expense_id);
    setExpenses(expensesUpdated);
  }

  return (
    <div className={modal ? 'fijar': ''}>
      <Header 
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        setExpenses={setExpenses}
        expenses={expenses}
      />
      {
        isValidBudget && (
          <>
            <main>
              <Filters 
                filterSelected={filterSelected}
                setFilterSelected={setFilterSelected}
              />
              <ListExpenses 
                expenses={expenses}
                setExpenseEdit={setExpenseEdit}
                handleDeleteExpense={handleDeleteExpense}
                expensesFiltered={expensesFiltered}
                setExpensesFiltered={setExpensesFiltered}
                filterSelected={filterSelected}
              />
            </main>
            <div className='nuevo-gasto'>
              <img 
                src={NewExpenseIcon}
                alt='New expense icon'
                onClick={handleNewExpense}
              />
            </div>
          </>
        )
      }

      {
        modal && <Modal 
            setModal={setModal} 
            modalAnimated={modalAnimated}
            setModalAnimated={setModalAnimated}
            handleExpenses={handleExpenses}
            expenseEdit={expenseEdit}
            setExpenseEdit={setExpenseEdit}
          />
      }

    </div>
  )
}

export default App
