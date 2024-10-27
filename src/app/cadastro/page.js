'use client';

import { useRouter } from 'next/navigation';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../components/Header/Header';
import logo from '../public/logo_menor.png';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer/Footer';
import { Formik } from 'formik';
import './cadastroStyles.css';
import CadastroValidator from '../validations/CadastroValidator';
import { v4 } from 'uuid';
import ReactInputMask from 'react-input-mask';


const Register = () => {
  const router = useRouter();

  const handleRegister = (values) => {
    const { email, senha, nome, cpf, imagem_perfil } = values;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert('Usuário já existe');
    } else {
      const newUser = { email, senha, nome, cpf, imagem_perfil };
      newUser.id = v4()
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Cadastro bem-sucedido!');
      router.push('/login');
    }
  };
  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <h1 className='text-orange'>CRIAR CONTA</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center my-3 py-4'>
          <Formik
            initialValues={{ email: '', senha: '', nome: '', cpf: '', imagem_perfil: '' }}
            validationSchema={CadastroValidator}
            onSubmit={(values) => {
              handleRegister(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form className='w-25 login-background' onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center align-items-center my-2'>
                  <Image src={logo} alt='Logo' width={100} />
                </div>

                <Form.Group className="mb-4" controlId="formBasicNome">
                  <Form.Label className='text-white'>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="José Felipe..."
                    name="nome"
                    value={values.nome}
                    onChange={handleChange}
                    isInvalid={touched.nome && !!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicCPF">
                  <Form.Label className='text-white'>CPF</Form.Label>
                  <ReactInputMask
                    mask="999.999.999-99"
                    value={values.cpf}
                    onChange={handleChange}
                  >
                    {(inputProps) => (
                      <Form.Control
                        {...inputProps}
                        type='text'
                        placeholder='111.222.333-44'
                        name="cpf"
                        isInvalid={touched.cpf && !!errors.cpf}
                      />
                    )}
                  </ReactInputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label className='text-white'>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="exemplo@gmail.com"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicSenha">
                  <Form.Label className='text-white'>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Senha"
                    name="senha"
                    value={values.senha}
                    onChange={handleChange}
                    isInvalid={touched.senha && !!errors.senha}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.senha}
                  </Form.Control.Feedback>
                </Form.Group>

                <span className='divider-custom w-100 my-3'></span>

                <Form.Group className="mb-4" controlId="formBasicImagem">
                  <Form.Label className='text-white'>Foto de Perfil</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Url da imagem"
                    name="imagem_perfil"
                    value={values.imagem_perfil}
                    onChange={handleChange}
                    isInvalid={touched.imagem_perfil && !!errors.imagem_perfil}
                  />
                  <Form.Text className="text-white">
                    *Opcional
                  </Form.Text>
                </Form.Group>

                <div className='d-flex justify-content-center align-items-center'>
                  <Button className='w-75 my-3 button-login'
                    type="submit">
                    Cadastrar-se
                  </Button>
                </div>
                <div className='d-flex justify-content-center align-items-center my-2'>
                  <p className='text-white'>Já tem uma conta? <Link href="/login">Login</Link></p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Register;
