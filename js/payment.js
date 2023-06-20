function PaymentFrom() {
    const token = getCookie("token");
    if (token) {
        const paymentType = getQueryVariable("paymentType");

        if (paymentType === "Pix") {
            createPixForm();
        } else if (paymentType === "Boleto") {
            createBoletoForm();
        }
    } else {
        window.location.href = "home.html";
    }
}

function createPixForm() {
    const formDiv = document.createElement("div");
    formDiv.classList.add("pix-form");

    const label1 = document.createElement("label");
    label1.classList.add("pix-title");
    label1.textContent = "Pagamento por Pix";

    const label2 = document.createElement("label");
    label2.classList.add("pix-label");
    label2.textContent = "CPF";

    const cpf = document.createElement("input");
    cpf.classList.add("pix-input");
    cpf.type = "text";

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit");
    submitButton.textContent = "Finalizar Compra";
    submitButton.addEventListener("click", function () {
        const checkoutId = getQueryVariable("checkoutId");
        const Cpf = cpf.value;
        const userId = getCookie("id");
        const token = getCookie("token");

        const data = {
            pix: {
                id: null,
                userId: userId,
                company: null,
                userName: null,
                emissionDate: null,
                validityDate: null,
                paidOutDate: null,
                value: 0,
                checkoutId: checkoutId,
                paidOut: true,
                cpf: Cpf,
                pixCode: "",
            },
            bankSlip: null,
        };

        axios
            .post("https://localhost:7150/Payment/Pay/" + checkoutId, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                const idPagamento = response.data.id;
                document.cookie = `idPagamento=${idPagamento}`;
            })
            .catch((error) => {
                alert("Erro: " + error.response.data.message);
            });

        const pagarContaButton = document.querySelector(".pagar-conta-button");
        if (!pagarContaButton) {
            // Criar novo botão "Pagar Conta" somente se não existir
            const novoPagarContaButton = document.createElement("button");
            novoPagarContaButton.classList.add("submit", "pagar-conta-button");
            novoPagarContaButton.textContent = "Pagar Conta";
            novoPagarContaButton.addEventListener("click", function () {
                const idPagamento = getCookie("idPagamento");
                axios
                    .post("https://localhost:7150/Payment/FinalizePayment/" + idPagamento)
                    .then((response) => {
                        // Sucesso
                        alert("Sucesso: O item foi pago");
                        document.cookie = `idPagamento=0`;
                        window.location.href = "/home.html";

                    })
                    .catch((error) => {
                        alert("Erro:" + error.response.data.message);
                    });
            });

            formDiv.appendChild(novoPagarContaButton);
        }
    });

    formDiv.appendChild(label1);
    formDiv.appendChild(label2);
    formDiv.appendChild(cpf);
    formDiv.appendChild(submitButton);
    // Adicione os outros labels e inputs ao div do formulário

    // Adiciona o div do formulário ao formContainer
    const formContainer = document.getElementById("form-container");
    formContainer.appendChild(formDiv);
}

function createBoletoForm() {
    const formDiv = document.createElement("div");
    formDiv.classList.add("pix-form");

    const label1 = document.createElement("label");
    label1.classList.add("pix-title");
    label1.textContent = "Pagamento por Boleto";

    const label2 = document.createElement("label");
    label2.classList.add("pix-label");
    label2.textContent = "CPF";

    const cpf = document.createElement("input");
    cpf.classList.add("pix-input");
    cpf.type = "text";

    const submitButton = document.createElement("button");
    submitButton.classList.add("submit");
    submitButton.textContent = "Capturar Valores";
    submitButton.addEventListener("click", function () {
        const checkoutId = getQueryVariable("checkoutId");
        const Cpf = cpf.value;
        const userId = getCookie("id");
        const token = getCookie("token");

        const data = {
            pix: null,
            bankSlip: {
                id: null,
                userId: userId,
                company: null,
                userName: null,
                emissionDate: null,
                validityDate: null,
                paidOutDate: null,
                value: null,
                checkoutId: checkoutId,
                paidOut: null,
                cpf: Cpf,
                bankSlipCode: null,
            },
        };

        axios
            .post("https://localhost:7150/Payment/Pay/" + checkoutId, data, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            .then((response) => {
                const idPagamento = response.data.id;
                document.cookie = `idPagamento=${idPagamento}`;
            })
            .catch((error) => {
                alert("Erro: " + error.response.data.message);
            });

        const pagarContaButton = document.querySelector(".pagar-conta-button");
        if (!pagarContaButton) {
            // Criar novo botão "Pagar Conta" somente se não existir
            const novoPagarContaButton = document.createElement("button");
            novoPagarContaButton.classList.add("submit", "pagar-conta-button");
            novoPagarContaButton.textContent = "Pagar Conta";
            novoPagarContaButton.addEventListener("click", function () {
                const idPagamento = getCookie("idPagamento");
                axios
                    .post("https://localhost:7150/Payment/FinalizePayment/" + idPagamento)
                    .then((response) => {
                        // Sucesso
                        alert("Sucesso: O item foi pago");
                        document.cookie = `idPagamento=0`;

                    })
                    .catch((error) => {
                        alert("Erro:" + error.response.data.message);
                    });
            });

            formDiv.appendChild(novoPagarContaButton);
        }
    });

    formDiv.appendChild(label1);
    formDiv.appendChild(label2);
    formDiv.appendChild(cpf);
    formDiv.appendChild(submitButton);
    // Adicione os outros labels e inputs ao div do formulário

    // Adiciona o div do formulário ao formContainer
    const formContainer = document.getElementById("form-container");
    formContainer.appendChild(formDiv);
}

function getQueryVariable(variable) {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log("Query variable %s not found", variable);
}

function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}


