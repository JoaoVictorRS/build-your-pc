'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Row, Col, Container, InputGroup, Image } from "react-bootstrap";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import ReactInputMask from "react-input-mask";
import './styleUser.css'
import { ImArrowRight } from "react-icons/im";
import UserValidator from "@/app/validations/UserValidator";
import Swal from "sweetalert2";

export default function Page({ params }) {

  const route = useRouter();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const dados = users.find(item => item.id == params.id);
  const user = dados || { nome: '', email: '', cpf: '', imagem_perfil: '' };

  function salvar(dados) {
    if (user.id) {
      Object.assign(user, dados);
    } else {
      users.push(dados);
    }

    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'As mudanças foram salvas com sucesso.',
      timer: 2000, // Duração do alerta em milissegundos
      showConfirmButton: false,
      willClose: () => {
        route.push('/userDashboard/' + params.id);
      }
    });
  }

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center my-5 title-enderecos'>
          <h4>Gerenciar Dados Cadastrados</h4>
        </div>

        <Formik
          initialValues={user}
          validationSchema={UserValidator}
          onSubmit={values => salvar(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            touched
          }) => {
            return (
              <Form>
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
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="email">
                      <Form.Label column sm="1"><b>Email:</b> </Form.Label>
                      <Col sm="10">
                        <Form.Control
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange('email')}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-4" controlId="cpf">
                      <Form.Label column sm='1'><b>CPF:</b> </Form.Label>
                      <Col sm='10'>
                        <ReactInputMask
                          mask="999.999.999-99"
                          value={values.cpf}
                          onChange={handleChange}
                          onBlur={() => setFieldValue("cpf", values.cpf)}
                        >
                          {() => (
                            <Form.Control
                              type="text"
                              name="cpf"
                              isInvalid={touched.cpf && !!errors.cpf}
                            />
                          )}
                        </ReactInputMask>
                        <Form.Control.Feedback type="invalid">{errors.cpf}</Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="imagem_perfil">
                      <Form.Label column sm='1'><b>Foto:</b> </Form.Label>
                      <Col sm='10'>
                        <Form.Control
                          type="text"
                          name="imagem_perfil"
                          placeholder="Url da Imagem"
                          value={values.imagem_perfil}
                          onChange={(e) => {
                            handleChange(e);
                            setFieldValue('imagem_perfil', e.target.value);
                          }}
                        />
                      </Col>
                    </Form.Group>

                    <div className='d-flex justify-content-center align-items-center my-5 title-enderecos'>
                      <h4>PREVIEW DA FOTO DE PERFIL <ImArrowRight size={50} /></h4>
                    </div>
                  </Col>

                  <Col>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      {values && values.imagem_perfil === '' ? (
                        <h2 className="text-danger imagem_produto_preview_no_image">Sem Imagem!</h2>
                      ) : (
                        <Image src={values.imagem_perfil} alt="Preview" className="imagem_perfil_preview" />

                      )}
                    </div>
                  </Col>
                </Row>

                <div className="text-center mt-4">
                  <Button onClick={handleSubmit} variant="success">
                    <FaCheck /> Salvar
                  </Button>
                  <Link
                    href={`/userDashboard/${params.id}`}
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
  );
}
