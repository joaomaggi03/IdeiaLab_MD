export function httpError(status, mensagem) { const erro = new Error(mensagem); erro.status = status; return erro; }
export function textoObrigatorio(valor, nome, limite = 10000) {
  if (typeof valor !== 'string' || !valor.trim() || valor.trim().length > limite) throw httpError(400, `Campo ${nome} inválido.`);
  return valor.trim();
}
export function idValido(valor) {
  const n = Number(valor);
  if (!Number.isSafeInteger(n) || n <= 0) throw httpError(400, 'Identificador inválido.');
  return n;
}
export function assertCampos(obj, permitidos) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) throw httpError(400, 'Envie um objeto JSON.');
  if (Object.keys(obj).some(k => !permitidos.includes(k))) throw httpError(400, 'O corpo contém campos não permitidos.');
}
