import React, { useEffect, useRef } from "react"
import TwilioVideo from "twilio-video"

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
    <div className="flex">
      <div className="left">
        <div ref={localVidRef} />
      </div>
      <div className="right">
        <div ref={remoteVidRef} />
      </div>
    </div>
  )
}

export default Video
