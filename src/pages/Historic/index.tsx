'use client';
import { IconTrash } from '@tabler/icons-react';
import useLaunch from '../../hooks/useLaunch';
import styles from './Historic.module.css';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { useEffect, useState } from 'react';

function Historic() {
    const { launch, setLaunch, partsList } = useLaunch();
    const [price, setPrice] = useState<number>(0);

    function deleteLaunch(id: string) {
        const newLaunchs = launch.filter((item) => item.id !== id);
        setLaunch(newLaunchs);
        localStorage.setItem('launchs', JSON.stringify(newLaunchs));
    }

    function getTotalPrice(name: string) {
        let total = 0;
        const newLaunch = partsList.filter((item) => item.name === name);
            for (const price of newLaunch) {
                setPrice(total += price.value);
            }
    }

    useEffect(() => {
        for(const idLaunch of launch) {
            getTotalPrice(idLaunch.name);
        }
        console.log(price)
    }, [partsList]);


    return (
        <section className={styles.historic}>
            <Header />
            <div className={styles.flex}>
                <Sidebar />
                {launch.length === 0 && (
                    <p>Não exite nenhum lançamento.</p>
                )}
                <ul>
                    {launch.map((item: any, index: number) => (
                        <li key={item.id} className={`${index % 2 === 0 && styles.bgLi}`}>
                            <h3>{item.name}</h3>
                            <span>{item.date}</span>
                            <h5>R$ {price}</h5>
                            {/* <Link to={`/details/${item.id}`}><p>Detalhes</p></Link> */}
                            <button onClick={() => deleteLaunch(item.id)}><IconTrash /></button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Historic;
