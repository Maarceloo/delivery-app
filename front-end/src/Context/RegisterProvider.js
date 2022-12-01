import React, { useMemo, useState } from 'react';
import proptypes from 'prop-types';
import RegisterContext from './RegisterContext';

function RegisterProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const contextUser = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
  }), [email, password, name]);

  return (
    <RegisterContext.Provider value={ contextUser }>
      {children}
    </RegisterContext.Provider>
  );
}

RegisterProvider.propTypes = {
  children: proptypes.node.isRequired,
};

export default RegisterProvider;
