import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { css, cx } from 'emotion'

const Header = ({ siteTitle }) => (
  <header
    className={css`
    background: #bf5c3c;
    margin-bottom: 1.45rem;
    `}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
            fontWeight:100,
            textTransform: 'uppercase'

          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p className={css`
        color: #fff;
        font-family: sans-serif;
        font-size: 16px;

      `}>
        Asian cuisine in the heart of Woodland Park Colorado.
      </p>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
