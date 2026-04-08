export const enviarDados = async (URL_GOOGLE, dadosUsuario, respostas) => {
  const params = new URLSearchParams();

  params.append("data", new Date().toLocaleString("pt-BR"));
  params.append("nome", dadosUsuario.nome);
  params.append("telefone", dadosUsuario.telefone);
  params.append("email", dadosUsuario.email);

  respostas.forEach((r, i) => params.append(`r${i + 1}`, r));

  try {
    await fetch(URL_GOOGLE, {
      method: "POST",
      mode: "no-cors",
      body: params
    });
  } catch (err) {
    console.error("Erro no envio:", err);
  }
};