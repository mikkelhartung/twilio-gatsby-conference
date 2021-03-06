import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import {
  useNetlifyIdentity,
  IdentityContextProvider,
} from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const identity = useNetlifyIdentity("https://camtion.netlify.com")

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <IdentityContextProvider value={identity}>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div style={{}}>
            <main>{children}</main>
            <footer></footer>
          </div>
        </IdentityContextProvider>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
