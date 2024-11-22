import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavorites = async (key: any) => {
    try {
        const favorites = await AsyncStorage.getItem(`favorites${key}`);
        if (favorites) {
            return JSON.parse(favorites);
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};


export const addFavorites = async (key: any, id: string) => {
    try {
        const favorites = await getFavorites(key);
        if (favorites.includes(id)) {
            
            const newFavorites = favorites.filter((item: string) => item !== id);
            await AsyncStorage.setItem(`favorites${key}`, JSON.stringify(newFavorites));
            return; 
        }
        
        favorites.push(id);
        await AsyncStorage.setItem(`favorites${key}`, JSON.stringify(favorites));
    } catch (error) {
        console.log(error)
    }
};

export const removeFavorites = async (key: any, id: string) => {
    try {
        const favorites = await getFavorites(key); 
        const newFavorites = favorites.filter((item: string) => item !== id); 
        await AsyncStorage.setItem(`favorites${key}`, JSON.stringify(newFavorites));
    } catch (error) {
        console.log(error); 
    }
};


export const getCarts=async (key:any)=>{
    try {
        const carts=await AsyncStorage.getItem(`carts${key}`);
        if(carts){
            return JSON.parse(carts);
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const addCarts=async (key:any,id:string)=>{
    try {
        const carts=await getCarts(key);
        if(carts.includes(id)){
            const newCarts=carts.filter((item:string)=>item!==id);
            await AsyncStorage.setItem(`carts${key}`,JSON.stringify(newCarts));
            return;
        }
        carts.push(id);
        await AsyncStorage.setItem(`carts${key}`,JSON.stringify(carts));
    } catch (error) {
        console.log(error);
    }
}

export const removeCarts=async (key:any,id:string)=>{
    try {
        const carts=await getCarts(key);
        const newCarts=carts.filter((item:string)=>item!==id);
        await AsyncStorage.setItem(`carts${key}`,JSON.stringify(newCarts));
    } catch (error) {
        console.log(error);
    }
}