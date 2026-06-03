const SubmitBtn = ({type,valor,clase }) =>{
    return (
        <>
        <div className="mb-3">
            
            <button type={type} 
                className= {clase}>
                    {valor}
            </button>
        </div>
        </>
    )
}
export default SubmitBtn;