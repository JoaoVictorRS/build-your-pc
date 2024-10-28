'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Page() {

  const [perifericos, setPerifericos] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)


  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.filter(item => item.tipo == 'perifericos')
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setPerifericos(dados)
  }, [])

  return (
    <>
      <Header />

      <Container>
        {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
          <>
            <Link
              href="/produtos/form?tipo=perifericos"
              className="btn btn-success my-3"
            >
              <FaPlusCircle /> Novo Produto
            </Link>
          </>
        ) :
          <></>
        }

        <Row>
          {perifericos.map(item => (
            <Col md={4}>
              {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
                <>
                  <Card key={item.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.imagem} alt="iamem" />
                    <Card.Body>
                      <Card.Title>{item.nome}</Card.Title>
                      <Card.Text>R$ {item.preco}</Card.Text>
                      <Link
                        href={`/produtos/form/${item.id}?tipo=${item.tipo}`}
                        className="btn btn-success my-3 w-50"
                      >
                        <FaPlusCircle /> Editar
                      </Link>
                      <Button
                        className="btn btn-danger w-50"
                        onClick={() => excluir(item.id)}
                      >
                        <FaTimes /> Deletar
                      </Button>
                      <Link
                        href={`/detalhes/${item.id}`}
                        className="btn btn-primary w-100"
                      >
                        <FaEye /> Ver
                      </Link>
                    </Card.Body>

                  </Card>

                </>
              ) :
                <>
                  <Card key={item.id} style={{ width: '18rem' }}>
                    <Link href={`/detalhes/${item.id}`}>
                      <Card.Img variant="top" src={item.imagem} alt="iamem" />
                      <Card.Body>
                        <Card.Title>{item.nome}</Card.Title>
                        <Card.Text>R$ {item.preco}</Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </>
              }
            </Col>
          ))}
        </Row>
      </Container >

      <Footer />
    </>
  )
}
