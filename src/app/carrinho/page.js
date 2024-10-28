'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";

export default function Carrinho() {

  const [carrinho, setCarrinho] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const dadosUserAtual = users.find(item => item.id === loggedInUser.id);
      setCarrinho(dadosUserAtual?.carrinho || []);
    }
  }, [loggedInUser]);

  const removerItem = (index) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const dadosUserAtual = users.find(item => item.id == loggedInUser.id)

    dadosUserAtual.carrinho.splice(index, 1);
    setCarrinho([...dadosUserAtual.carrinho]);

    localStorage.setItem('users', JSON.stringify(users));
  };

  const total = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0).toFixed(2);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <h2 className="text-center mb-4">Carrinho de Compras</h2>

        {carrinho.length > 0 ? (
          <ListGroup>
            {carrinho.map((produto, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <Row className="w-100">
                  <Col md={2}>
                    <Card.Img src={produto.imagem} alt={produto.nome} thumbnail style={{ maxWidth: '100px' }} />
                  </Col>
                  <Col md={6}>
                    <h5>{produto.nome}</h5>
                    <p>{produto.tipo}</p>
                  </Col>
                  <Col md={2}>
                    <h5 className="text-danger">R$ {produto.preco}</h5>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    <Button variant="danger" onClick={() => removerItem(index)}>Remover</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between">
              <h5>Total:</h5>
              <h5 className="text-danger">R$ {total}</h5>
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <p className="text-center">Seu carrinho está vazio.</p>
        )}
      </Container>
      <Footer />
    </>
  );
}
