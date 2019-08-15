import React, { useState } from "react"
import axios from "axios"

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Display Name: <br />
          <input
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
          Room to Join: <br />
          <input
            type="text"
            id="room"
            name="room"
            value={room}
            onChange={e => setRoom(e.target.value)}
            className="input-field"
          />
        </label>
        <br />
        <button className="btn__rounded" type="submit">
          Join room
        </button>
      </form>
    </div>
  )
}

export default StartForm
