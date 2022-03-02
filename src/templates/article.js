import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const Article = ({ data }) => {
  const post = data.nodeArticle;
  return (
    <Layout>
      <h1>{post.title}</h1>
      <img
        src={
          post.relationships.field_media_image.relationships.field_media_image
            .localFile.publicURL
        }
        alt={post.relationships.field_media_image.field_media_image.alt}
      />
      <div dangerouslySetInnerHTML={{ __html: post.body.processed }} />
    </Layout>
  )
};

Article.propTypes = {
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query ($ArticleId: String!) {
    nodeArticle(id: { eq: $ArticleId }) {
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
      body {
        processed
      }
    }
  }
`

export default Article
