import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(({data}) => {
      setRepositories(data);
    });
    
  }, []);

  async function handleAddRepository() {
    const {data} = await api.post('/repositories', {
      url: 'https://github.com/repository',
      title: `Repository ${Date.now()}`,
      tech: ['tech1', 'tech2', 'tech3'],
    });
    console.log(data);
    
    if(data.id) {
      setRepositories([...repositories, data]);
    }
    
    
    
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204) {
      // 1st solution - Using rest operator
      /*
      let index = repositories.findIndex(repository => repository.id === id);
      let repositoriesRest;
      [repositories[index], ...repositoriesRest] = repositories;
      setRepositories(repositoriesRest);
      */

      // 2nd solution - not using rest operator
      
      const repositoriesRest = repositories.filter(repository => repository.id !== id);

      console.log(repositoriesRest);

      setRepositories(repositoriesRest);
      
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
