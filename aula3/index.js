// Importa a lista de livros desordenada
const listaLivros = require('./array');

// Divide o array em partes menores, de forma recursiva, e depois junta tudo ordenado
function mergeSort(array) {

  // Só divide se o array tiver mais de 1 elemento (1 elemento já está ordenado)
  if (array.length > 1) {

    // Índice do meio. Math.floor arredonda para baixo, pois índice precisa ser inteiro
    const meio = Math.floor(array.length / 2);

    // Divide em duas partes e chama mergeSort de novo para cada uma (recursão)
    const parte1 = mergeSort(array.slice(0, meio));
    const parte2 = mergeSort(array.slice(meio, array.length));

    // Junta as duas partes (que já voltam ordenadas) usando a função ordena
    array = ordena(parte1, parte2);
  }

  // Devolve o array ordenado
  return array;
}

// Junta duas partes JÁ ORDENADAS em uma só, também ordenada
// (é a mesma lógica da função juntaListas das aulas anteriores)
function ordena(parte1, parte2) {

  // Controlam a posição atual de cada parte (começam no índice 0)
  let posicaoAtualParte1 = 0;
  let posicaoAtualParte2 = 0;

  // Lista que vai receber os livros na ordem certa
  const resultado = [];

  // Compara enquanto as DUAS partes ainda tiverem livros
  while (posicaoAtualParte1 < parte1.length && posicaoAtualParte2 < parte2.length) {

    // Pega o objeto (título e preço) da posição atual de cada parte
    let produtoAtualParte1 = parte1[posicaoAtualParte1];
    let produtoAtualParte2 = parte2[posicaoAtualParte2];

    // Se o preço da parte 1 for menor, ele entra primeiro no resultado
    if (produtoAtualParte1.preco < produtoAtualParte2.preco) {
      resultado.push(produtoAtualParte1);   // push coloca no final do array
      posicaoAtualParte1++;                 // só anda a parte de onde o livro saiu
    } else {
      resultado.push(produtoAtualParte2);
      posicaoAtualParte2++;
    }
  }

  // Uma das partes acabou: concat cola no resultado o que sobrou da outra
  // (ternário: se sobrou na parte 1, usa a parte 1; senão, usa a parte 2)
  return resultado.concat(
    posicaoAtualParte1 < parte1.length
      ? parte1.slice(posicaoAtualParte1)   // slice com 1 parâmetro: dali até o final
      : parte2.slice(posicaoAtualParte2)
  );
}

// Executa e mostra o resultado no terminal
console.log(mergeSort(listaLivros));