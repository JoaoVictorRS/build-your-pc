
'use client'

import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"
import { Formik } from "formik"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, Col, Container, Form, Image, Row } from "react-bootstrap"
import { Rings } from "react-loader-spinner"
import './styleDash.css'
import { FaRegEdit } from "react-icons/fa"


export default function Page() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setTimeout(() => { setLoading(false); }, 2000);
  }, [])

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
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center mt-4 title-enderecos'>
          <h2>Minha Conta</h2>
        </div>

        <Row className="mt-4">
          <Col md={1}>
            <span></span>
          </Col>
          <Col md={4} className="text-center">
            <Image src={loggedInUser.imagem_perfil} className="imagem_perfil_dashboard rounded-circle" alt="Foto do Usuário" />
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-center ms-3">
            <h3 className="mb-5">@{loggedInUser.nome}</h3>
            <p><b>Email:</b> {loggedInUser.email}</p>
            <p><b>CPF:</b> {loggedInUser.cpf}</p>
            <Link href={`/user/${loggedInUser.id}`} className="btn btn-primary mt-2 w-50">Editar Informações <FaRegEdit />
            </Link>
          </Col>
        </Row>

        <Row className="mt-5 px-5 pt-3 border-top">
          <Col md={12}>
            <div className='d-flex justify-content-center align-items-center mb-3 mt-2 title-enderecos'>
              <h4>Endereços Cadastrados</h4>
            </div>

            {loggedInUser.enderecos && loggedInUser.enderecos.length > 0 ? (
              loggedInUser.enderecos.map((endereco, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Text><strong>CEP:</strong> {endereco.cep}</Card.Text>
                    <Card.Text><strong>Rua:</strong> {endereco.logradouro} / Casa {endereco.casa}</Card.Text>
                    <Card.Text><strong>Cidade:</strong> {endereco.cidade} / {endereco.bairro}</Card.Text>
                    <Card.Text><strong>Estado:</strong> {endereco.estado}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-center">Nenhum endereço cadastrado.</p>
            )}
          </Col>
          <div className='d-flex justify-content-center align-items-center'>
            <Link href={`/endereco/${loggedInUser.id}`} className="btn btn-primary mt-2 w-50">Editar Endereços <FaRegEdit />
            </Link>
          </div>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
