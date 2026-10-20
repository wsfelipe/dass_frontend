# Dass brindes final do ano – Front-end

Vue 3 + Vite, organizado em **Atomic Design**.

## Requisitos
- Node 18+ e a API rodando (padrão `http://localhost:3000`)

## Como rodar
```bash
npm install
cp .env.example .env   # opcional
npm run dev            # http://localhost:5173
npm run build          # gera /dist
```
Em desenvolvimento o Vite faz proxy de `/employees`, `/health` e `/docs` para `VITE_PROXY_TARGET` (`http://localhost:5173`).
Em produção defina `VITE_API_URL` (`https://dass-backend-ho54.onrender.com/`) antes do build e habilite CORS na API.

## Estrutura
```
src/
  components/
    atoms/       AppButton, AppInput, AppSelect, AppTable, AppBadge, AppDivider
    molecules/   FormField, AppModal, AppPagination, ToastItem
    organisms/   AppHeader, EmployeeFilters, EmployeeTable, EmployeeForm, ConfirmDialog, ToastContainer
  templates/     DefaultLayout
  pages/         EmployeesPage
  composables/   useEmployees, useDebounce, useToast
  services/      api.js (fetch), employeeService.js
  utils/         constants, validators (CPF, e-mail, tamanhos, máscara)
  assets/        tokens.css (cores/tipografia), base.css
```

## Notas
- Filtros (CPF, nome, e-mail, camiseta, calçado) usam debounce de 400 ms e ignoram respostas antigas.
- O CPF é exibido com máscara e enviado somente com dígitos.
- Erros 409/422 da API viram toast e, quando trazem `field`/`path`, aparecem no campo.
- Identidade visual centralizada em `src/assets/tokens.css`.
