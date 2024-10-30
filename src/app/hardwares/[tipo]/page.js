'use client'

import Link from "next/link"
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import './hardwaresStyle.css'
import { IoHardwareChipOutline } from "react-icons/io5";

export default function Page({ params }) {

  const [hardwares, setHardwares] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)


  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.filter(item => item.tipo == params.tipo)
    setHardwares(dados)
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, [])

  function formatarTexto(texto) {
    return texto.replace(/_/g, ' ').toUpperCase();
  }

  return (
    <>
      <Header />

      <Image src="https://themes.kabum.com.br/conteudo/layout/5451/1729712949.png" className="w-100" alt="carousel3" />
      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><IoHardwareChipOutline /> {formatarTexto(params.tipo)} <IoHardwareChipOutline /></h3>
      </div>

      <Container>
        {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
          <>
            <Link
              href={`/produtos/form?tipo=hardwares/${params.tipo}`}
              className="btn btn-success my-3"
            >
              <FaPlusCircle /> Novo Produto
            </Link>
          </>
        ) :
          <></>
        }

        <Row>
          {hardwares.map(item => (
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