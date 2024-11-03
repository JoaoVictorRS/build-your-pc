import * as Yup from 'yup';

const LoginValidator = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export default LoginValidator;