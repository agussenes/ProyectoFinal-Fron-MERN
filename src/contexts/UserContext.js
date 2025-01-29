import React, { createContext, useState, useEffect, useContext } from 'react';


export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true); 

 
  const getUserCartKey = (userId) => `carrito_${userId}`;


  const [carrito, setCarrito] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      const carritoKey = getUserCartKey(parsedUser.id); 
      const storedCarrito = localStorage.getItem(carritoKey);
      return storedCarrito ? JSON.parse(storedCarrito) : []; 
    }

    return []; 
  });


  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);

       
        if (!parsedUser.rol) {
          console.error('El usuario no tiene un rol definido.');
        }

        setUser(parsedUser);
        setToken(storedToken);
      }
    } catch (error) {
      console.error('Erro ao inicializar dados do localStorage:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    setLoading(false);
  }, []);

  
  const login = (userData, token) => {
    console.log('Dados de usuario em login:', userData); 
    console.log('Token recebido:', token); 

    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    
    const carritoKey = getUserCartKey(userData.id);
    const storedCarrito = localStorage.getItem(carritoKey);
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito)); 
    }
  };

  
  const logout = () => {
    console.log('Cerrando sesión...'); 
    setUser(null);
    setToken(null);
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const newCarrito = [
        ...prevCarrito,
        { ...producto, uniqueId: Date.now() + Math.random() }, 
      ];

     
      if (user && user.id) {
        const carritoKey = getUserCartKey(user.id);
        localStorage.setItem(carritoKey, JSON.stringify(newCarrito)); 
      }

      return newCarrito;
    });
  };

 
  const removerDelCarrito = (uniqueId) => {
    setCarrito((prevCarrito) => {
      const newCarrito = prevCarrito.filter((item) => item.uniqueId !== uniqueId);

      if (user && user.id) {
        const carritoKey = getUserCartKey(user.id);
        localStorage.setItem(carritoKey, JSON.stringify(newCarrito)); 
      }

      return newCarrito;
    });
  };

 
  const limpiarCarrito = () => {
    setCarrito([]); 

    if (user && user.id) {
      const carritoKey = getUserCartKey(user.id);
      localStorage.setItem(carritoKey, JSON.stringify([])); 
    }
  };

 
  if (loading) return <div>Cargando...</div>;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout, 
        carrito,
        agregarAlCarrito,
        removerDelCarrito,
        limpiarCarrito,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => useContext(UserContext);
