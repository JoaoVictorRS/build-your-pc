'use client'

import Link from "next/link";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { FaEye, FaPlusCircle, FaTimes } from "react-icons/fa";
import { Button, Card, Col, Container, Image, Row, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import './perifericosStyle.css';
import { MdOutlineMouse } from "react-icons/md";
import { Rings } from "react-loader-spinner";

export default function Page() {

  const [perifericos, setPerifericos] = useState([]);
  const [filteredPerifericos, setFilteredPerifericos] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    setTimeout(() => { // Simulando um delay para o carregamento
      const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
      const dados = produtos.filter(item => item.tipo === 'perifericos');
      setPerifericos(dados);
      setFilteredPerifericos(dados);
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(user);
      setLoading(false); // Conclui o carregamento
    }, 1000); // Tempo de espera para exibir o loading
  }, []);

  function excluir(id) {
    if (confirm('Deseja realmente excluir o registro?')) {
      const dados = produtos.filter(item => item.id !== id);
      localStorage.setItem('produtos', JSON.stringify(dados));
      setPerifericos(dados);
      setFilteredPerifericos(dados);
    }
  }

  // Função de filtro ao digitar no campo de pesquisa
  function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Divide o termo de busca em palavras
    const searchWords = term.split(" ").filter(Boolean);

    // Filtra os itens que contêm todas as palavras no nome do produto
    const filtered = perifericos.filter(item =>
      searchWords.every(word => item.nome.toLowerCase().includes(word))
    );

    setFilteredPerifericos(filtered);
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Rings
          height="100"
          width="100"
          color="#E43B14"
          ariaLabel="loading"
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Image src="https://themes.kabum.com.br/conteudo/layout/5456/1729797711.jpg" className="w-100" alt="carousel" />

      <div className="d-flex justify-content-center align-items-center titulo_separador text-white py-2">
        <h3><MdOutlineMouse /> PERIFÉRICOS <MdOutlineMouse /></h3>
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
          {filteredPerifericos.map(item => (
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
                      <FaPlusCircle /> Editar
                    </Link>
                    <Button className="btn btn-danger w-50" onClick={() => excluir(item.id)}>
                      <FaTimes /> Deletar
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Footer />
    </>
  );
}
