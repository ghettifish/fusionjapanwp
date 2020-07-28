import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
  import { css, cx } from 'emotion'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Chili from "../components/chili"

const IndexPage = ({ data }) => (
  <Layout>
    <div>
      {data.allContentfulMenuCategory.nodes.map(x => (
        <div key={x.id}>
          <Category data={data} name={x.categoryName} />
        </div>
      ))
      }
    </div>
  </Layout>
)

const Category = ({ name, data }) => {
  if (data.allContentfulMainMenuItems.nodes.filter(y => y.menuCategory && y.menuCategory.categoryName === name).length > 0) {
    return (
      <div>
        <MenuTitle title={name}/>      
        {data.allContentfulMainMenuItems.nodes.filter(y => y.menuCategory && y.menuCategory.categoryName === name).map(x => (
          <MenuItem id={x.id} name={x.name} description={x.description.description} spicy={x.spicy} />
        ))
        }
      </div>
    )
  } else if(data.allContentfulSushi.nodes.filter(y => y.menuCategory === name).length > 0){
    return (
      <div>
        <MenuTitle title={name}/>      
        {data.allContentfulSushi.nodes.filter(y => y.menuCategory === name).map(x => (
          <MenuItem id={x.id} name={x.name} description={x.description.description} />
        ))
        }
      </div>
    )
  } else {
    return null
  }
}

const MenuItem = ({id, name, description, spicy}) => (
  <div key={id} className={css`
  padding: 10px;
`}>
  <h4 className={css`
  margin: 0;
  text-transform: uppercase;
  color: #c39b7e;
  display: inline;
`}>{name}{spicy && <Chili/>}</h4>

  <p className={css`
  margin: 0;
`}>{description}</p>
</div>
)

const MenuTitle = ({title}) => (
  <h3 className={css`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 100;
  margin-top: 50px;
  `}>{title}</h3>
)

export const query = graphql`
  query MyHomePageQuery {
    allContentfulSushi {
      nodes {
        name
        description {
          description
          id
        }
        menuCategory
      }
    }
    allContentfulMainMenuItems {
      nodes {
        id
        name
        spicy
        description {
          description
        }
        menuCategory {
          categoryName
        }
      }
    }
    allContentfulMenuCategory {
      nodes {
        categoryName
        id
      } 
    }
  }

`

export default IndexPage
