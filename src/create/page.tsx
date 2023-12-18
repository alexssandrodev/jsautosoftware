'use client';
import { FormEvent, useEffect, useState } from 'react';
import useLaunch from '../hooks/useLaunch';
import styles from './Create.module.css';
import { v4 as uuidv4 } from 'uuid';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import Part from '@/models/Part';
import { format } from '@/utils/FormatPrice';

function Create() {
    const { launch, setLaunch } = useLaunch();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [partsList, setPartsList] = useState<Part[]>([]);

    const [name, setName] = useState<string>('');
    const [valueHand, setValueHand] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [parts, setPart] = useState<string>('');
    const [valueParts, setValuePart] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('launchs', JSON.stringify(launch));
        // localStorage.setItem('aux-name', JSON.stringify(auxName));
    }, [launch]);

    function addParts() {
        if (parts === '' && valueParts === '') {
            return;
        }
        const part = {
            id: uuidv4(),
            title: parts,
            value: parseFloat(valueParts)
        }
        setPartsList([...partsList, part]);
    }

    // start
    useEffect(() => {
        getPartsTotalPrice();
    }, [partsList]);


    function addLaunch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name === '' && date === '' && parts === '' && valueParts === '') {
            return;
        }
        const valueHandFormat = valueHand === '' ? 0 : parseFloat(valueHand);
        const launchObj = {
            id: uuidv4(),
            name: name,
            valueHandConstructions: valueHandFormat,
            date: date,
            parts: parts,
            valueParts: valueParts
        }
        setLaunch([...launch, launchObj]);
        setData([launchObj]);
        setTotalPrice(totalPrice + valueHandFormat);
        // setAuxName([...auxName, name]);
    }

    function getPartsTotalPrice() {
        let total = 0;
        partsList.forEach((item) => {
            total += item.value;
        });

        setTotalPrice(total);
    }

    const options = {
        // default is `save`
        method: 'open',
        resolution: Resolution.HIGH,
        page: {
            // margin is in MM, default is Margin.NONE = 0
            margin: Margin.MEDIUM,
            // default is 'A4'
            format: 'A4',
            // default is 'portrait'
            orientation: 'portrait',
        }
    }

    const getTargetElement = () => document.getElementById('content-id');

    return (
        <section className={styles.create}>
            <h2>Criar lançamento</h2>
            <form action="" method="post" onSubmit={(e) => addLaunch(e)} >
                <div className={styles.inputForm}>
                    <label htmlFor="name">Nome do cliente</label>
                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder='Nome do cliente' />
                </div>
                <div className={styles.flex}>
                    <div className={styles.inputForm}>
                        <label htmlFor="value_hand">Valor da mão de obra</label>
                        <input type="text" onChange={(e) => setValueHand(e.target.value)} id="value_hand" placeholder='Valor da mão de obra' />
                    </div>
                    <div className={styles.inputForm}>
                        <label htmlFor="date">Data do lançamentoe</label>
                        <input type="date" onChange={(e) => setDate(e.target.value)} id="date" placeholder='Nome do cliente' />
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div className='flex gap-4'>
                        <button className={styles.createBtn}>Salvar</button>

                    </div>
                    <div>
                        <div className={styles.dataPdf} id="content-id">
                            <ul className='flex flex-col gap-4 bg-gray-200 p-8 rounded-md'>
                                {data.map((item) =>
                                    <li key={item.id}>
                                        <h2 className={styles.subTitle}>Cliente: <strong>{item.name}</strong></h2>
                                        <span>Data do lançamento: <strong>{item.date}</strong></span>
                                        <p>Valor da mão de obra: <strong>{format(item.valueHandConstructions)}</strong></p>
                                    </li>
                                )}
                            </ul>
                            <div className={`${styles.border} border-zinc-300 p-4`}>
                                <ul className='flex flex-col gap-2 text-zinc-800'>
                                    {partsList.map((part) => (
                                        <li key={part.id} className='flex flex-col gap-2'>
                                            <div className='flex gap-2'>
                                                <p>{part.title}</p>
                                                <span className='text-red-800 font-bold'>{format(part.value)}</span>
                                            </div>
                                        </li>
                                    ))}
                                    <h5>Valor total: <strong className='text-red-700'>{format(totalPrice)}</strong></h5>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className={`${styles.partForm}`}>
                <div className={`${styles.flex}`}>
                    <div className={styles.inputForm}>
                        <label htmlFor="part">Peça</label>
                        <input type="text" onChange={(e) => setPart(e.target.value)} id="part" placeholder='Nome da peçaa' />
                    </div>
                    <div className={styles.inputForm}>
                        <label htmlFor="value_part">Valor da peça</label>
                        <input type="text" onChange={(e) => setValuePart(e.target.value)} id="value_part" placeholder='Valor da peçae' />
                    </div>
                </div>
                <div className={styles.inputForm}>
                    <button onClick={addParts} className={styles.btnAddPart}>Adicionar peça</button>
                </div>
                <ul className='text-zinc-700'>
                    {partsList.map((part) => (
                        <li key={part.id} className={styles.flex}>
                            <h3>{part.title}</h3>
                            <p className='text-red-800 text-bold'>{format(part.value)}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <section className={styles.parts}>
                <h5>Valor total: <strong className='text-red-700'>{format(totalPrice)}</strong></h5>
            </section >
            <div className={styles.buttons}>
                <button className='bg-zinc-700' onClick={() => generatePDF(getTargetElement, { filename: 'nota.pdf' })}>Gerar PDF</button>
            </div>
        </section >
    );
}

export default Create;
