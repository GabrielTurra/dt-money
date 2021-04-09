import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import React, { useState } from 'react';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }:NewTransactionModalProps){
    const { createTransaction } = useTransactions();

    const [type, setType] = useState('deposit');
    const [title, setTitle] = useState(''); 
    const [category, setCategory] = useState(''); 
    const [amount, setAmount] = useState(0); 

    async function handleCreateNewTransaction(e: React.FormEvent){
        e.preventDefault();

        await createTransaction({
            title,
            amount,
            category, 
            type
        });
        
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');

        onRequestClose();
    }

    return(
        <Modal 
            isOpen={isOpen}
            onRequestClose={ onRequestClose }
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >            
            <button 
                className="react-modal-close" 
                type="button" 
                onClick={onRequestClose}
            >
                <img src={closeImg} alt=""/>
            </button>

            <Container>
                <h2>Cadastrar Transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input 
                    placeholder="Valor" 
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                    type="number"
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor= 'green'
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        activeColor= 'red'
                    >
                        <img src={outcomeImg} alt="Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    placeholder="Categoria" 
                />

                <button type="submit" onClick={handleCreateNewTransaction}>Cadastrar</button>
            </Container>
        </Modal>
    )
}