import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";
import "./Loading.scss"

const Loading = () => {
  return (
    <BounceLoader className="loading" color="#591e4a" />
  )
}

export default Loading