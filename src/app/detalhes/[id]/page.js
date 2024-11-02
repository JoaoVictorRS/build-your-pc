'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import './styleDetalhes.css';
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { MdDescription } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

export default function Page({ params }) {
  const route = useRouter();

  const [detalhes, setDetalhes] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [produtosSemelhantes, setProdutosSemelhantes] = useState([]);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produtoAtual = produtos.find(item => item.id == params.id);
    setDetalhes(produtoAtual);

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);

    if (produtoAtual) {
      const semelhantes = produtos.filter(
        item => item.tipo === produtoAtual.tipo && item.id !== produtoAtual.id
      );
      setProdutosSemelhantes(semelhantes);
    }
  }, [params.id]);

  const adicionarAoCarrinho = () => {
    if (!loggedInUser) {
      Swal.fire({
        icon: 'warning',
        title: 'É necessário estar logado para comprar',
        text: 'Por favor, faça login para continuar.',
        confirmButtonText: 'Ir para Login',
        showCancelButton: true,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          route.push('/login');
        }
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const dadosUserAtual = users.find(item => item.id == loggedInUser.id);
    dadosUserAtual.carrinho = dadosUserAtual.carrinho || [];
    dadosUserAtual.carrinho.push(detalhes);
    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
      title: 'Produto adicionado ao carrinho!',
      text: 'Deseja ir para o carrinho ou continuar comprando?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Ir para o carrinho',
      cancelButtonText: 'Continuar comprando'
    }).then((result) => {
      if (result.isConfirmed) {
        route.push('/carrinho');
      }
    });
  };

  if (!detalhes) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <Container>
        <p className="mt-3 border-bottom">
          <b>Você está em: </b> Produtos &gt; Detalhes &gt; <Link href='/' className="text-warning text-decoration-none">{detalhes.tipo}</Link>
        </p>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            <Image src={detalhes.imagem} alt={detalhes.nome} fluid rounded style={{ maxWidth: '75%', border: '1px solid #ddd', padding: '5px' }} />
          </Col>
          <Col md={6}>
            <Card className="border-0">
              <Card.Body>
                <Card.Title as="h2" className="fw-bold mb-3">{detalhes.nome}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><b>Marca: </b>{detalhes.marca}</Card.Subtitle>
                <h3 className="text-danger mb-3 preco-card"><b>R$ {detalhes.preco}</b></h3>
                <Button variant="warning" size="lg" className="w-50 text-white" onClick={adicionarAoCarrinho}>
                  <FaShoppingCart size={20} className="text-light" /> <b>COMPRAR</b>
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="my-5 border-top border-bottom">
          <div className="m-4">
            <h3><MdDescription size={25} color="orange" /> DESCRIÇÃO DO PRODUTO</h3>
            <p>{detalhes.descricao}</p>
          </div>

          <hr />

          <div className="m-4">
            <h3><FaGear size={25} color="orange" /> INFORMAÇÕES TÉCNICAS</h3>
            <p>{detalhes.info_tecnica}</p>
          </div>
        </div>

        <div className="m-4">
          <h3><IoBagHandle size={25} color="orange" /> PRODUTOS SEMELHANTES</h3>
          <Row className="mt-4">
            {produtosSemelhantes.map(item => (
              <Col md={3} className="my-3" key={item.id}>
                <Card className="card_produto" style={{ width: '18rem' }}>
                  <Link className="link_card" href={`/detalhes/${item.id}`}>
                    <Card.Img variant="top" className="p-3" src={item.imagem} alt="produto_imagem" />
                    <Card.Body>
                      <Card.Title className="nome-produto">{item.nome}</Card.Title>
                      <Card.Text className="preco-produto border-top"><b>R$ {item.preco}</b></Card.Text>
                    </Card.Body>
                  </Link>

                  {loggedInUser && loggedInUser.email === "admin@admin.com" && (
                    <div className="d-flex gap-2 p-1">
                      <Link href={`/produtos/form/${item.id}?tipo=${item.tipo}`} className="btn btn-success w-50">
                        Editar
                      </Link>
                      <Button className="btn btn-danger w-50" onClick={() => excluir(item.id)}>
                        Deletar
                      </Button>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
}
