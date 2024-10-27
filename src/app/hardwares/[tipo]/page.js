'use client'

import Link from "next/link"
import { FaPlusCircle } from "react-icons/fa";
import { Button, Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function Page({ params }) {

  const [computadores, setComputadores] = useState([])

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.filter(item => item.tipo == params.tipo)
    setComputadores(dados)
  }, [])

  console.log(computadores)

  return (
    <>
      <Header />

      <Container>
        <Link
          href={`/produtos/form?tipo=hardwares/${params.tipo}`}
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