# 🚀 Agência Métrica - Landing Page

<div align="center">

![Agência Métrica](https://img.shields.io/badge/Agência-Métrica-1045D9?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Landing Page de Alta Conversão para Agência de Tráfego Pago**

[Ver Demo](https://agencia-metrica.vercel.app/) • [Reportar Bug](https://github.com/laranjaeragnarok2/agencia-metrica/issues)

</div>

---

## 📋 Sobre o Projeto

Landing page profissional desenvolvida para a **Agência Métrica**, especializada em tráfego pago para negócios locais. O projeto foi construído com foco em **alta conversão**, **performance** e **design premium**.

### 🎯 Objetivo

Converter visitantes em leads qualificados através de uma experiência visual impactante e copywriting estratégico focado em resultados reais para negócios locais.

---

## ✨ Funcionalidades

### Design & UX
- ✅ **Design Dark Mode Premium** - Interface moderna com gradientes sutis
- ✅ **Ícones SVG Customizados** - Heroicons integrados sem dependências externas
- ✅ **Efeitos Glassmorphism** - Cards com backdrop-blur elegantes
- ✅ **Hover Effects Premium** - Animações sutis em todos os elementos interativos
- ✅ **Glow Effects** - Iluminação ambiente nos componentes principais
- ✅ **100% Responsivo** - Layout otimizado para Mobile, Tablet e Desktop
- ✅ **Mobile-First** - Textos e elementos otimizados para telas pequenas

### Conversão
- ✅ **CTAs Estratégicos** - Botões de WhatsApp em pontos-chave da jornada
- ✅ **Copywriting Focado** - Textos baseados em metodologia de vendas
- ✅ **Seção de Nichos** - Destaque para Restaurantes/iFood e Garagens/Veículos
- ✅ **Seção de Portfólio** - Grid para imagens e vídeos
- ✅ **Seção de Resultados** - Espaço para prints de campanhas reais
- ✅ **Prova Social** - Estrutura para depoimentos e cases

### Técnico & Performance
- ✅ **Meta Tags SEO** - Otimizado para buscadores
- ✅ **Open Graph Tags** - Preview otimizado para redes sociais
- ✅ **Twitter Cards** - Compartilhamento premium no Twitter/X
- ✅ **Preload de Fontes** - Carregamento assíncrono para melhor performance
- ✅ **Smooth Scroll** - Navegação suave entre seções
- ✅ **Header Fixo** - Navegação sempre acessível

### Acessibilidade
- ✅ **Skip Link** - Pular para conteúdo principal
- ✅ **ARIA Labels** - Em todos os elementos interativos
- ✅ **Roles Semânticos** - banner, navigation, main
- ✅ **Color Scheme** - Dark mode nativo
- ✅ **Contraste Adequado** - Textos legíveis

---

## 🏗️ Estrutura do Projeto

```
agencia-metrica/
├── public/
│   └── vite.svg
├── src/
│   ├── main.ts          # Lógica de interações (scroll, header)
│   └── style.css         # Estilos Tailwind + customizações
├── index.html            # Estrutura HTML completa
├── vite.config.ts        # Configuração do Vite + Tailwind
├── tsconfig.json         # Configuração TypeScript
├── package.json          # Dependências do projeto
└── README.md             # Este arquivo
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Vite** | 7.x | Build tool ultra-rápido |
| **TypeScript** | 5.x | Tipagem estática para JavaScript |
| **Tailwind CSS** | 4.x | Framework CSS utility-first |
| **Inter Font** | - | Tipografia moderna do Google Fonts |

---

## 📄 Seções da Landing Page

### 1. Hero Section
- Headline de impacto focada em resultados
- Badge de especialização
- CTA principal para WhatsApp
- Logo/Brand showcase com glow effect

### 2. Problema + Identificação
- Três cards destacando dores do cliente
- Frase de fechamento impactante: "Estratégia paga."

### 3. Posicionamento
- Seção "Dados, não achismo"
- Números grandes: 100% baseado em dados / 0% achismo
- Background em azul da marca com pattern grid

### 4. Serviços
- Card principal: Tráfego Pago (Google Ads, Meta Ads)
- Cards secundários: Mídias Sociais e Identidade Visual
- CTA secundário

### 5. 🆕 Nichos de Atuação
- **Restaurantes & Delivery** - Estratégias para iFood, Rappi e delivery próprio
- **Garagens & Veículos** - Leads qualificados para revendas e concessionárias
- CTA específico para nichos

### 6. Portfólio
- Grid 2x3 no mobile, 3x2 no desktop
- Suporte para imagens e vídeos
- Hover effect com overlay

### 7. Método Métrica
- 4 etapas visuais: Diagnóstico → Estratégia → Execução → Otimização
- Cards com efeito glow no hover

### 8. Resultados Reais
- 3 placeholders para prints de campanhas
- Estrutura pronta para inserir provas sociais

### 9. CTA Final
- Seção de fechamento com headline forte
- Botão de ação principal com glow

### 10. Footer
- Informações da empresa
- Links para WhatsApp e Instagram

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/laranjaeragnarok2/agencia-metrica.git

# Entrar no diretório
cd agencia-metrica

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 🌐 Deploy

O projeto está configurado para deploy automático na **Vercel**.

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Configurações Vercel
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

---

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| **Primary** | `#1045D9` | Cor principal da marca, CTAs, destaques |
| **Dark** | `#0a0a0a` | Background principal |
| **Light** | `#ffffff` | Texto principal, elementos claros |
| **Gray** | `#8a8a8a` | Texto secundário |
| **Red** | `#ef4444` | Destaque iFood/Delivery |

### Gradiente de Fundo
```css
background: linear-gradient(180deg, 
  #0a0a0a 0%, 
  #0d1117 25%,
  #0f1620 50%,
  #0d1117 75%,
  #0a0a0a 100%
);
```

---

## 📱 Responsividade

| Breakpoint | Largura | Adaptações |
|------------|---------|------------|
| Mobile | < 640px | Layout single column, textos maiores |
| SM | 640px+ | Grid 2 colunas, botões inline |
| MD | 768px+ | Grid adaptativo |
| LG | 1024px+ | Layout completo, navegação visível |

---

## ⚡ Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Bundle Size**: ~50KB (gzipped)

### Otimizações Aplicadas
- Preload de fontes com fallback noscript
- Carregamento assíncrono de CSS
- Imagens com lazy loading
- SVGs inline (sem requisições extras)

---

## 🔧 Customização

### Alterar Cor Principal
Edite `src/style.css`:
```css
@theme {
  --color-primary: #SUA_COR_AQUI;
}
```

### Alterar WhatsApp
Busque e substitua `seunumeroaqui` em `index.html` pelo número real.

### Adicionar Prints de Resultados
Substitua os placeholders na seção "Resultados Reais" por imagens reais de campanhas.

### Adicionar Portfólio
Substitua os placeholders na seção "Nosso Trabalho" por imagens e vídeos reais.

---

## 📞 Contato

**Desenvolvido para**: Agência Métrica  
**Website**: [agencia-metrica.vercel.app](https://agencia-metrica.vercel.app/)

---

## 📜 Licença

Este projeto é proprietário. Todos os direitos reservados.

---

<div align="center">

**Feito com 💙 para negócios que querem resultados reais.**

</div>
