<<<<<<< HEAD
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
=======
const path = require('path');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const articles = await graphql(`
    {
      allNodeArticle {
        nodes {
          relationships {
            field_media_image {
              relationships {
                field_media_image {
                  id
                  localFile {
                    publicURL
                  }
                }
              }
              field_media_image {
                alt
              }
            }
          }
          path {
            alias
          }
          id
          title
        }
      }
    }
  `);
  // Handle errors
  // if (result.errors) {
  //   reporter.panicOnBuild(`Error while running GraphQL query.`)
  //   return
  // }

  // console.log(articles)
  articles.data.allNodeArticle.nodes.map(articleData =>
    createPage(
      {
        path: articleData.path.alias,
        component: path.resolve(`src/templates/article.js`),
        context: {
          ArticleId: articleData.id,
        },
      }
    )
  )
>>>>>>> a94ebf0 (Drupal site to Gatsby)
}
