import React, { useEffect, useState } from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Budget = (
        {
            budget, 
            expenses,
            setExpenses,
            setIsValidBudget,
            setBudget
        }) => {

    const [amountAvailable, setAmountAvailable] = useState(0);
    const [amountSpent, setAmountSpent] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        calculateAmountSpent();
    }, [expenses]);

    const calculateAmountSpent = () => {
        const totalSpent = expenses.reduce((total, expense) => {
            return expense.amount + total;
        }, 0);

        const totalAvailable = budget - totalSpent;

        const percent_new = (((budget - totalAvailable) / budget ) * 100).toFixed(2);
        
        setTimeout(() => {
            setPercent(percent_new);
        }, 1000);
        setAmountSpent(totalSpent);
        setAmountAvailable(totalAvailable);
    }

    const formatCurrency = value =>{
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const answer = confirm("Realmente desea resetear su presupuesto?");
        if(answer){
            setExpenses([]);
            setBudget(0);
            setIsValidBudget(false); 
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={percent}
                styles={buildStyles({
                    pathColor: percent > 100 ? "#DC2626" : "#3B82F6",
                    trailColor: "#F5F5F5",
                    textColor: percent > 100 ? "#DC2626" : "#3B82F6"
                })}
                text={`${percent}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={() => handleResetApp()}>
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> {formatCurrency(budget)}
            </p>
            <p className={`${amountAvailable < 0 ? 'negativo': ''}`}>
                <span>Disponible: </span> {formatCurrency(amountAvailable)}
            </p>
            <p>
                <span>Gastado: </span> {formatCurrency(amountSpent)}
            </p>
        </div>
    </div>
  )
}

export default Budget