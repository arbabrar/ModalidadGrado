
const Field = ({type ,valor,name,nameLabel ,change,helpvalor,validation}) =>{
  
    return (
        <div className="mb-3">
            <label 
                htmlFor={type} 
                className="form-label">
                {nameLabel}</label>
            <input 
                {...register(name, validation)}
                type={type} 
                className="form-control" 
                id={name} 
                name={name}
                placeholder={helpvalor} 
                defaultValue={valor}
                onChange={change}
             
                />
        </div>
       
    )
}

export default Field;