'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, ListGroup, Form } from "react-bootstrap";
import './carrinhoStyle.css';
import { MdDeleteForever } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  const router = useRouter();

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
    const dadosUserAtual = users.find(item => item.id == loggedInUser.id);

    dadosUserAtual.carrinho.splice(index, 1);
    setCarrinho([...dadosUserAtual.carrinho]);

    localStorage.setItem('users', JSON.stringify(users));
  };

  const confirmarRemocao = (index) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Deseja realmente excluir este item do carrinho?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        removerItem(index);
      }
    });
  };

  const handleSelectEndereco = (index) => {
    setEnderecoSelecionado(index);
  };

  const finalizarCompra = () => {
    Swal.fire({
      icon: 'success',
      title: 'Compra finalizada',
      text: 'Obrigado por comprar conosco!',
      confirmButtonText: 'Fechar'
    }).then((result) => {
      if (result.isConfirmed) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const dadosUserAtual = users.find(item => item.id === loggedInUser.id);

        dadosUserAtual.compras_realizadas = dadosUserAtual.compras_realizadas || [];
        dadosUserAtual.compras_realizadas.push(...carrinho);

        dadosUserAtual.carrinho = [];
        setCarrinho([]);

        localStorage.setItem('users', JSON.stringify(users));

        router.push('/');
      }
    });
  };

  const total = carrinho.reduce((acc, item) => acc + parseFloat(item.preco), 0).toFixed(2);

  return (
    <>
      <Header />
      <Container>
        <h2 className="text-center my-4 titulo-carrinho">CARRINHO</h2>

        {carrinho.length > 0 ? (
          <>
            <ListGroup>
              {carrinho.map((produto, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <Row className="w-100">
                    <Col md={2}>
                      <Card.Img src={produto.imagem} alt={produto.nome} thumbnail style={{ maxWidth: '100px' }} />
                    </Col>
                    <Col md={6}>
                      <Link href={`/detalhes/${produto.id}`} className="text-decoration-none text-black"><h5>{produto.nome}</h5></Link>
                      <p>{produto.marca}</p>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                      <h5>R$ {produto.preco}</h5>
                    </Col>
                    <Col md={2} className="d-flex align-items-center justify-content-center">
                      <MdDeleteForever title="Remover" size={50} className="deletar-icon" onClick={() => confirmarRemocao(index)} />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <ListGroup.Item className="d-flex justify-content-around my-3">
                <h3>TOTAL:</h3>
                <h5 className="text-success preco-final">R$ {total}</h5>
              </ListGroup.Item>
            </ListGroup>

            <div className='d-flex justify-content-center align-items-center mb-3 mt-2 title-enderecos'>
              <h4 className="titulo-carrinho">ENDEREÇO DE ENTREGA</h4>
            </div>

            {loggedInUser.enderecos && loggedInUser.enderecos.length > 0 ? (
              loggedInUser.enderecos.map((endereco, index) => (
                <Card
                  key={index}
                  className={`mb-3 ${enderecoSelecionado === index ? 'border-primary' : ''}`}
                  onClick={() => handleSelectEndereco(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Form.Check
                      type="radio"
                      name="endereco"
                      label={
                        <>
                          <Card.Text><strong>CEP:</strong> {endereco.cep}</Card.Text>
                          <Card.Text><strong>Rua:</strong> {endereco.logradouro} / Casa {endereco.casa}</Card.Text>
                          <Card.Text><strong>Cidade:</strong> {endereco.cidade} / {endereco.bairro}</Card.Text>
                          <Card.Text><strong>Estado:</strong> {endereco.estado}</Card.Text>
                        </>
                      }
                      checked={enderecoSelecionado === index}
                      onChange={() => handleSelectEndereco(index)}
                    />
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-center">Nenhum endereço cadastrado.</p>
            )}

            <div className='d-flex justify-content-center align-items-center'>
              <Button variant="success w-50 p-3 mt-2"
                onClick={finalizarCompra}
                disabled={enderecoSelecionado === null}
              ><IoBagCheckSharp color="white" size={40} /></Button>
            </div>
          </>
        ) : (
          <p className="text-center">Seu carrinho está vazio.</p>
        )}
      </Container>
      <Footer />
    </>
  );
}
