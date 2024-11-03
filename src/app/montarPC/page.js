'use client';

import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Rings } from "react-loader-spinner";
import './montarPCStyle.css';
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page() {
  const [produtos, setProdutos] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const route = useRouter()

  const categorias = [
    { key: "processador", label: "Processador" },
    { key: "placa_mae", label: "Placa Mãe" },
    { key: "memoria_ram", label: "Memória RAM" },
    { key: "armazenamento_interno", label: "Armazenamento Interno" },
    { key: "fontes", label: "Fonte" },
    { key: "coolers", label: "Cooler" },
    { key: "placa_de_video", label: "Placa de Vídeo" }
  ];

  const [opcoes, setOpcoes] = useState({});
  const [selecoes, setSelecoes] = useState({}); // Estado para armazenar as seleções do usuário

  useEffect(() => {
    setTimeout(() => {
      const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      setLoggedInUser(user);
      setProdutos(produtosSalvos);

      const novasOpcoes = {};
      categorias.forEach(({ key }) => {
        novasOpcoes[key] = produtosSalvos.filter(item => item.tipo === key);
      });

      setOpcoes(novasOpcoes);
      setLoading(false);
    }, 2000);
  }, []);

  const handleSelectChange = (categoriaKey, nomeItem) => {
    const itemSelecionado = opcoes[categoriaKey]?.find(item => item.nome === nomeItem);
    setSelecoes(prevSelecoes => ({
      ...prevSelecoes,
      [categoriaKey]: itemSelecionado
    }));
  };

  const componentesObrigatorios = ["processador", "placa_mae", "memoria_ram", "armazenamento_interno", "fontes", "coolers"];
  const adicionarAoCarrinho = () => {

    const faltando = componentesObrigatorios.filter(
      (categoria) => !selecoes[categoria]
    );
  
    if (faltando.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Componentes Essenciais Faltando",
        text: `Por favor, selecione os seguintes componentes para continuar: ${faltando
          .map((key) => categorias.find((cat) => cat.key === key).label)
          .join(", ")}.`,
        confirmButtonText: "OK",
      });
      return;
    }

    if (!loggedInUser) {
      Swal.fire({
        icon: 'warning',
        title: 'É necessário estar logado para finalizar a compra',
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
    const dadosUserAtual = users.find(user => user.id === loggedInUser.id);

    if (dadosUserAtual) {
      dadosUserAtual.carrinho = dadosUserAtual.carrinho || [];
      dadosUserAtual.carrinho.push(...Object.values(selecoes).filter(item => item));
      localStorage.setItem('users', JSON.stringify(users));
      Swal.fire({
        title: 'Itens adicionados ao carrinho!',
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
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Rings height="100" width="100" color="#E43B14" ariaLabel="loading" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
          <h2>MONTAR PC PERSONALIZADO</h2>
        </div>

        {categorias.map(({ key, label }) => (
          <Row key={key} className="mb-3 align-items-center">
            <Col md={4}>
              <strong>{label}:</strong>
            </Col>
            <Col md={8}>
              <Form.Select
                size="lg"
                onChange={(e) => handleSelectChange(key, e.target.value)}
              >
                <option>Escolher {label.toLowerCase()}</option>
                {opcoes[key]?.map(item => (
                  <option key={item.nome} value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        ))}

        <hr className="mt-5" />

        <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
          <h2>PEÇAS SELECIONADAS</h2>
        </div>

        <Row>
          {Object.keys(selecoes).map(categoriaKey => {
            const item = selecoes[categoriaKey];
            if (!item) return null;
            return (
              <Col key={categoriaKey} md={3} className="mb-4">
                <Link className="link_card" href={`/detalhes/${item.id}`}>
                  <Card className="card_produto">
                    <Card.Img variant="top" src={item.imagem} alt={item.nome} />
                    <Card.Body>
                      <Card.Title className="nome-produto">{item.nome}</Card.Title>
                      <Card.Text>R$ {item.preco}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>

        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button onClick={adicionarAoCarrinho} variant="success" className="w-50" size="lg">
              Finalizar
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
