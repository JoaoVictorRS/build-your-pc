import * as Yup from 'yup';

const ProdutosValidator = Yup.object().shape({
  nome: Yup.string()
    .required('O nome do produto é obrigatório')
    .min(2, 'O nome deve ter pelo menos 2 caracteres'),

  marca: Yup.string()
    .required('A marca do produto é obrigatória')
    .min(2, 'A marca deve ter pelo menos 2 caracteres'),

  info_tecnica: Yup.string()
    .required('As informações técnicas são obrigatórias')
    .min(10, 'As informações técnicas devem ter pelo menos 10 caracteres'),

  preco: Yup.string()
    .required('O preço do produto é obrigatório')
    .matches(/^\d+,\d{2}$/, 'O preço deve estar no formato 0,00'),

  tipo: Yup.string()
    .required('O tipo do produto é obrigatório')
    .oneOf([
      'perifericos', 'computadores', 'processador', 'placa_mae', 'fontes', 
      'coolers', 'memoria_ram', 'armazenamento_interno', 'placa_de_video'
    ], 'Selecione um tipo válido'),

  imagem: Yup.string()
    .url('A URL da imagem é inválida')
    .required('A URL da imagem é obrigatória'),
});

export default ProdutosValidator;
