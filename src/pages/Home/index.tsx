import { FormEvent, useEffect, useState } from 'react'
import useLaunch from '../../hooks/useLaunch';
import styles from '../../App.module.css';
import { format } from '../../utils/FormatPrice';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { IconInfoCircle, IconTrash, IconX } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import CreatePdf from '../../components/CreatePdf';


function Home() {
    const { launch, setLaunch, partsList, setPartsList } = useLaunch();
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [totalHistoricPrice, setTotalHistoricPrice] = useState<string[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [isSend, setIsSend] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [kilometer, setKilometer] = useState<string>('');
    const [plate, setPlate] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [tel, setTel] = useState<string>('');
    const [parts, setPart] = useState<string>('');
    const [valueParts, setValuePart] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('launchs', JSON.stringify(launch));
        localStorage.setItem('parts', JSON.stringify(partsList));
    }, [launch, partsList]);

    function addParts() {
        if (parts === '' && valueParts === '') {
            return;
        }
        const part = {
            id: uuidv4(),
            idLaunch: partsList.length + 1,
            title: parts,
            name: name,
            value: parseFloat(valueParts)
        }
        setPartsList([...partsList, part]);
        setTotalHistoricPrice([...totalHistoricPrice, valueParts])
    }

    useEffect(() => {
        getPartsTotalPrice();
    }, [partsList]);


    function addLaunch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (name === '' && date === '' && parts === '' && valueParts === '') {
            return;
        }
        
        const launchObj = {
            id: uuidv4(),
            name: name,
            date: date,
            tel: tel,
            cpf: cpf,
            model: model,
            kilometer: kilometer,
            plate: plate,
            partsList: [...partsList]
        }
        setLaunch([...launch, launchObj]);
        setData([launchObj]);
        setTotalPrice(totalPrice);
        setIsSend(true);
    }

    function getPartsTotalPrice() {
        let total = 0;
        partsList.forEach((item) => {
            total += item.value;
        });

        setTotalPrice(total);
    }

    function removePart(id: string) {
        const partIndex = partsList.findIndex((part) => part.id === id);
        partsList.splice(partIndex, 1);
        setPartsList([...partsList]);
    }

    function removeLaunch(id: string) {
        const newLaunchs = launch.filter((item) => item.id !== id);
        setLaunch(newLaunchs);
        localStorage.setItem('launchs', JSON.stringify(newLaunchs));
    }

    return (
        <main>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <section className={styles.create}>
                    <h2>Criar lançamento</h2>
                    {isSend && (
                        <div className={styles.message}>
                            <p>Lançamento salvo com sucesso! clique em gerar PDF.</p>
                            <span onClick={() => setIsSend(false)}><IconX /></span>
                        </div>
                    )}
                    <form action="" method="post" onSubmit={(e) => addLaunch(e)} >
                        <div className={styles.flex}>
                            <div className={styles.inputForm}>
                                <label htmlFor="name">Nome do cliente</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Nome do cliente' />
                            </div>
                            <div className={styles.inputForm}>
                                <label htmlFor="name">CPF</label>
                                <input type="text" id="name" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='CPF' />
                            </div>
                        </div>
                        <div className={styles.inputForm}>
                            <label htmlFor="tel">Telefone</label>
                            <input type="text" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} placeholder='Telefone' />
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.inputForm}>
                                <label htmlFor="date">Data do lançamentoe</label>
                                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" placeholder='Data de lançamento' />
                            </div>
                            <div className={styles.inputForm}>
                                <label htmlFor="model">Modelo do veiculo</label>
                                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} id="model" placeholder='Modelo do veiculo' />
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.inputForm}>
                                <label htmlFor="kilometer">Kilometragem do veiculo</label>
                                <input type="text" value={kilometer} onChange={(e) => setKilometer(e.target.value)} id="kilometer" placeholder='Kilometragem do veiculo' />
                            </div>
                            <div className={styles.inputForm}>
                                <label htmlFor="plate">Placa do veiculo</label>
                                <input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} id="plate" placeholder='Placa do veiculo' />
                            </div>
                        </div>

                        <div className={styles.buttons}>
                            <div className='flex gap-4'>
                                <button className={styles.createBtn}>Salvar</button>
                            </div>

                        </div>
                    </form>
                    <CreatePdf data={data} partsList={partsList} totalPrice={totalPrice} />
                    <div className={`${styles.partForm}`}>
                        <div className={`${styles.flex}`}>
                            <div className={styles.inputForm}>
                                <label htmlFor="part">Peça</label>
                                <input type="text" onChange={(e) => setPart(e.target.value)} id="part" placeholder='Nome da peça' />
                            </div>
                            <div className={styles.inputForm}>
                                <label htmlFor="value_part">Valor da peça</label>
                                <input type="text" onChange={(e) => setValuePart(e.target.value)} id="value_part" placeholder='Valor da peçae' />
                            </div>
                        </div>
                        <div className={styles.inputForm}>
                            <button onClick={addParts} className={styles.btnAddPart}>Adicionar peça</button>
                        </div>
                        <ul className={styles.partsList}>
                            {partsList.map((part) => (
                                <li key={part.id} className={styles.partsListLi}>
                                    <h3>{part.title}</h3>
                                    <p>{format(part.value)}</p>
                                    <span onClick={() => removePart(part.id)}><IconX /></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <section className={styles.parts}>
                        <h5>Valor total: <strong>{format(totalPrice)}</strong></h5>
                    </section >

                </section>
                <section className={styles.historic}>
                    <h3>Histórico de lançamentos</h3>
                    <ul>
                        {launch.map((item) => (
                            <li key={item.id}>
                                <p>{item.name}</p>
                                <span>{item.date}</span>
                                <div className={styles.icons}>
                                    <Link to={`/details/${item.id}`}><p><IconInfoCircle /></p></Link>
                                    <p className={styles.removeLaunch} onClick={() => removeLaunch(item.id)}>{<IconTrash />}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main >
    );
}

export default Home;
