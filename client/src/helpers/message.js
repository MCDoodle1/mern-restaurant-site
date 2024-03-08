

export const showErrorMessage = msg => {
    return ( 
        <div className="alert alert-danger" role="alert">
            {msg}
        </div>
     );
};

export const showSuccessMessage = msg => {
    return ( 
        <div className="alert alert-success" role="alert">
            {msg}
        </div>
     );
};
 
