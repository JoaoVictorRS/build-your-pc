'use client'

import Footer from "@/app/components/Footer/Footer"
import Header from "@/app/components/Header/Header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap"
import './styleDetalhes.css'
import { useRouter } from "next/navigation"

export default function Page({ params }) {

  const route = useRouter()

  const [detalhes, setDetalhes] = useState(null)
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const produto = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produto.find(item => item.id == params.id)
    setDetalhes(dados)

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, [params.id])

  const adicionarAoCarrinho = () => {

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const dadosUserAtual = users.find(item => item.id == loggedInUser.id)
    dadosUserAtual.carrinho = dadosUserAtual.carrinho || [];
    dadosUserAtual.carrinho.push(detalhes);
    localStorage.setItem('users', JSON.stringify(users));
    route.push('/carrinho');
  };

  if (!detalhes) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Image src={detalhes.imagem} alt={detalhes.nome} fluid rounded style={{ maxWidth: '75%', border: '1px solid #ddd', padding: '5px' }} />
          </Col>
          <Col md={6}>
            <Card className="border-0">
              <Card.Body>
                <Card.Title as="h2" className="fw-bold mb-3">{detalhes.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{detalhes.tipo}</Card.Subtitle>
                <h3 className="text-danger mb-3">R$ {detalhes.preco}</h3>
                <Card.Text className="mb-4">{detalhes.descricao}</Card.Text>

                <Button variant="warning" size="lg" className="w-25" onClick={adicionarAoCarrinho}>Comprar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
