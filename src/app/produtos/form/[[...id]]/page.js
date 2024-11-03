'use client';

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { ImArrowRight } from "react-icons/im";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import './styleProdutos.css';
import ProdutosValidator from "@/app/validations/ProdutosValidator";

export default function Page({ params }) {
    const route = useRouter();
    const searchParams = useSearchParams();
    const tipo = searchParams.get('tipo');

    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const dados = produtos.find(item => item.id == params.id);
    const produto = dados || { nome: '', descricao: '', imagem: '', preco: '', tipo: '', marca: '', info_tecnica: '' };

    const formatarPreco = (valor) => {
        valor = valor.replace(/\D/g, '');
        valor = (Number(valor) / 100).toFixed(2);
        return `${valor.toString().replace('.', ',')}`;
    };

    const [preco, setPreco] = useState('0,00');

    function salvar(dados) {
        if (produto.id) {
            Object.assign(produto, dados);
        } else {
            dados.id = v4();
            produtos.push(dados);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
        return route.push('/');
    }

    return (
        <>
            <Header />
            <Container>
                <div className='d-flex justify-content-center align-items-center my-3 texto-custom'>
                    <h2>CRIAR OU EDITAR PRODUTO</h2>
                </div>

                <Formik
                    initialValues={produto}
                    validationSchema={ProdutosValidator}
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                        <Form className="my-3" onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group as={Row} className="mb-4" controlId="nome">
                                        <Form.Label column sm="1"><b>Nome:</b> </Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                type="text"
                                                name="nome"
                                                value={values.nome}
                                                onChange={handleChange('nome')}
                                                isInvalid={touched.nome && !!errors.nome}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" controlId="marca">
                                        <Form.Label column sm="1"><b>Marca:</b> </Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                type="text"
                                                name="marca"
                                                value={values.marca}
                                                onChange={handleChange('marca')}
                                                isInvalid={touched.marca && !!errors.marca}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.marca}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" controlId="descricao">
                                        <Form.Label column sm='2'><b>Descrição:</b> </Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="descricao"
                                                value={values.descricao}
                                                onChange={handleChange('descricao')}
                                                isInvalid={touched.descricao && !!errors.descricao}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.descricao}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" controlId="info_tecnica">
                                        <Form.Label column sm='2'><b>Informações Técnicas:</b> </Form.Label>
                                        <Col sm='9'>
                                            <Form.Control
                                                as="textarea"
                                                rows={4}
                                                name="info_tecnica"
                                                value={values.info_tecnica}
                                                onChange={handleChange('info_tecnica')}
                                                isInvalid={touched.info_tecnica && !!errors.info_tecnica}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.info_tecnica}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" controlId="preco">
                                        <Form.Label column sm="1"><b>Preço:</b> </Form.Label>
                                        <Col sm="10">
                                            <Form.Control
                                                type="text"
                                                name="preco"
                                                value={values.preco}
                                                onChange={(e) => {
                                                    const valorFormatado = formatarPreco(e.target.value);
                                                    setPreco(valorFormatado);
                                                    setFieldValue('preco', valorFormatado);
                                                }}
                                                isInvalid={touched.preco && !!errors.preco}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.preco}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-4" controlId="tipo">
                                        <Form.Label column sm='1'><b>Tipo:</b> </Form.Label>
                                        <Col sm='10'>
                                            <Form.Select
                                                name="tipo"
                                                value={values.tipo}
                                                onChange={handleChange('tipo')}
                                                isInvalid={touched.tipo && !!errors.tipo}
                                            >
                                                <option value=''>Selecionar Tipo</option>
                                                <option value='perifericos'>Periféricos</option>
                                                <option value='computadores'>Computadores</option>
                                                <option value='processador'>Processador</option>
                                                <option value='placa_mae'>Placa Mãe</option>
                                                <option value='fontes'>Fonte</option>
                                                <option value='coolers'>Cooler</option>
                                                <option value='memoria_ram'>Memória RAM</option>
                                                <option value='armazenamento_interno'>Armazenamento Interno</option>
                                                <option value='placa_de_video'>Placa de Vídeo</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">{errors.tipo}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="imagem">
                                        <Form.Label column sm='1'><b>Foto:</b> </Form.Label>
                                        <Col sm='10'>
                                            <Form.Control
                                                type="text"
                                                name="imagem"
                                                placeholder="Url da Imagem"
                                                value={values.imagem}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setFieldValue('imagem', e.target.value);
                                                }}
                                                isInvalid={touched.imagem && !!errors.imagem}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.imagem}</Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>

                                    <div className='d-flex justify-content-center align-items-center my-5 texto-custom'>
                                        <h4>PREVIEW DA FOTO DO PRODUTO <ImArrowRight size={50} /></h4>
                                    </div>
                                </Col>

                                <Col>
                                    <div className="d-flex justify-content-center align-items-center mt-5">
                                        {values && values.imagem === '' ? (
                                            <h2 className="text-danger imagem_produto_preview_no_image">Sem Imagem!</h2>
                                        ) : (
                                            <Image src={values.imagem} alt="Preview" className="imagem_produto_preview" />
                                        )}
                                    </div>
                                </Col>
                            </Row>

                            <div className="text-center">
                                <Button type="submit" variant="success">
                                    <FaCheck /> Salvar
                                </Button>
                                <Link href={'/'} className="btn btn-danger ms-2">
                                    <MdOutlineArrowBack /> Voltar
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Container>
            <Footer />
        </>
    );
}
