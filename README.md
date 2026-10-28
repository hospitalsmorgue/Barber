# Show de Barber

Plataforma brasileira de descoberta de barbearias, avaliações e reconhecimento de excelência. Projeto demonstrativo em Next.js 14 com dados e ações mockados no navegador.

## Executar localmente

Requisitos: Node.js 18.17+ e npm.

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Para gerar e iniciar a versão de produção:

```bash
npm run build
npm start
```

## Versão estática (abrir sem instalar nada)

A pasta `docs/` é o mesmo demonstrativo em um único `index.html`, com CSS e JavaScript clássicos (sem build, sem servidor e sem módulos ES). Dê um duplo clique em `docs/index.html`, ou arraste o arquivo para o navegador. A navegação fica na hash da URL, por exemplo `index.html#/busca` e `index.html#/barbearia/casa-otavio`. Favoritos, check-ins e o tour inicial continuam no `localStorage`. As fotos e as fontes precisam de internet.

Para publicar no GitHub Pages: no repositório, abra **Settings → Pages**, em **Build and deployment** escolha **Deploy from a branch**, selecione a branch `main` e a pasta **`/docs`**, e salve. O site fica em `https://SEU_USUARIO.github.io/SEU_REPOSITORIO/`.

## Publicar no GitHub

Crie um repositório vazio no GitHub e, na pasta do projeto, rode:

```bash
git init
git add .
git commit -m "Initial Show de Barber app"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

O `.gitignore` mantém `node_modules`, `.next`, caches e arquivos de ambiente fora do repositório. O `package-lock.json` deve ser enviado para reproduzir as dependências.

## Rotas

- `/` — Home, busca rápida, filtros e recomendações
- `/busca` — resultados, filtros completos e mapa ilustrativo
- `/barbearia/[slug]` — perfil, fotos, avaliações e agendamento mockado
- `/hall-da-fama` — selo Badge of Honour
- `/ranking/sao-paulo` — Top 10 por cidade e período (`semana`, `mes`, `geral`)
- `/comparar?barbers=casa-otavio,estudio-sete` — comparação de duas ou três opções
- `/login` e `/cadastro` — formulários e opções sociais simuladas
- `/cliente` — favoritos persistidos, histórico, check-ins e notificações demonstrativas
- `/dashboard` — estatísticas, perfil, fotos e respostas mockadas
- `/como-funciona` — regras e critérios da plataforma

## Dados e integrações

O conteúdo de exemplo está em `lib/barbers.ts`. A Badge of Honour é derivada automaticamente quando a nota média é pelo menos 9,5 e há pelo menos 15 avaliações. Favoritos, check-ins e onboarding usam `localStorage`. Login, envio de avaliações, reservas, edição, mensagens e upload são demonstrativos; não há autenticação nem backend. As imagens vêm do Unsplash e precisam de conexão com a internet.

## Segurança

O projeto mantém Next.js 14.2.35 para respeitar a stack solicitada. `npm audit` reporta avisos de segurança nessa versão e em uma dependência transitiva; revise as atualizações recomendadas antes de publicar uma implantação acessível ao público.
