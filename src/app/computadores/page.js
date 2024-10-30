'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import './computadoresStyle.css'
import { FaComputer } from "react-icons/fa6";

export default function Page() {

  const [computadores, setComputadores] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.filter(item => item.tipo == 'computadores')
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setComputadores(dados)
  }, [])

  return (
    <>
      <Header />
      <Image src="https://themes.kabum.com.br/conteudo/layout/5456/1729797711.jpg" className="w-100" alt="carrousel" />
      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><FaComputer /> COMPUTADORES <FaComputer /></h3>
      </div>

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
          {computadores.map(item => (
            <Col md={3} className="my-3">
              {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
                <>
                  <Card key={item.id} className="card_produto" style={{ width: '18rem' }}>
                    <Card.Img variant="top" className="p-3" src={item.imagem} alt="produto_imagem" />
                    <Card.Body>
                      <Card.Title className="nome-produto">{item.nome}</Card.Title>
                      <Card.Text className="preco-produto border-top"><b>R$ {item.preco}</b></Card.Text>
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
                  <Card key={item.id} className="card_produto" style={{ width: '18rem' }}>
                    <Link className="link_card" href={`/detalhes/${item.id}`}>
                      <Card.Img variant="top" className="p-3" src={item.imagem} alt="produto_imagem" />
                      <Card.Body>
                        <Card.Title className="nome-produto">{item.nome}</Card.Title>
                        <Card.Text className="preco-produto border-top"><b>R$ {item.preco}</b></Card.Text>
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
