'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaPlusCircle } from "react-icons/fa";
import { Button, Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Page() {

  const [computadores, setComputadores] = useState([])

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.filter(item => item.tipo == 'periferico')
    setComputadores(dados)
  }, [])

  console.log(computadores)

  return (
    <>
      <Header />

      <Container>
        <Link
          href="/produtos/form?tipo=perifericos"
          className="btn btn-primary mb-3"
        >
          <FaPlusCircle /> Novo
        </Link>

        {computadores.map(item => (

          <Card key={item.id} style={{ width: '18rem' }}>
            <Link href={`/detalhes/${item.id}`}>
              <Card.Img variant="top" src={item.imagem} alt="iamem" />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                <Card.Text>{item.preco}</Card.Text>
              </Card.Body>
            </Link>
          </Card>
        ))}

      </Container >

      <Footer />
    </>
  )
}
