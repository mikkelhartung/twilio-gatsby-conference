import React, { useState, useEffect, useRef } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import StartForm from "../components/StartForm"
import TwilioVideo from "twilio-video"
import { useNetlifyIdentity } from "react-netlify-identity-widget"
import IdentityModal from "react-netlify-identity-widget"

/**
 * TO DO:
 *  1. Show local video
 *  2. Connect to room
 *  3. Show participants
 *  4. Handle events
 **/

const Video = ({ token }) => {
  const localVidRef = useRef()
  const remoteVidRef = useRef()

  useEffect(() => {
    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })

        const addParticipant = participant => {
          console.log("new participant!")
          console.log(participant)
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track

              remoteVidRef.current.appendChild(track.attach())
              console.log("attached to remote video")
            }
          })

          participant.on("trackSubscribed", track => {
            console.log("track subscribed")
            remoteVidRef.current.appendChild(track.attach())
          })
        }

        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
      }
    )
  }, [token])

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const identity = useNetlifyIdentity(
    "https://gatsby-netlify-identity-functions.netlify.com"
  )
  return (
    <Layout>
      <SEO title="Home" />
      {identity && identity.user ? (
        !token ? (
          <StartForm storeToken={setToken} />
        ) : (
          <Video token={token} />
        )
      ) : (
        <button onClick={() => setShowDialog(true)}>Log In</button>
      )}

      <IdentityModal
        showDialog={showDialog}
        onCloseDialog={() => setShowDialog(false)}
      />
    </Layout>
  )
}

export default IndexPage
