
import { useEffect, useState } from 'react';
import Message from './Message';
import CloseModalIcon from '../src/img/cerrar.svg';

export const Modal = ({setModal, modalAnimated, setModalAnimated, handleExpenses, expenseEdit, setExpenseEdit}) => {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if(Object.keys(expenseEdit).length > 0){
            setName(expenseEdit.name);
            setAmount(expenseEdit.amount);
            setCategory(expenseEdit.category);
            setId(expenseEdit.id);
            setDate(expenseEdit.date);
        }
    }, [])

    const handleCloseButton = () => {
        setModalAnimated(false);
        setExpenseEdit({});
        setTimeout(() => {
            setModal(false);
        }, 250);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if([name, amount, category].includes('')){
            setMessage('todos los campos son obligatorios');
            setTimeout(() => {
                setMessage('');
            }, 2000);
        }

        handleExpenses({name, amount, category, id, date});

    }

  return (
    <div className="modal">
        <div className='cerrar-modal'>
            <img 
                src={CloseModalIcon}
                alt='Close Modal'
                onClick={handleCloseButton}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${modalAnimated ? 'animar': 'cerrar'}`}>
            <legend>{expenseEdit.name ? 'Editar gasto': 'Nuevo gasto'}</legend>
            {
                message && <Message type='error'>{message}</Message>
            }
            <div className='campo'>
                <label htmlFor='name'>Nombre gasto</label>
                <input 
                    id='name'
                    type='text'
                    placeholder='Ingresa el nombre del gasto'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label htmlFor='amount'>Cantidad</label>
                <input 
                    id='amount'
                    type='number'
                    placeholder='Ingresa el monto del gasto'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor='category'>Categoria</label>
                <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>-- Seleccione --</option>
                    <option value='ahorro'>Ahorro</option>
                    <option value='comida'>Comida</option>
                    <option value='casa'>Casa</option>
                    <option value='gastos'>Gastos</option>
                    <option value='ocio'>Ocio</option>
                    <option value='salud'>Salud</option>
                    <option value='suscripciones'>Suscripciones</option>
                </select>
            </div>
            <input 
                type='submit'
                value={expenseEdit.name ? 'Guardar cambios': 'Agregar gasto'}
            />
        </form>
    </div>
  )
}
