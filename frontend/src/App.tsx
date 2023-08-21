import React from 'react';
import AppHome from './components/AppHome';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <AppHome />   
    </div>
  );
};

export default App;
