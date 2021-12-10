
import { User } from 'src/interfaces/user';

 interface ValidateResult {
    ok: boolean;
    fields: Record<string, string>;
}

export function validateCpf(cpf: string): boolean {
    let amount = 0;
    let rest: number;

    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

    for (let i = 1; i <= 9; i += 1)
        amount += Number(cpf.substring(i - 1, i)) * (11 - i);
    rest = (amount * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== Number(cpf.substring(9, 10))) return false;

    amount = 0;
    for (let i = 1; i <= 10; i += 1)
        amount += Number(cpf.substring(i - 1, i)) * (12 - i);
    rest = (amount * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== Number(cpf.substring(10, 11))) return false;
    return true;
}

export async function validateUser(user: User): Promise<ValidateResult> {
    const Yup = await import('yup');

    const validationErrors: Record<string, string> = {};

    const schema = Yup.object().shape({
        name: Yup.string().required('Por favor, digite seu nome.'),
        email: Yup.string().email('Por favor, digite um email válido.').required('Por favor, digite seu e-mail.'),
        phone: Yup.string()
          .matches(
            /(\(\d{2}\) \d\d{4}-\d{4})/,
            'Digite um Telefone válido.',
          ).required('Por favor, digite um telefone.'),
        cpf: Yup.string().required('Por favor, digite o seu cpf.')
        .test('verifyCPF', 'Por favor digite um cpf válido.', value => validateCpf(value?.replaceAll('-', '').replaceAll('.', '') as string)),
      })

    try {
        await schema.validate(user, {
            abortEarly: false,
        });

        return { ok: true, fields: {} };
    } catch (err) {
        if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
                if (error && error.path) {
                    validationErrors[error.path] = error.message;
                }
            });

            return { ok: false, fields: validationErrors };
        }

        return { ok: false, fields: {} };
    }
}
