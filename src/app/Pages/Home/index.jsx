// @flow
import React from 'react';
import { Link } from 'react-router-dom';

import './home.scss';


type Props = {
  appTitle: string,
};

function Home(props: Props) {
  const { appTitle } = props;

  return (
    <div>
      <h1>{appTitle}</h1>
      <p>Welcome home!</p>
      <Link to="/about">About</Link>
    </div>
  );
}

export default Home;
