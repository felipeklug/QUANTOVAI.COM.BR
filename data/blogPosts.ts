import { faker } from '@faker-js/faker/locale/pt_BR';

export interface BlogPost {
 id: string;
 slug: string;
 title: string;
 excerpt: string;
 content: string;
 imageUrl: string;
 authorName: string;
 authorAvatarUrl: string;
 publishedDate: string;
}

const createRandomPost = (): BlogPost => {
 const title = faker.lorem.sentence({ min: 5, max: 10 });
 return {
 id: faker.string.uuid(),
 slug: faker.helpers.slugify(title).toLowerCase(),
 title: title,
 excerpt: faker.lorem.paragraph({ min: 2, max: 4 }),
 content: `<p>${faker.lorem.paragraphs(8, '</p><p>')}</p><h2>${faker.lorem.sentence({ min: 4, max: 7 })}</h2><p>${faker.lorem.paragraphs(10, '</p><p>')}</p>`,
 imageUrl: faker.image.urlLoremFlickr({ category: 'building', width: 1280, height: 720 }),
 authorName: faker.person.fullName(),
 authorAvatarUrl: faker.image.avatar(),
 publishedDate: faker.date.past({ years: 1 }).toISOString(),
 };
};

export const blogPosts: BlogPost[] = Array.from({ length: 7 }, createRandomPost);

// Make the first post more relevant
blogPosts[0].title = '5 Dicas Essenciais para Comprar Piso Sem Erro';
blogPosts[0].slug = '5-dicas-comprar-piso-sem-erro';
blogPosts[0].excerpt = 'Comprar o piso certo pode ser uma tarefa complicada. Da escolha do material à quantidade, um erro pode custar caro. Confira nossas dicas para acertar na compra e evitar dores de cabeça na sua obra.';
blogPosts[0].imageUrl = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1280&auto=format&fit=crop';
blogPosts[0].content = `
 <p>A escolha do piso é uma das decisões mais importantes no design de interiores e na construção. Ele não só define a estética do ambiente, mas também precisa ser funcional e durável. Para ajudar você nessa jornada, compilamos 5 dicas essenciais.</p>
 <h3>1. Conheça os Tipos de Material</h3>
 <p>Existem dezenas de tipos de piso, cada um com suas vantagens. Porcelanatos são resistentes e versáteis, vinílicos são ótimos para conforto acústico e térmico, e laminados oferecem um bom custo-benefício. Pesquise qual se adapta melhor ao seu ambiente (cozinha, banheiro, quarto) e ao seu orçamento.</p>
 <h3>2. Calcule a Área com Margem de Segurança</h3>
 <p>Use uma calculadora online confiável (como a nossa!) para determinar a área total. É crucial adicionar uma margem de perda de 10% a 15%. Essa sobra é usada para recortes, cantos e possíveis peças que quebrem durante a instalação. É muito mais barato comprar algumas peças a mais no início do que ter que encontrar o mesmo lote meses depois.</p>
 <h3>3. Verifique o PEI (Resistência à Abrasão)</h3>
 <p>O índice PEI classifica a resistência do esmalte do piso ao desgaste. Para áreas de alto tráfego como salas e cozinhas, procure por PEI 4 ou 5. Para quartos, um PEI 3 pode ser suficiente. Banheiros, por terem menos tráfego de calçados, podem usar PEI 2 ou 3.</p>
 <h3>4. Compre Tudo do Mesmo Lote</h3>
 <p>Peças de cerâmica e porcelanato podem ter pequenas variações de tonalidade entre lotes de fabricação diferentes. Ao comprar, certifique-se de que todas as caixas pertencem ao mesmo lote. Essa informação geralmente está impressa na embalagem. Misturar lotes pode resultar em um piso manchado.</p>
 <h3>5. Contrate Mão de Obra Qualificada</h3>
 <p>De nada adianta comprar o melhor piso se a instalação for mal feita. Um profissional qualificado garantirá o nivelamento correto do contrapiso, o espaçamento adequado das juntas e os recortes precisos, resultando em um acabamento perfeito e duradouro.</p>
`;

// Delete the old PaintRollerIcon file as it's replaced
