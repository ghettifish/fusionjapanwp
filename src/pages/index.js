import React, { useState } from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import { css, jsx } from '@emotion/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Chili from "../components/chili"
import FlipMove from "react-flip-move"
import Sushi from "../components/sushi"
const IndexPage = ({ data }) => {
  const [categories, setCategories] = useState(data.allContentfulMenuCategory.nodes);

  const allItems = () => {
    setCategories(data.allContentfulMenuCategory.nodes);
  }
  
  const flip = (category) => {
    setCategories([{ categoryName: category.categoryName, id: category.id }])
  }

  const link = css`
  text-decoration: none; 
  color: #8c8686;
  padding: 5px 15px !important;
  border: none;
  cursor: pointer;
  &:hover {
    background: #c39b7e;
    color: #fff;
    border-radius: 25px;
    text-decoration: underline;
  }

  `;

  const linkActive = css`
    background: #bf5c3c;
    color: #fff;
    border-radius: 25px;
    text-decoration: underline;
  `

  const liStyle = css`
  display: inline; 
  margin-right: 5px; 
  font-family: sans-serif;
  white-space: nowrap;
  `;
  return (

    <Layout>
      <SEO title="Fusion Japan Woodland Park Menu" description="Fan-made menu for Fusion Japan restaurant in Woodland Park Colorado" />
      <h3 css={css`
       text-transform: uppercase;
       letter-spacing: 3px;
       font-weight: 100;
       margin-top: 50px;`}>Sort menu by:</h3>
      <ul css={css`
      display: inline;
      list-style: none;
      margin-left: 0;
      font-size: 14px;
      line-height: 35px;
      @media (max-width:400px){
        overflow: scroll;
        width: 100vw;
        display: flex;
        margin-left: -15px;
        margin-bottom: 0;
      }

      `}>
        <li css={liStyle}><span css={link} onClick={allItems}>All Items</span></li>
        {data.allContentfulMenuCategory.nodes.map(x => {
          let styles = [link];
          if (categories.map(x => x.categoryName).includes(x.categoryName)) styles = [link, linkActive]

          return (
            <li css={liStyle}><span css={styles} onClick={() => flip(x)}>{x.categoryName}</span></li>
          )
        }
        )
        }
      </ul>
      <div>
        <FlipMove>
          {categories.map(x => (
            <div key={x.id}>
              <Category data={data} name={x.categoryName} />
            </div>
          ))
          }
        </FlipMove>
      </div>
      <Sushi />
    </Layout>
  )
}


const Category = ({ name, data }) => {

  const [mainMenuItems, setMainMenuItems] = useState(data.allContentfulMainMenuItems.nodes);
  const [sushi, setSushi] = useState(data.allContentfulSushi.nodes);
  const reverseMenuItems = () => {
    alert("clicked");
    setMainMenuItems(mainMenuItems.reverse())
  }
  const wrapperStyle = css`
  padding: 30px 0; 
  `;
  const reverseSushi = () => {
    alert("clicked");
    setSushi(sushi.reverse())
  }
  if (mainMenuItems.filter(y => y.menuCategory && y.menuCategory.categoryName === name).length > 0) {
    return (
      <div css={wrapperStyle}>
        <MenuTitle title={name} />
        <FlipMove>
          {mainMenuItems.filter(y => y.menuCategory && y.menuCategory.categoryName === name).map(x => (
            <MenuItem id={x.id} name={x.name} description={x.description.description} spicy={x.spicy} />
          ))
          }
        </FlipMove>
      </div>
    )
  } else if (sushi.filter(y => y.menuCategory === name).length > 0) {
    return (
      <div css={wrapperStyle}>
        <MenuTitle title={name} />
        <FlipMove>

          {sushi.filter(y => y.menuCategory === name).map(x => (
            <MenuItem id={x.id} name={x.name} description={x.description.description} />
          ))
          }
        </FlipMove>
      </div>
    )
  } else {
    return (
      <p css={wrapperStyle}>No items match this category. This menu is still a work in progress  🤷‍♂️</p>
    )
  }
}

const MenuItem = ({ id, name, description, spicy }) => (
  <div key={id} css={css`
  padding: 10px;
`}>
    <h4 css={css`
  margin: 0;
  text-transform: uppercase;
  color: #c39b7e;
  display: inline;
`}>{name}{spicy && <Chili />}</h4>

    <p css={css`
  margin: 0;
`}>{description}</p>
  </div>
)

const MenuTitle = ({ title }) => (
  <h3 css={css`
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 100;
  margin-bottom: 50px;
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
