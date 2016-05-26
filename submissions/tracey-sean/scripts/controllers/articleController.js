(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // When a read on is selected for a specific article, the whole article is displayed by calling articlesController.loadById function, which calls Article.findWhere and grabs the data based off of the ID parameter assigned to the Id of that article. After finding the data, it calls the categoryData function, which is created inside of articlesController.loadById, and assigns the article with this category to the object articles. The next function then calls on the next callback, articlesController.index and appends the data to the page.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //When a auther is selected in the dropdown on the page the articles with that author are displayed by calling articlesController.loadByAuthor function, which calls Article.findWhere and grabs the data based off of the author parameter assigned to the author selected. To put the authors name in the URL, it replaces spaces with a plus sign.
  //After finding the data, it calls the categoryData function, which is created inside of articlesController.loadByAuthor, and assigns the articles with this category to the object articles. The next function then calls on the next callback, articlesController.index and appends the data to the page.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //When a category is selected in the dropdown on the page the articles from that category are displayed by calling articlesController.loadByCategory function, which calls Article.findWhere and grabs the data based off of the category parameter assigned to the category selected. After finding the data, it calls the categoryData function, which is created inside of articlesController.loadByCategory, and assigns the articles with this category to the object articles. The next function then calls on the next callback, articlesController.index and appends the data to the page.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //The articlesController.loadAll function is called when the page is first loaded. It checks to see if there are any articles loaded. If the articles are loaded, it sets the Article.all to the current ctx object. And then calls the next function, which loads the data to the index page. If there is no data, the data is fetched using Article.fetchAll with a parameter of articleData, which is a function defined inside of articlesController.loadAll that sets the Article.all to the current ctx object that is fetched.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
