import React from 'react';
import ReactLoading from 'react-loading';
import "./Loading.css"

const Loading  = ({ type="spinningBubbles", color="#f5f51e " }) => {
    return (
        <div className='center'>
                <ReactLoading type={type} color={color} height={60} width={60} />
        </div>
           
    )
}
export default Loading;