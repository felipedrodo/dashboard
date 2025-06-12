import './App.css'
import { useEffect, useState } from 'react'
import UserCard from './components/UserCard'

function App() {
 const [users, setUsers] = useState([])
 const [page, setPage] = useState(1)
 useEffect(() => {
   fetch('http://localhost:3001/peoples')
     .then((res) => res.json())
     .then((data) => setUsers(data))
     .catch((err) => console.error('Erro ao buscar usuários:', err))
 }, [])
 
 const maxPerPage = 10
 const lastIndex = page * maxPerPage //Último índice da página, para saber o número do último card dessa página
 const paginatedUsers = users.slice(lastIndex - maxPerPage, lastIndex) //slice seria criar uma lista nova dos usuários; definição de quando começa os cards e qual o último índice dele
 const maxPages = Math.ceil(users.length / maxPerPage) //math.ceil arredonda o número para um número inteiro, nesse caso para descobrir o número máximo de páginas
  
 return (
    <div className="App">
      <div className='Title'>
        <h1>Dashboard de Usuários</h1>
      </div>
        <p>Total de Usuários: {users.length}</p>
      <div className="user-container">
       {paginatedUsers.map((user) => (
        <UserCard key={user.id} user={user} />
       ))}
      </div>
  <div className="pagination">
    <button onClick={() => setPage(page - 1)} disabled={page === 1}>
         Anterior
    </button>
      <div className='paginas'>
        <span>Pagina {page}</span>
      </div>
    <button onClick={() => setPage(page + 1)} disabled={page === maxPages}>
         Próxima
    </button>
  </div>
</div>
 )
}
export default App