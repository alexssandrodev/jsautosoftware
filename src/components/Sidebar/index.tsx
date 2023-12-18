import styles from './Sidebar.module.css';
import { IconHome } from '@tabler/icons-react';

function Sidebar() {
    return ( 
        <section className={styles.sidebar}>
            <h3>Silvio</h3>
            <ul>
                <li><IconHome /> <a href={'/'}>Página inicial</a></li>
            </ul>
        </section>
     );
}

export default Sidebar;
