import { SHIRT_SIZES, SHOE_MIN, SHOE_MAX } from './constants';

export const onlyDigits = (v = '') => String(v).replace(/\D/g, '');

export function maskCpf(v = '') {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export function isValidCpf(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  const calc = (len) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += Number(cpf[i]) * (len + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 ? 0 : r;
  };
  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function validateEmployee(f) {
  const errors = {};
  if (!f.cpf) errors.cpf = 'Informe o CPF.';
  else if (!isValidCpf(f.cpf)) errors.cpf = 'CPF inválido.';

  if (!f.name?.trim()) errors.name = 'Informe o nome.';
  else if (f.name.trim().length < 3) errors.name = 'O nome deve ter ao menos 3 caracteres.';

  if (!f.email) errors.email = 'Informe o e-mail.';
  else if (!isValidEmail(f.email)) errors.email = 'E-mail inválido.';

  if (!f.shirtSize) errors.shirtSize = 'Selecione o tamanho da camiseta.';
  else if (!SHIRT_SIZES.includes(f.shirtSize)) errors.shirtSize = 'Tamanho inválido.';

  const shoe = Number(f.shoeSize);
  if (f.shoeSize === '' || f.shoeSize == null) errors.shoeSize = 'Informe o tamanho do calçado.';
  else if (!Number.isInteger(shoe) || shoe < SHOE_MIN || shoe > SHOE_MAX)
    errors.shoeSize = `Informe um número entre ${SHOE_MIN} e ${SHOE_MAX}.`;
  return errors;
}
