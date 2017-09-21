import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar } from '@coredev/cnn-react-material/build/app_bar';

import styles from './styles.css';


const Header = () => (
    <AppBar flat leftIcon={<Link to="/" className={styles.brand} />} theme={styles} title="CNN Tag Manager" />
);

export default Header;
