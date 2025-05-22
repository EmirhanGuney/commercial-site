
let navigateFunction = null;

export const setNavigate = (nav) => {
    navigateFunction = nav;
}

export const gotTo = (path, option = {}) => {
    if(navigateFunction){
        navigateFunction(path, option);
    } else{
        console.log(`${path} e yönlendirme yapılamadı`);
    }
}