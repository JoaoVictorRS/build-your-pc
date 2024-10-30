'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import './perifericosStyle.css'
import { MdOutlineMouse } from "react-icons/md";

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

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = produtos.filter(item => item.id != id)
      localStorage.setItem('produtos', JSON.stringify(dados))
      setProdutos(dados)
    }
  }

  return (
    <>
      <Header />
      <Image src="https://themes.kabum.com.br/conteudo/layout/5456/1729797711.jpg" className="w-100" alt="carrousel" />

      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><MdOutlineMouse /> PERIFÉRICOS <MdOutlineMouse /></h3>
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
          {perifericos.map(item => (
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
