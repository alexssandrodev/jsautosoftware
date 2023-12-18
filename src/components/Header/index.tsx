import styles from './Header.module.css';
import banner from '../../../src/assets/banner2.jpg';

function Header() {
    return ( 
        <header className={styles.header}>
            <img src={banner} alt="Banner" />
        </header>
     );
}

export default Header;
