import React, { useState } from 'react'
import Message from './Message';

const NewBudget = ({budget, setBudget, setIsValidBudget}) => {

    const [message, setMessage] = useState('');

    const handleBudget = e => {
        e.preventDefault();
        if(!budget || Number(budget) < 0){
            setMessage('No es un presupuesto valido');
            return;
        }else{
            setMessage('');
            setIsValidBudget(true);
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handleBudget} className='formulario'>
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input 
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Agregar presupuesto' 
                    value={budget}
                    onChange={e => setBudget(Number(e.target.value))}
                />
            </div>
            <input type='submit' value='Agregar' />
            {
                message && <Message type='error'>{message}</Message>
            }
        </form>
    </div>
  )
}

export default NewBudget