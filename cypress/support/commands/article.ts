import { Article } from '../../../src/entities/Article';

const defaultArticle = {
    title: '[TESTING] Test article title',
    subtitle: 'Test article subtitle',
    img: 'https://sun9-14.userapi.com/6jn5sgDf4SZ_H-aBePsO2qzEhi_xx9wZzfcTpw/Irvybcr5F2k.jpg',
    views: 1000,
    createdAt: '26.02.2022',
    userId: '1',
    type: ['BUSINESS'],
    blocks: [],
};

export const createArticle = (article?: Article) => {
    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/articles',
            headers: { Authorization: 'asdasd' },
            body: article ?? defaultArticle,
        })
        .then((resp) => resp.body);
};

export const removeArticle = (articleId: string) => {
    return cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: 'asdasd' },
    });
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>;
            removeArticle(articleId: string): Chainable<void>;
        }
    }
}
