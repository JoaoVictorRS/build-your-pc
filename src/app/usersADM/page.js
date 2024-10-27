'use client'

import { Container, Table } from "react-bootstrap"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import Link from "next/link"
import './style.css'
import { Rings } from "react-loader-spinner"

export default function Page() {

  const [users, setUsers] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setUsers(JSON.parse(localStorage.getItem('users')) || [])

    setTimeout(() => { setLoading(false); }, 2000);
  }, [])

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = users.filter(item => item.id != id)
      localStorage.setItem('users', JSON.stringify(dados))
      setUsers(dados)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Rings
          height="100"
          width="100"
          color="#E43B14"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <>
      {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
        <>
          <Header />
          <Container>

            <div className='d-flex justify-content-center align-items-center mt-5 title-custom'>
              <h1>Gerenciamento de Usuários</h1>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
              <Table striped bordered hover className="my-5 w-75">
                <thead>
                  <tr>
                    <th>Ações</th>
                    <th>Nome</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Link href={`/userDashboard/${item.id}`}>
                          <FaRegEdit title="Editar" className="text-primary" />
                        </Link>
                        <MdDelete
                          title="Excluir"
                          className="text-danger"
                          onClick={() => excluir(item.id)}
                        />
                      </td>
                      <td>{item.nome}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

          </Container>
          <Footer />
        </>
      ) : (
        <>
          <h1>Acesso Negado</h1>
        </>
      )}

    </>
  )
}
