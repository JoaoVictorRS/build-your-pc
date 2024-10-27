'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Button, Container, Form } from 'react-bootstrap';
import Link from 'next/link';
import './styles.css'
import Image from 'next/image';
import logo from '../public/logo_menor.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.senha === senha);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      alert('Login bem-sucedido!');
      router.push('/');
    } else {
      alert('Credenciais inválidas');
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
          <Form className='w-25 login-background'>
            <div className='d-flex justify-content-center align-items-center my-2'>
              <Image src={logo} alt='Logo' width={100} />
            </div>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label className='text-white'>Email</Form.Label>
              <Form.Control type="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicSenha">
              <Form.Label className='text-white'>Senha</Form.Label>
              <Form.Control type="password"
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)} />
            </Form.Group>
            <div className='d-flex justify-content-center align-items-center'>
              <Button
                className='w-75 my-3 button-login'
                type="button"
                onClick={handleLogin}>
                Entrar
              </Button>
            </div>
            <div className='d-flex justify-content-center align-items-center my-2'>
              <p className='text-white'>Não tem uma conta? <Link href="/cadastro">Cadastre-se</Link></p>
            </div>
          </Form>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Login;