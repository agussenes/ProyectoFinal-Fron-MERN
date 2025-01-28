import React, { createContext, useState, useEffect, useContext } from 'react';

// Criando o contexto
export const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda { username, rol }
  const [token, setToken] = useState(null); // Guarda o token
  const [loading, setLoading] = useState(true); // Controle de carga inicial

  // Função para gerar uma chave única para o carrinho com base no usuário
  const getUserCartKey = (userId) => `carrito_${userId}`;

  // Estado do carrinho
  const [carrito, setCarrito] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    // Se o usuário estiver logado, tenta carregar o carrinho associado a esse usuário
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      const carritoKey = getUserCartKey(parsedUser.id); // Garante que o carrinho é vinculado ao usuário
      const storedCarrito = localStorage.getItem(carritoKey);
      return storedCarrito ? JSON.parse(storedCarrito) : []; // Retorna o carrinho do usuário, se existir
    }

    return []; // Caso contrário, retorna um carrinho vazio
  });

  // Carregar dados de localStorage ao inicializar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);

        // Verifica que o usuário tenha o rol atribuído
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

  // Função para login
  const login = (userData, token) => {
    console.log('Dados de usuario em login:', userData); // Log de depuração
    console.log('Token recebido:', token); // Log de depuração

    setUser(userData);
    setToken(token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    
    // Sempre que o usuário logar, tentamos carregar o carrinho associado a ele
    const carritoKey = getUserCartKey(userData.id);
    const storedCarrito = localStorage.getItem(carritoKey);
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito)); // Carrega o carrinho do usuário logado
    }
  };

  // Função para logout
  const logout = () => {
    console.log('Cerrando sesión...'); // Log de depuração
    setUser(null);
    setToken(null);
    // Não vamos limpar o carrinho, mas apenas os dados do usuário
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Função para adicionar produto ao carrinho
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const newCarrito = [
        ...prevCarrito,
        { ...producto, uniqueId: Date.now() + Math.random() }, // Adiciona um identificador único
      ];

      // Verifica se o usuário está logado antes de salvar no localStorage
      if (user && user.id) {
        const carritoKey = getUserCartKey(user.id);
        localStorage.setItem(carritoKey, JSON.stringify(newCarrito)); // Salva o carrinho do usuário específico
      }

      return newCarrito;
    });
  };

  // Função para remover um produto do carrinho (baseado no identificador único)
  const removerDelCarrito = (uniqueId) => {
    setCarrito((prevCarrito) => {
      const newCarrito = prevCarrito.filter((item) => item.uniqueId !== uniqueId);

      if (user && user.id) {
        const carritoKey = getUserCartKey(user.id);
        localStorage.setItem(carritoKey, JSON.stringify(newCarrito)); // Atualiza o carrinho do usuário específico
      }

      return newCarrito;
    });
  };

  // Função para limpar todos os produtos do carrinho
  const limpiarCarrito = () => {
    setCarrito([]); // Limpa o carrinho

    if (user && user.id) {
      const carritoKey = getUserCartKey(user.id);
      localStorage.setItem(carritoKey, JSON.stringify([])); // Atualiza o carrinho do usuário específico
    }
  };

  // Enquanto carrega, mostrar algo ao usuário
  if (loading) return <div>Cargando...</div>;

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout, // Função de logout adicionada ao contexto
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

// Hook para acessar o contexto facilmente
export const useUserContext = () => useContext(UserContext);
