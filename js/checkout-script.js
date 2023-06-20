function capturarValores() {
    var cep = document.getElementById("cep").value;
    var cidade = document.getElementById("cidade").value;
    var pais = document.getElementById("pais").value;
    var estado = document.getElementById("estado").value;
    var rua = document.getElementById("rua").value;
    var complemento = document.getElementById("complemento").value;
    var pontoReferencia = document.getElementById("ponto-referencia").value;
    var formaPagamento = document.getElementById("forma-pagamento").value;
    var idPagamento;
    const token = getCookie('token');

    if (
      cep === "" ||
      cidade === "" ||
      pais === "" ||
      estado === "" ||
      rua === "" ||
      formaPagamento === ""
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    // Verificar se os selects estão nos estados padrões
    if (estado === "" || formaPagamento === "") {
      alert("Por favor, selecione uma opção válida nos campos de seleção.");
      return;
    }
  
    if(formaPagamento == "Pix")
        idPagamento = 0;
    else if(formaPagamento == "Boleto")
        idPagamento = 1;


    // Fazer o axios GET para obter o carrinho do usuário
    axios
      .get("https://localhost:7150/Cart/GetByUserId/" + getCookie("id"),{
        headers: {
            Authorization: "Bearer " + token
        }
      })
      .then(function (cartResponse) {
        var endereco = {
          id: "",
          userId: getCookie("id"),
          cep: cep,
          street: rua,
          city: cidade,
          province: estado,
          country: pais, 
          complemenent: complemento,
          reference: pontoReferencia,
          cart: cartResponse.data,
          paymentMethod: idPagamento,
          finished: true
        };
  
        axios
          .post("https://localhost:7150/Checkout/Create", endereco,{
            headers: {
                Authorization: "Bearer " + token
            }
          })
          .then(function (checkoutResponse) {
            alert("Resposta do Checkout:" + checkoutResponse.data);
            const checkoutId = checkoutResponse.data; // Substitua "123" pelo valor real do ID do checkout
            const paymentType = formaPagamento; // Substitua "Boleto" pelo valor real do tipo de pagamento
          
            // Redirecionar para a página payment.html com os parâmetros na URL
            const redirectUrl = `payment.html?checkoutId=${checkoutId}&paymentType=${paymentType}`;
            window.location.href = redirectUrl;
          })
          .catch(function (error) {
            console.log(error);
            alert("Ocorreu um erro ao criar o endereço ou realizar o checkout.");
          });
      })
      .catch(function (error) {
        console.log(error);
        alert("Ocorreu um erro ao obter o carrinho do usuário.");
      });
  }
  

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }