import { FormEvent, useEffect, useState } from 'react'
import generatePDF from 'react-to-pdf';
import useLaunch from './hooks/useLaunch';
import styles from './App.module.css';
import Part from './models/Part';
import { format } from './utils/FormatPrice';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { IconX } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';

function App() {
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

  function removePart(id: string) {
    const partIndex = partsList.findIndex((part) => part.id === id);
    partsList.splice(partIndex, 1);
    setPartsList([...partsList]);
  }

  const getTargetElement = () => document.getElementById('content-id');

  return (
    <main>
      <Header />
      <div className={styles.content}>
        <Sidebar />
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
                  <ul>
                    {data.map((item) =>
                      <li key={item.id}>
                        <h2 className={styles.subTitle}>Cliente: <strong>{item.name}</strong></h2>
                        <span>Data do lançamento: <strong>{item.date}</strong></span>
                        <p>Valor da mão de obra: <strong>{format(item.valueHandConstructions)}</strong></p>
                      </li>
                    )}
                  </ul>
                  <div className={`${styles.border}`}>
                    <ul>
                      {partsList.map((part) => (
                        <li key={part.id}>
                          <div className={styles.flex}>
                            <p>{part.title}</p>
                            <span>{format(part.value)}</span>
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
          <div className={styles.buttons}>
            <button className={styles.btnPdf} onClick={() => generatePDF(getTargetElement, { filename: 'nota.pdf' })}>Gerar PDF</button>
          </div>
        </section>
      </div>
    </main >
  )
}

export default App
