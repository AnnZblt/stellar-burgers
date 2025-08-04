describe('Страница конструктора', () => {
  beforeEach(() => {
    // ингредиенты
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    // лента заказов
    cy.intercept('GET', '**/orders/all', {
      fixture: 'orders-all.json'
    }).as('getOrdersAll');
    // авторизация пользователя
    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    // домашняя страница
    cy.visit('/');
    // ждет получения ингредиентов
    cy.wait('@getIngredients');
    // ждет заказы для ленты
    cy.wait('@getOrdersAll');
    // ждет пользователя
    cy.wait('@getUser');
  });

  it('Добавляет булочку и ингредиент в конструктор', () => {
    // добавляет булочку
    cy.get('[data-ingredient-type="bun"]').first().as('bunIngredient');
    cy.get('@bunIngredient').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    // добавляет начинку из основного
    cy.get('[data-ingredient-type="main"]')
      .not('[data-ingredient-type="bun"]')
      .first()
      .as('otherIngredient');
    cy.get('@otherIngredient').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    // добавляет начинку из соусов
    cy.get('[data-ingredient-type="sauce"]')
      .not('[data-ingredient-type="bun"]')
      .first()
      .as('otherIngredient');
    cy.get('@otherIngredient').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    // проверяет, добавилась ли булочка(2 раза: вверх и вниз)
    cy.get('[data-testid="constructor-ingredient-bun"]').should('exist');
    cy.get('[data-testid="constructor-ingredient-bun"]').should(
      'have.length',
      2
    );

    // проверяет, что одна начинка и один соус добавлены (общая длина 2)
    cy.get('[data-testid="constructor-ingredient-other"]').should(
      'have.length',
      2
    );

    // проверяет, что итоговая цена больше 0
    cy.get('[data-testid="total-price"]')
      .invoke('text')
      .then((text) => {
        const price = parseInt(text, 10);
        expect(price).to.be.greaterThan(0);
      });
  });

  it('Открывает модалку с информацией об ингредиенте и закрывает ее', () => {
    // находит 1й ингредиент типа main
    cy.get('[data-ingredient-type="main"]').first().as('ingredient');

    // достает значение data-ingredient-name
    cy.get('@ingredient')
      .invoke('attr', 'data-ingredient-name')
      .then((ingredientName) => {
        cy.get('@ingredient').find('[data-testid="ingredient-link"]').click();

        // проверяет, что модалка открылась и содержит имя нужного ингредиента
        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="ingredient-name"]').should(
          'contain',
          ingredientName
        );
      });

    // закрывает модалку через крестик
    cy.get('[data-testid="modal-close"]').click();

    // проверяет, что модалка исчезла
    cy.get('[data-testid="modal"]').should('not.exist');

    // то же самое, но с булкой
    cy.get('[data-ingredient-type="bun"]').first().as('ingredient');

    cy.get('@ingredient')
      .invoke('attr', 'data-ingredient-name')
      .then((ingredientName) => {
        cy.get('@ingredient').find('[data-testid="ingredient-link"]').click();

        cy.get('[data-testid="modal"]').should('exist');
        cy.get('[data-testid="ingredient-name"]').should(
          'contain',
          ingredientName
        );
      });

    // закрывает модалку через клик на оверлей(клик не в центре экрана, а слева сверху)
    cy.get('[data-testid="modal-overlay"]').click('topLeft', {
      force: true
    });

    // проверяет, что модалка исчезла
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('Отправляет заказ, проверяет соответствие номера заказа и очищает конструктор', () => {
    // загружает мок c order response из фикстур
    cy.fixture('order-response.json').then((orderResponse) => {
      cy.intercept('POST', '**/orders', {
        statusCode: 200,
        body: orderResponse,
        delayMs: 700
      }).as('postOrder');

      // устанавливает токены
      window.localStorage.setItem('refreshToken', 'Refresh-token');
      cy.setCookie('accessToken', 'Bearer-access-token');

      // добавляет ингредиенты в конструктор
      cy.get('[data-ingredient-type="bun"]')
        .first()
        .within(() => {
          cy.contains('button', 'Добавить').click();
        });
      cy.get('[data-ingredient-type="main"]')
        .first()
        .within(() => {
          cy.contains('button', 'Добавить').click();
        });
      cy.get('[data-ingredient-type="sauce"]')
        .first()
        .within(() => {
          cy.contains('button', 'Добавить').click();
        });

      // кликает на кнопку "Оформить заказ"
      cy.get('[data-testid="order-button"]').click();

      // видит прелодер и модалку с текстом "оформляем заказ"
      cy.get('[data-testid="modal"]').within(() => {
        cy.contains('Оформляем заказ...').should('exist');
        cy.get('[data-testid="preloader"]').should('exist');
      });

      // дожидается запроса
      cy.wait('@postOrder');

      // ждет, пока прелодер и текст пропадут
      cy.get('[data-testid="modal"]').within(() => {
        cy.contains('Оформляем заказ...').should('not.exist');
        cy.get('[data-testid="preloader"]').should('not.exist');
      });

      // проверяет, что появилась модалка и в ней номер заказа отображается из фикстуры
      cy.get('[data-testid="modal"]').should('exist');
      cy.get('[data-testid="order-number"]').should(
        'contain.text',
        orderResponse.order.number
      );

      // закрывает модалку
      cy.get('[data-testid="modal-close"]').click();

      //проверяет, что конструктор пуст
      cy.get('[data-testid="constructor-ingredient-bun"]').should('not.exist');
      cy.get('[data-testid="constructor-ingredient-other"]').should(
        'not.exist'
      );

      // чистит токены
      cy.clearCookies();
      cy.clearLocalStorage();
    });
  });
});
