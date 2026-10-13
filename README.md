# Cida Flores Recife

Landing page editorial em React 19, TypeScript strict, Vite e CSS Modules. Projeto local, sem rastreamento, formulário ou dados comerciais inventados.

```sh
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

O build está em `dist/`. Para validar as interações e as oito larguras solicitadas: `npx playwright install chromium` e `npm test`. Capturas ficam em `artifacts/`.

## Configuração antes de publicar

Em `src/config/site.ts`, preencher `whatsapp` com o número confirmado, somente dígitos, incluindo país e DDD. Enquanto vazio ou inválido, os pedidos levam à seção Contato, que orienta a consultar a ficha no Google Maps. Confirmar o endereço e então definir `addressConfirmed: true`; só nesse caso o endereço entra no Schema.org. Definir `canonical` com a URL HTTPS definitiva. O enquadramento do Hero é configurável para desktop e mobile.

Substituir as imagens ilustrativas por fotografias aprovadas da floricultura mantendo os nomes em `public/images/`, com variantes de 1536 e 640 pixels. As fotografias atuais não representam produtos disponíveis. Os originais estão em `assets/originals/`. O script `node scripts/assets.mjs` reproduz as variantes iniciais a partir do Hero original e das fotografias de inspiração. Ele sobrescreve as variantes e não deve ser executado depois de substituir as fotos por imagens próprias.

O Hero foi criado pela ferramenta ImageGen integrada. Prompt: fotografia editorial original, buquê volumoso de rosas rosadas, lisianthus creme, flores amarelas suaves e folhagens, segurado por uma mão, céu azul suave, espaço à esquerda para tipografia, luz natural, sem textos ou marcas. Arquivo final: `public/images/hero-buque.webp`. As demais fotografias são referências do Unsplash; fontes em `assets/SOURCES.md`. A galeria reúne seis fotografias reais de inspiração, sem afirmar que são trabalhos da Cida Flores.

Fontes Cormorant Garamond e DM Sans são servidas localmente por @fontsource, com font-display swap. Licenças acompanham os pacotes. Não há dependências de animação ou mapa externo na carga inicial.

## Produção e segurança

Servir `dist/` por HTTPS. O plugin Vite insere Schema.org, canonical e `og:url` no HTML estático do build. Quando o domínio estiver configurado em `site.ts`, `og:image` também recebe uma URL absoluta.

Headers sugeridos no provedor:

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

Usar HSTS apenas após assegurar HTTPS em todos os subdomínios. Para provedores com CSP restrita a scripts, permitir o JSON-LD por hash quando necessário. Não aplicar a política de produção ao servidor Vite de desenvolvimento.

O bloco de localização é uma ilustração, não um mapa geográfico; o link abre a localização fornecida no briefing. Não há telefone, horários, preços, estoque, entrega ou avaliações presumidos.
