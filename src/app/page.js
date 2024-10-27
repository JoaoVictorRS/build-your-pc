'use client'

import Link from "next/link"
import { FaPlusCircle } from "react-icons/fa";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default function Page() {

  const [computadores, setComputadores] = useState([])

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    setComputadores(produtos)
  }, [])

  console.log(computadores)

  return (
    <>
      <Header />

      <Container>
        <Link
          href="/produtos/form?tipo=computadores"
          className="btn btn-primary mb-3"
        >
          <FaPlusCircle /> Novo
        </Link>

        <Row>
          {computadores.map(item => (
            <Col md={4}>
              <Card key={item.id} style={{ width: '18rem' }}>
                <Link href={`/detalhes/${item.id}`}>
                  <Card.Img variant="top" src={item.imagem} alt="iamem" />
                  <Card.Body>
                    <Card.Title>{item.nome}</Card.Title>
                    <Card.Text>{item.preco}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

      </Container >

      <Footer />
    </>
  )
}
