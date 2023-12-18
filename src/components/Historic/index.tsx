'use client';
import Link from 'next/link';
import styles from './Historic.module.css';
import useLaunch from '@/app/hooks/useLaunch';
import { IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';

function Historic() {
    const { launch, setLaunch } = useLaunch();

    // function filteredLaunchs() {
    //     for (const name of auxName) {
    //         nameAux.push(name);
    //     }
    //     for (let i = 0; i < launch.length; i++) {
    //         if (nameAux[i] === launch[i].name) {
    //             setLaunch([launch[i]]);
    //         }
    //     }
    //     console.log(nameAux);
    // }

    // useEffect(() => {
    //     filteredLaunchs();
    // }, [])

    function deleteLaunch(id: string) {
        const newLaunchs = launch.filter((item) => item.id !== id);
        setLaunch(newLaunchs);
        localStorage.setItem('launchs', JSON.stringify(newLaunchs));
    }

    function getTotal(name: string) {
        const newLaunch = launch.filter((item) => item.name === name);
        let total = 0;
        for (const price of newLaunch) {
            total += parseFloat(price.valueParts);
        }

        return total;
    }

    return (
        <section className={styles.historic}>
            {launch.length === 0 && (
                <p>Não exite nenhum lançamento.</p>
            )}
            <ul>
                {launch.map((item, index) => (
                    <li key={item.id} className={`${index % 2 === 0 && 'bg-gray-200'}`}>
                        <h3>{item.name}</h3>
                        <span>{item.date}</span>
                        <h5>R$ {getTotal(item.name)}</h5>
                        <button onClick={() => deleteLaunch(item.id)}><IconTrash /></button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Historic;
