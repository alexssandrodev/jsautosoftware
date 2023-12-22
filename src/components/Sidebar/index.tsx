import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { IconHome } from '@tabler/icons-react';

function Sidebar() {
    return (
        <section className={styles.sidebar}>
            <h3>Silvio</h3>
            <ul>
            <Link to='/'><li><IconHome />Página inicial</li></Link>
            {/* <Link to='/historic'><li><IconHistory />Histórico</li></Link> */}
            </ul>
        </section>
    );
}

export default Sidebar;
