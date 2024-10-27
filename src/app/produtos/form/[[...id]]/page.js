'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";

export default function Page({ params }) {

    const route = useRouter()
    const searchParams = useSearchParams();
    const tipo = searchParams.get('tipo');

    const produtos = JSON.parse(localStorage.getItem('produtos')) || []
    const dados = produtos.find(item => item.id == params.id)
    const produto = dados || { nome: '', descricao: '', imagem: '', preco: '', tipo: '' }

    //Função para formatar o preço
    const formatarPreco = (valor) => {
        valor = valor.replace(/\D/g, '');
        valor = (Number(valor) / 100).toFixed(2);
        return `R$${valor.toString().replace('.', ',')}`;
    };

    const [preco, setPreco] = useState('R$ 0,00');

    function salvar(dados) {

        if (produto.id) {
            Object.assign(produto, dados)
        } else {
            dados.id = v4()
            produtos.push(dados)
        }

        localStorage.setItem('produtos', JSON.stringify(produtos))
        return route.push(`/${tipo}`)
    }

    return (
        <>
            <Header />
            <Container>
                <Formik
                    initialValues={produto}
                    onSubmit={values => salvar(values)}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        errors,
                        setFieldValue
                    }) => {
                        return (
                            <Form className="my-5">
                                <Form.Group className="mb-3" controlId="nome">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange('nome')}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descricao">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="descricao"
                                        value={values.descricao}
                                        onChange={handleChange('descricao')}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="imagem">
                                    <Form.Label>Imagem</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="imagem"
                                        value={values.imagem}
                                        onChange={handleChange('imagem')}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="preco">
                                    <Form.Label>Preço</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="preco"
                                        value={values.preco}
                                        onChange={(e) => {
                                            const valorFormatado = formatarPreco(e.target.value);
                                            setPreco(valorFormatado);
                                            setFieldValue('preco', valorFormatado);
                                        }}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="tipo">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        name="tipo"
                                        value={values.tipo}
                                        onChange={handleChange('tipo')}
                                    >
                                        <option value=''>Selecionar Tipo</option>
                                        <option value='periferico'>Periférico</option>
                                        <option value='computador'>Computador</option>
                                        <option value='placa_mae'>Placa Mãe</option>
                                        <option value='fonte'>Fonte</option>
                                        <option value='cooler'>Cooler</option>
                                        <option value='memoria_ram'>Memória RAM</option>
                                        <option value='armazenamento_interno'>Armazenamento Interno</option>
                                        <option value='placa_de_video'>Placa de Vídeo</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className="text-center">
                                    <Button onClick={handleSubmit} variant="success">
                                        <FaCheck /> Salvar
                                    </Button>
                                    <Link
                                        href={`/${tipo}`}
                                        className="btn btn-danger ms-2"
                                    >
                                        <MdOutlineArrowBack /> Voltar
                                    </Link>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </Container>
            <Footer />
        </>
    )
}
