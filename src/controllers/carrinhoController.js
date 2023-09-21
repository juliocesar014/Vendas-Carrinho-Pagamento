import carrinho from '../models/Carrinho.js';
import vendas from '../models/Vendas.js';

class CarrinhoController {

  static listarCarrinho = async (req, res) => {
    try {
      const carrinhosComVendas = await carrinho.find().populate('vendas');
      const nomesDasVendas = carrinhosComVendas.map((carrinho) => carrinho.vendas.nome);
      res.status(200).json({ nomesDasVendas });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao listar vendas no carrinho.' });
    }
  };




  static adicionarAoCarrinho = (req, res) => {

    const vendaId = req.body.vendas;
    vendas.findById(vendaId, (err, venda) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao buscar a venda.' });
      }
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada.' });
      }
      const nomeVenda = venda.nome;
      res.status(200).json({ nomeVenda });
    });
  };

}





export default CarrinhoController;
