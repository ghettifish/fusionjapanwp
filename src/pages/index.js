import React, { useState, forwardRef } from "react"
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from "../components/layout"
import SEO from "../components/seo"
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
        <li css={liStyle}><a
          role="button"
          onKeyDown={allItems}
          href="#!"
          css={link} onClick={allItems}>All Items</a></li>
        {data.allContentfulMenuCategory.nodes.map(x => {
          let styles = [link];
          if (categories.map(x => x.categoryName).includes(x.categoryName)) styles = [link, linkActive]

          return (
            <li key={x.id} css={liStyle}>
              <a role="button"
                tabIndex={0}
                css={styles}
                onClick={() => flip(x)}
                onKeyDown={() => flip(x)}
                href="#!"
              >
                {x.categoryName}
              </a>
            </li>
          )
        }
        )
        }
      </ul>
      <div>
        <FlipMove>
          {categories.map(x => (
            <div key={x.id}>
              <Category data={data} category={x} />
            </div>
          ))
          }
        </FlipMove>
      </div>
      <Sushi />
    </Layout>
  )
}


const Category = forwardRef(({ category, data }, ref) => {

  // const [mainMenuItems, setMainMenuItems] = useState(data.allContentfulMainMenuItems.nodes);

  const mainMenuItems = data.allContentfulMainMenuItems.nodes;
  const wrapperStyle = css`
  padding: 30px 0; 
  `;
  if (mainMenuItems.filter(y => y.menuCategory && y.menuCategory.categoryName === category.categoryName).length > 0) {
    return (
      <div css={wrapperStyle} ref={ref}>
        <MenuTitle title={category.categoryName} subtitle={category.description && category.description.description} />
        <FlipMove>
          {mainMenuItems.filter(y => y.menuCategory && y.menuCategory.categoryName === category.categoryName).map(x => (
            <MenuItem key={x.id} id={x.id} name={x.name} description={x.description.description} spicy={x.spicy} />
          ))
          }
        </FlipMove>
      </div>
    )
  } else {
    return (
      <p css={wrapperStyle}>No items match this category. This menu is still a work in progress  <span role="img" aria-label="Hands up emoji">🤷‍♂️</span></p>
    )
  }
})

const MenuItem = forwardRef(({ id, name, description, spicy }, ref) => (
  <div key={id} css={css`
  padding: 10px;
`} ref={ref}>
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
))

const MenuTitle = ({ title, subtitle }) => (
  <div css={css`
  margin-bottom: 50px;
  `}>
    <h3 css={css`
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 100;
    margin-bottom: 5px;
    `}>{title}</h3>
    <p css={css`
  font-size: 14px;
  `}>{subtitle}</p>
  </div>
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
        description{
          description
        }
        id
      } 
    }
  }

`

export default IndexPage
