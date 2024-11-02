'use client'

import Link from "next/link"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import './computadoresStyle.css'
import { FaComputer } from "react-icons/fa6";

export default function Page() {
  const [computadores, setComputadores] = useState([]);
  const [filteredComputadores, setFilteredComputadores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const dados = produtos.filter(item => item.tipo === 'computadores');
    setComputadores(dados);
    setFilteredComputadores(dados);
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(user);
  }, []);

  function handleSearch(event) {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = computadores.filter(item => item.nome.toLowerCase().includes(term));
    setFilteredComputadores(filtered);
  }

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = computadores.filter(item => item.id !== id);
      localStorage.setItem('produtos', JSON.stringify(dados));
      setComputadores(dados);
      setFilteredComputadores(dados);
    }
  }

  return (
    <>
      <Header />
      <Image src="https://themes.kabum.com.br/conteudo/layout/5456/1729797711.jpg" className="w-100" alt="carrousel" />
      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><FaComputer /> COMPUTADORES <FaComputer /></h3>
      </div>

      <Container>

        {loggedInUser && loggedInUser.email === "admin@admin.com" && (
          <Link href="/produtos/form?tipo=perifericos" className="btn btn-success my-3">
            <FaPlusCircle /> Novo Produto
          </Link>
        )}

        <div className="d-flex justify-content-center align-items-center">
          <Form.Group className="mb-3 w-50">
            <Form.Control
              type="text"
              placeholder="Pesquisar produtos..."
              value={searchTerm}
              onChange={handleSearch}
              className="form-control mt-4 "
            />
          </Form.Group>
        </div>

        <Row>
          {filteredComputadores.map(item => (
            <Col md={3} className="my-3" key={item.id}>
              {loggedInUser && loggedInUser.email === "admin@admin.com" ? (
                <Card className="card_produto" style={{ width: '18rem' }}>
                  <Card.Img variant="top" className="p-3" src={item.imagem} alt="produto_imagem" />
                  <Card.Body>
                    <Card.Title className="nome-produto">{item.nome}</Card.Title>
                    <Card.Text className="preco-produto border-top"><b>R$ {item.preco}</b></Card.Text>
                    <div className="d-flex gap-2">
                      <Link href={`/produtos/form/${item.id}?tipo=${item.tipo}`} className="btn btn-success w-50">
                        <FaPlusCircle /> Editar
                      </Link>
                      <Button className="btn btn-danger w-50" onClick={() => excluir(item.id)}>
                        <FaTimes /> Deletar
                      </Button>
                    </div>
                    <Link href={`/detalhes/${item.id}`} className="btn btn-primary w-100 mt-2">
                      <FaEye /> Ver
                    </Link>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="card_produto" style={{ width: '18rem' }}>
                  <Link className="link_card" href={`/detalhes/${item.id}`}>
                    <Card.Img variant="top" className="p-3" src={item.imagem} alt="produto_imagem" />
                    <Card.Body>
                      <Card.Title className="nome-produto">{item.nome}</Card.Title>
                      <Card.Text className="preco-produto border-top"><b>R$ {item.preco}</b></Card.Text>
                    </Card.Body>
                  </Link>
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
}
