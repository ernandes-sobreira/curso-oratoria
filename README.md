# Oratória · Da ideia à presença

Plataforma de preparação de palestras e curso de oratória e storytelling, em português.

**Endereço:** https://ernandes-sobreira.github.io/curso-oratoria/

## Recursos da versão 2.1

- Importação local de PPTX/PPSX/POTX e variantes com macros: ordem real dos slides, textos, notas, links e cache numérico de gráficos. Macros não são executadas.
- Leitura de PDF com texto, DOCX/DOTX/DOCM/DOTM, HTML/HTM, ODT/ODP, XLSX/XLTX/XLSM, TXT, Markdown, CSV, TSV e JSON. Arquivos de até 30 MB, 150 páginas/slides/trechos e 1 milhão de caracteres extraídos. Documentos longos são divididos em trechos.
- PDF.js 6.4.299 incluído localmente e carregado apenas ao importar PDF. Páginas sem texto são identificadas; PDFs digitalizados precisam de OCR externo.
- Diagnóstico de palavras recorrentes, expressões repetidas, possíveis vícios de linguagem, jargões de um vocabulário de referência e termos personalizados. Cada achado mostra contagem e até três exemplos do próprio texto, com orientações de revisão.
- Transcrição opcional de ensaio em português pela API SpeechRecognition do navegador. Também aceita fala transcrita colada. A interface distingue roteiro escrito, transcrição não conferida e transcrição revisada.
- Diagnóstico exportável em TXT e salvo como resumo no registro de ensaio. A transcrição atual e os termos personalizados entram no backup.
- Destaques descritivos dos valores dos gráficos, sem substituir valores ausentes por zero.
- Estúdio com mensagem, público, evidência/fonte, importância, limites, transição e roteiro por slide.
- Pontes temáticas com trechos de origem. São sugestões de organização, não comprovação de relações estatísticas ou causais.
- Curso autoral com 20 aulas, teoria, exemplos rotulados, práticas, pergunta de compreensão, modelos editáveis e critérios de autoavaliação. Carga sugerida de 20h incluindo prática; não são 20h de vídeo nem certificação externa.
- Ensaio com cronômetro, gravação local de áudio quando suportada, autoavaliação e histórico. A gravação é baixada separadamente e não persiste ao fechar a aba.
- Backup e restauração com prévia, download do estado anterior e preservação dos registros da versão 1 no mesmo navegador/origem.
- Exportação de roteiro em TXT e impressão/salvamento em PDF pelo navegador.

## Limites explícitos

Esta versão não usa IA generativa, não faz OCR de imagens, não renderiza fielmente o layout de cada slide e não pesquisa/verifica fontes externas. As referências extraídas são afirmações do arquivo. Valores de gráficos são o cache salvo no PPTX e podem estar desatualizados em relação à planilha. Objetos incorporados, vídeos, animações e alguns diagramas não são interpretados. Arquivos .ppt, .doc e .xls binários devem ser convertidos para formatos atuais ou PDF com texto. Modelos POTX apenas com layouts precisam de slides com conteúdo. Word: conteúdo principal e texto de tabelas; não extrai cabeçalhos, comentários e notas de rodapé. Planilhas: valores salvos e endereços das células; não recalcula fórmulas, não aplica formatação de datas. HTML é extraído de um template inerte, sem executar código ou carregar recursos. Não há renderização completa de páginas HTML, planilhas ou PDFs. Arquivos protegidos por senha não são lidos.

As conexões temáticas são baseadas em palavras compartilhadas; os trechos originais estão disponíveis para revisão. A comparação numérica se limita a mínimo/máximo dos valores armazenados da mesma série e informa categorias ausentes. Não realiza correlações, testes de significância ou inferência causal.

## Dados e segurança

