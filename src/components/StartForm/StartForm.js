import React, { useState } from "react"
import axios from "axios"
import AbtionLogo from "../../images/logo_lgbt.png"

const StartForm = ({ storeToken }) => {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")

  const handleSubmit = async event => {
    event.preventDefault()

    const result = await axios({
      method: "POST",
      url: "https://pumpkin-cormorant-5767.twil.io/create-token",
      data: {
        identity: name,
      },
    })

    const jwt = result.data

    // TODO add error handling

    storeToken(jwt)
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} className="room-form">
        <img src={AbtionLogo} width="350" style={{ paddingBottom: "2rem" }} />
        <label htmlFor="name">
          <input
            placeholder="Display name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <label htmlFor="room">
          <input
            placeholder="Room name"
            type="text"
            id="room"
            name="room"
            value={room}
            onChange={e => setRoom(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <button
          className={
            name && room !== "" ? "btn__rounded" : "btn__rounded disabled"
          }
          type="submit"
        >
          Join room
        </button>
      </form>
    </div>
  )
}

export default StartForm
