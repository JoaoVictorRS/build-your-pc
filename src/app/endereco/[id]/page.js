'use client'

import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";
import { Formik, FieldArray } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import axios from "axios";
import ReactInputMask from "react-input-mask";
import './styleEndereco.css'

export default function Page({ params }) {

  const route = useRouter();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const dados = users.find(item => item.id == params.id);
  const user = dados || { enderecos: [] };

  function salvar(dados) {
    if (user.id) {
      Object.assign(user, dados);
    } else {
      users.push(dados);
    }
    localStorage.setItem('users', JSON.stringify(users));
    return route.push('/userDashboard/' + params.id);
  }

  async function buscarEnderecoPorCep(cep, setFieldValue, index) {
    const cepSemMascara = cep.replace(/\D/g, '');
    if (cepSemMascara.length === 8) { 
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepSemMascara}/json/`);
        const { logradouro, localidade, uf, complemento, bairro } = response.data;
        setFieldValue(`enderecos[${index}].logradouro`, logradouro || '');
        setFieldValue(`enderecos[${index}].cidade`, localidade || '');
        setFieldValue(`enderecos[${index}].estado`, uf || '');
        setFieldValue(`enderecos[${index}].complemento`, complemento || '');
        setFieldValue(`enderecos[${index}].bairro`, bairro || '');
        setFieldValue(`enderecos[${index}].casa`, casa || '');
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Formik
          initialValues={user}
          onSubmit={values => salvar(values)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => {
            return (
              <Form>
                <div className='d-flex justify-content-center align-items-center mt-3 title-enderecos'>
                  <h4>Gerenciar Endereços</h4>
                </div>
                <FieldArray
                  name="enderecos"
                  render={arrayHelpers => (
                    <>
                      {values.enderecos && values.enderecos.length > 0 ? (
                        values.enderecos.map((endereco, index) => (
                          <div key={index}>
                            <Row className="my-4 border-bottom pb-4">

                              <Col md={2}>
                                <Form.Group>
                                  <Form.Label>CEP</Form.Label>
                                  <ReactInputMask
                                    mask="99999-999"
                                    value={endereco.cep || ''}
                                    onChange={(e) => {
                                      handleChange(e);
                                      buscarEnderecoPorCep(e.target.value, setFieldValue, index);
                                    }}
                                  >
                                    {(inputProps) => <Form.Control {...inputProps} placeholder="11111-111" name={`enderecos[${index}].cep`} />}
                                  </ReactInputMask>
                                </Form.Group>
                              </Col>

                              <Col md={4}>
                                <Form.Group>
                                  <Form.Label>Logradouro</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name={`enderecos[${index}].logradouro`}
                                    placeholder="QNM 27 Conj..."
                                    value={endereco.logradouro || ''}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>Cidade</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name={`enderecos[${index}].cidade`}
                                    value={endereco.cidade || ''}
                                    placeholder="Piracicaba"
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={3}>
                                <Form.Group>
                                  <Form.Label>Bairro</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name={`enderecos[${index}].bairro`}
                                    value={endereco.bairro || ''}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={2} className="mt-2">
                                <Form.Group>
                                  <Form.Label>Estado</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="São Paulo"
                                    name={`enderecos[${index}].estado`}
                                    value={endereco.estado || ''}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={2} className="mt-2">
                                <Form.Group>
                                  <Form.Label>Casa</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="ex: 03"
                                    name={`enderecos[${index}].casa`}
                                    value={endereco.casa || ''}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={5} className="mt-2">
                                <Form.Group>
                                  <Form.Label>Complemento</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name={`enderecos[${index}].complemento`}
                                    value={endereco.complemento || ''}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Col>

                              <Col md={12} className="d-flex align-items-center mt-3">
                                <Button
                                  variant="danger"
                                  onClick={() => arrayHelpers.remove(index)}
                                  className="w-25"
                                >
                                  <FaTrash />
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <div className="text-muted">Nenhum endereço cadastrado.</div>
                      )}

                      <Button
                        className="mt-3"
                        variant="primary"
                        onClick={() => arrayHelpers.push({ cep: '', rua: '', cidade: '', estado: '' })}
                      >
                        <FaPlus /> Adicionar Endereço
                      </Button>
                    </>
                  )}
                />

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