Não há servidor de aplicação, credenciais de API ou rastreamento. Documentos, gravação pelo MediaRecorder e análise textual são locais. **Exceção opcional:** a transcrição ao vivo usa o serviço do navegador, que pode enviar áudio a servidores externos. Ela exige uma escolha explícita na interface antes de iniciar. Todos os recursos executáveis da plataforma são locais. Links externos só são acessados por decisão do usuário. JSZip 3.10.1 e PDF.js 6.4.299 estão incluídos em `assets/vendor`, com licenças. PDF.js: distribuição legacy minificada, pacote `pdfjs-dist@6.4.299` (npm), arquivos `legacy/build/pdf.min.mjs` e `legacy/build/pdf.worker.min.mjs`. A importação aplica limites de arquivo, entradas e tamanho descompactado, inclusive durante a leitura de partes. DTD/entidades XML são rejeitados. Conteúdo externo do PPTX não é executado ou buscado. Dados dinâmicos são escapados antes de inserir HTML. Backups são normalizados com lista de campos permitidos.

O reconhecimento pode omitir hesitações e repetições: o usuário deve conferir a transcrição com o áudio. A ferramenta conta texto, não mede entonação, pausas ou volume, e não aplica nota automática. Palavras de conteúdo são listadas a partir de 3 ocorrências; expressões de 2 a 5 palavras, a partir de 2. Listas têm limites de exibição. Jargões vêm de uma lista explícita, ampliável pelo usuário; não é detecção semântica universal.

O armazenamento usa `localStorage`, disponível somente no dispositivo/navegador/origem atual. Alertas de falha de persistência orientam a exportar backup. `curso_oratoria_state_v1` preserva as aulas anteriores; `curso_oratoria_original_v1` guarda uma cópia anterior à primeira gravação; o estúdio usa `curso_oratoria_studio_v2`. Imagens extraídas existem somente na sessão de importação. Em máquina compartilhada, remova a apresentação após exportar seu trabalho.

## Edição e publicação

Site estático publicado pelo GitHub Pages, na branch `main`, sem etapa de build.

- `index.html`: estrutura acessível e política de conteúdo.
- `assets/app.js`: interface, persistência, curso e ensaio.
- `assets/presentation.js`: leitura de PowerPoint, análise estrutural e destaques descritivos.
- `assets/documents.js`: identificação por conteúdo, adaptadores de documentos e PDF sob demanda.
- `assets/speech.js`: contagens, vocabulário explícito e ciclo de transcrição sem duplicar resultados provisórios.
- `assets/speech-ui.js`: diagnóstico, revisão da transcrição e exportação.
- `assets/course.json` / `assets/course-data.js`: mesma versão do conteúdo; o JS permite carregar sem fetch.
- `scripts/enrich-course.py`: fonte autoral das expansões, exemplos, exercícios e critérios. Atualiza JSON e JS.

## Verificação

Requer Node.js 22+ e Python com `python-pptx`.

```sh
npm install
python3 -m pip install -r requirements-dev.txt
npm test
```

Testes usam documentos **sintéticos**, sem resultados científicos reais. Cobrem POTX, HTML inerte, DOCX com tabela, ODT/ODP, XLSX com zero e valor ausente, PDF com texto e página vazia, formatos textuais, erros de tipo/tamanho, contagens de linguagem, transcrição simulada (final/provisória/permissão), troca de origem, invalidação do resultado, histórico e restauração. O teste de PDF no Node usa `@napi-rs/canvas`; não é uma dependência carregada pelo site. Cobrem ordem diferente dos nomes XML, notas, valores zero/ausente, slides ocultos, bloqueio de XML inseguro, migração, 20 aulas, conclusão, edição, escape de HTML, backup, quota local e DOM. Não substituem conferência visual nem teste de microfone físico. A validação inicial desta versão não incluiu navegador gráfico porque esse recurso não estava disponível no ambiente de edição.

Documentação técnica: [SpeechRecognition (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), [resultados de transcrição (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognitionEvent/results) e [PDF.js](https://mozilla.github.io/pdf.js/).

Fontes complementares: Toastmasters (preparação/ensaio), COMPASS (público e relevância) e Microsoft Open XML (formato). Os materiais externos pertencem às respectivas organizações; o curso não reproduz seus manuais.
