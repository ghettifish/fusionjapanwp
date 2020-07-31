/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { css } from '@emotion/core'

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        css={css`
          position: relative;
          min-height: 100vh;
        `}
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main css={css`
        padding-bottom: 2.5rem;
        `}>{children}</main>
        <footer css={css`
          font-size: 12px;
          position: absolute;
          bottom: 0;
          width:100%;
          height: 2.5rem;            /* Footer height */

        `}>
          © {new Date().getFullYear()}, Built by Nic Bovee your #1 fan.
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
