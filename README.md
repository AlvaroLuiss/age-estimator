# Estimador de Idade

Uma aplicação web simples que estima a idade baseada em nomes usando a API agify.io.

## Descrição

Esta aplicação SvelteKit fornece uma interface limpa para consultar a API [agify.io](https://api.agify.io), que retorna estimativas de idade baseadas em nomes fornecidos. A aplicação possui busca em tempo real com debouncing e sincronização de URL para resultados compartilháveis.

## Funcionalidades

- Entrada de nome em tempo real com chamadas de API com debounce (delay de 500-1000ms)
- Sincronização de URL via parâmetros de consulta (ex: `?name=João`)
- Função `load()` do SvelteKit para requisições de API no servidor
- Estilização CSS customizada sem frameworks externos
- Saída HTML5 válida

## Stack Tecnológica

- **Framework**: SvelteKit (Svelte 4/5)
- **Estilização**: CSS puro (sem frameworks)
- **API**: [agify.io](https://agify.io/documentation)

## Uso

1. Digite um nome no campo de entrada de texto
2. Aguarde a chamada de API com debounce ser completada
3. Visualize o resultado da idade estimada
4. Compartilhe URLs com nomes incorporados para resultados consistentes

## Limitações da API

A API agify.io tem um limite de 100 requisições por dia. Use a aplicação moderadamente durante os testes.

## Desenvolvimento

Construído com a configuração padrão do SvelteKit. Nenhuma dependência adicional é necessária, exceto ao usar TypeScript ou JSDoc (modificações no package.json permitidas apenas para estes casos).

## Licença

Este projeto é para fins de demonstração.
