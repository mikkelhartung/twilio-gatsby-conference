import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { useNetlifyIdentity } from "react-netlify-identity-widget"
import IdentityModal from "react-netlify-identity-widget"
import StartForm from "../components/StartForm"
import Video from "../components/Video"

/**
 * TO DO:
 *  1. Show local video
 *  2. Connect to room
 *  3. Show participants
 *  4. Handle events
 **/

const IndexPage = () => {
  const [token, setToken] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const identity = useNetlifyIdentity("https://camtion.netlify.com")
  return (
    <Layout>
      <SEO title="Home" />
      {identity &&
        identity.user &&
        (!token ? (
          <StartForm storeToken={setToken} />
        ) : (
          <div>
            <Video token={token} />
          </div>
        ))}

      <IdentityModal
        showDialog={showDialog}
        onCloseDialog={() => setShowDialog(false)}
      />
      {identity && !identity.user && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <button className="btn__rounded" onClick={() => setShowDialog(true)}>
            Log In
          </button>
        </div>
      )}
    </Layout>
  )
}

export default IndexPage
