// @flow
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ appTitle }: {appTitle: string}) => (
  <div>
    <h1>{appTitle}</h1>
    <p>Welcome home!</p>
    <Link to="/about">About</Link>
  </div>
);

export default Home;
