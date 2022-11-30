import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const contextUser = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
  }), [email, password]);

  return (
    <MyContext.Provider value={ contextUser }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: proptypes.node.isRequired,
};

export default Provider;
