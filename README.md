# Oratória · Da ideia à presença

Plataforma de preparação de palestras e curso de oratória e storytelling, em português.

**Endereço:** https://ernandes-sobreira.github.io/curso-oratoria/

## Recursos da versão 2

- Importação local de PPTX/PPSX: ordem real dos slides, textos, notas, links e cache numérico de gráficos; arquivos de até 30 MB e 150 slides.
- Destaques descritivos dos valores dos gráficos, sem substituir valores ausentes por zero.
- Estúdio com mensagem, público, evidência/fonte, importância, limites, transição e roteiro por slide.
- Pontes temáticas com trechos de origem. São sugestões de organização, não comprovação de relações estatísticas ou causais.
- Curso autoral com 20 aulas, teoria, exemplos rotulados, práticas, pergunta de compreensão, modelos editáveis e critérios de autoavaliação. Carga sugerida de 20h incluindo prática; não são 20h de vídeo nem certificação externa.
- Ensaio com cronômetro, gravação local de áudio quando suportada, autoavaliação e histórico. A gravação é baixada separadamente e não persiste ao fechar a aba.
- Backup e restauração com prévia, download do estado anterior e preservação dos registros da versão 1 no mesmo navegador/origem.
- Exportação de roteiro em TXT e impressão/salvamento em PDF pelo navegador.

## Limites explícitos

Esta versão não usa IA generativa, não faz OCR de imagens, não renderiza fielmente o layout de cada slide e não pesquisa/verifica fontes externas. As referências extraídas são afirmações do arquivo. Valores de gráficos são o cache salvo no PPTX e podem estar desatualizados em relação à planilha. Objetos incorporados, vídeos, animações e alguns diagramas não são interpretados. Arquivos .ppt binários devem ser convertidos para .pptx no PowerPoint ou LibreOffice. Arquivos protegidos por senha não são lidos.

As conexões temáticas são baseadas em palavras compartilhadas; os trechos originais estão disponíveis para revisão. A comparação numérica se limita a mínimo/máximo dos valores armazenados da mesma série e informa categorias ausentes. Não realiza correlações, testes de significância ou inferência causal.

## Dados e segurança

Não há servidor de aplicação, credenciais de API, rastreamento ou upload do conteúdo. Todos os recursos executáveis são locais. Links externos só são acessados por decisão do usuário. JSZip 3.10.1 está incluído em `assets/vendor`, com licença. A importação aplica limites de arquivo, entradas e tamanho descompactado, inclusive durante a leitura de partes. DTD/entidades XML são rejeitados. Conteúdo externo do PPTX não é executado ou buscado. Dados dinâmicos são escapados antes de inserir HTML. Backups são normalizados com lista de campos permitidos.

O armazenamento usa `localStorage`, disponível somente no dispositivo/navegador/origem atual. Alertas de falha de persistência orientam a exportar backup. `curso_oratoria_state_v1` preserva as aulas anteriores; `curso_oratoria_original_v1` guarda uma cópia anterior à primeira gravação; o estúdio usa `curso_oratoria_studio_v2`. Imagens extraídas existem somente na sessão de importação. Em máquina compartilhada, remova a apresentação após exportar seu trabalho.

## Edição e publicação

Site estático publicado pelo GitHub Pages, na branch `main`, sem etapa de build.

- `index.html`: estrutura acessível e política de conteúdo.
- `assets/app.js`: interface, persistência, curso e ensaio.
- `assets/presentation.js`: leitura de PPTX, análise estrutural e destaques descritivos.
- `assets/course.json` / `assets/course-data.js`: mesma versão do conteúdo; o JS permite carregar sem fetch.
- `scripts/enrich-course.py`: fonte autoral das expansões, exemplos, exercícios e critérios. Atualiza JSON e JS.

## Verificação

Requer Node.js 22+ e Python com `python-pptx`.

```sh
npm install
python3 -m pip install -r requirements-dev.txt
npm test
```

Testes usam uma apresentação **sintética**, sem resultados científicos reais. Cobrem ordem diferente dos nomes XML, notas, valores zero/ausente, slides ocultos, bloqueio de XML inseguro, migração, 20 aulas, conclusão, edição, escape de HTML, backup, quota local e DOM. Não substituem conferência visual nem teste de microfone físico. A validação inicial desta versão não incluiu navegador gráfico porque esse recurso não estava disponível no ambiente de edição.

Fontes complementares: Toastmasters (preparação/ensaio), COMPASS (público e relevância) e Microsoft Open XML (formato). Os materiais externos pertencem às respectivas organizações; o curso não reproduz seus manuais.
