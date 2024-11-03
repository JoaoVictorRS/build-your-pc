'use client';

import { useRouter } from 'next/navigation';
import { Button, Container, Form } from 'react-bootstrap';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import logo from '../public/logo_menor.png';
import Image from 'next/image';
import Link from 'next/link';
import { Formik } from 'formik';
import LoginValidator from '../validations/LoginValidator';
import Swal from 'sweetalert2';
import './loginStyles.css';

const Login = () => {
  const router = useRouter();

  const handleLogin = (values) => {
    const { email, senha } = values;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email && user.senha === senha);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      Swal.fire({
        icon: 'success',
        title: 'Bem-vindo!',
        text: 'Login bem-sucedido!',
        timer: 2000, // Mensagem fecha automaticamente após 2 segundos
        showConfirmButton: false,
      }).then(() => {
        router.push('/');
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Credenciais inválidas',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className='d-flex justify-content-center align-items-center mt-5'>
          <h1 className='text-orange'>ACESSAR CONTA</h1>
        </div>
        <div className='d-flex justify-content-center align-items-center my-3 py-4'>
          <Formik
            initialValues={{ email: '', senha: '' }}
            validationSchema={LoginValidator}
            onSubmit={(values) => {
              handleLogin(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <Form className='w-25 login-background' onSubmit={handleSubmit}>
                <div className='d-flex justify-content-center align-items-center my-2'>
                  <Image src={logo} alt='Logo' width={100} />
                </div>

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

                <div className='d-flex justify-content-center align-items-center'>
                  <Button className='w-75 my-3 button-login' type="submit">
                    Entrar
                  </Button>
                </div>
                <div className='d-flex justify-content-center align-items-center my-2'>
                  <p className='text-white'>Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link></p>
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

export default Login;
