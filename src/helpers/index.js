export const successResponse = (req, res, data, code = 200) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(500).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateFields = (object, fields) => {
  const errors = [];
  fields.forEach((f) => {
    if (!(object && object[f])) {
      errors.push(f);
    }
  });
  return errors.length ? `${errors.join(', ')} are required fields.` : '';
};

export const uniqueId = (length = 13) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const isValidCPF = (cpf) => {
  if (typeof cpf !== 'string') return false;
  cpf = cpf.replace(/[\s.-]*/igm, '');

  if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
    return false;
  }

  let sum = 0;
  let remainder;
  for (var i = 1; i <= 9; i++) { sum += parseInt(cpf.substring(i - 1, i)) * (11 - i); }
  remainder = (sum * 10) % 11;
  if ((remainder == 10) || (remainder == 11)) remainder = 0;
  if (remainder != parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (var i = 1; i <= 10; i++) { sum += parseInt(cpf.substring(i - 1, i)) * (12 - i); }
  remainder = (sum * 10) % 11;
  if ((remainder == 10) || (remainder == 11)) remainder = 0;
  if (remainder != parseInt(cpf.substring(10, 11))) return false;
  return true;
};

export const isValidCNPJ = (value) => {
  if (!value) return false;

  // Accepts to receive the value as string, number or array with all digits
  const validTypes = typeof value === 'string' || Number.isInteger(value) || Array.isArray(value);

  // Eliminates value in invalid format
  if (!validTypes) return false;

  // Save an array with all digits from value
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];

  // Validates amount of digits
  if (numbers.length !== 14) return false;

  // Eliminates invalid when all digits are same
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  // Validator computation
  const calc = (x) => {
    const slice = numbers.slice(0, x);
    let factor = x - 7;
    let sum = 0;

    for (let i = x; i >= 1; i--) {
      const n = slice[x - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  // Separates last 2 verifiers digits
  const digits = numbers.slice(12);

  // Validates first verifier digit
  const digit0 = calc(12);
  if (digit0 !== digits[0]) return false;

  // Validates second verifier digit
  const digit1 = calc(13);
  return digit1 === digits[1];
};

/**
 * Validates both phone and mobile numbers with[out] DDD and DDI
 * valid examples: +55(11) 98888 - 8888 / 9999 - 9999 / 21 98888 - 8888 / 5511988888888
*/
export const regexBrazilianPhones = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;

/**
 * validates only Brazilian mobile phone numbers
 */
export const regexBRMobilePhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d)\d{3})\-?(\d{4}))$/;

/**
 * validates only Brazilian ground phone numbers
 */
export const regexBRPhone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:[2-9])\d{3})\-?(\d{4}))$/;

/**
 * strip away everything besides the number
 */
export const toOnlyNumbers = (values, keys = []) => {
  const onlyNumbers = /\d/g;

  if (values === 'string') return values.match(onlyNumbers).join('');

  if (Array.isArray(values)) {
    return values.map(value => value.match(onlyNumbers).join(''));
  }
  const v = {};
  for (const key of keys) {
    v[key] = values[key].match(onlyNumbers).join('');
  }
  return v;
};
