'use client'

import Link from "next/link"
import { FaEye, FaPlusCircle, FaStar, FaTimes } from "react-icons/fa";
import { Button, Card, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './mainStyle.css'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

export default function Page() {

  const [produtos, setProdutos] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
    setProdutos(produtos)
  }, [])

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = produtos.filter(item => item.id != id)
      localStorage.setItem('produtos', JSON.stringify(dados))
      setProdutos(dados)
    }
  }

  //Função para dividir em 4 itens
  function dividirProdutosEmGrupos(produtos, tamanhoGrupo = 4) {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += tamanhoGrupo) {
      grupos.push(produtos.slice(i, i + tamanhoGrupo));
    }
    return grupos;
  }

  const gruposDeProdutos = dividirProdutosEmGrupos(produtos);

  return (
    <>
      <Header />
      <Carousel>
        <Carousel.Item>
          {/*Kabum pfv n me processa é so para fins educativos ok?*/}
          <Link href='/computadores'>
            <Image src="https://themes.kabum.com.br/conteudo/layout/5456/1729797711.jpg" alt="carrousel" />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link href='/perifericos'>
            <Image src="https://themes.kabum.com.br/conteudo/layout/5448/1729712343.png" alt="carousel2" />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link href='/hardwares/processador'>
            <Image src="https://themes.kabum.com.br/conteudo/layout/5451/1729712949.png" alt="carousel3" />
          </Link>
        </Carousel.Item>
      </Carousel>

      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><MdKeyboardDoubleArrowDown /> CONFIRA NOSSOS PRODUTOS <MdKeyboardDoubleArrowDown /></h3>
      </div>

      <Container>

        {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
          <>
            <Link
              href="/produtos/form"
              className="btn btn-success mt-3 w-25"
            >
              <FaPlusCircle /> Novo Produto
            </Link>
          </>
        ) :
          <></>
        }

        <h4 className="titulo_cards mt-5 ms-3"><FaStar color="orange" size={20}/> Mais Vendidos</h4>
        <Carousel indicators={false} className="">
          {gruposDeProdutos.map((grupo, index) => (
            <Carousel.Item className="p-3" key={index}>
              <Row>
                {grupo.map(item => (
                  <Col md={3} className="my-2">
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
            </Carousel.Item>
          ))}
        </Carousel>
      </Container >

      <Footer />
    </>
  )
}
