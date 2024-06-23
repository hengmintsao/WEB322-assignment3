const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];


//1. Initialize function
function Initialize(){

    return new Promise((resolve,reject) =>{

        try{
            setData.forEach((set) => {

                let theme = themeData.find(theme =>theme.id === set.theme_id);
                
                if(theme){
                    let newTheme = {
                
                    ...set, theme:theme.name
                    };
                
                    sets.push(newTheme);
                }
                });

                resolve();
        }catch(error){
            reject("Initialize function is Failed!!!");
        }
         
    });




//console.log(sets); // prompt all objects 
 
}

//2. getAllSets function
//This function simply returns the complete "sets" array
function getAllSets(){

    return new Promise((resolve,reject) =>{


        try{
            resolve(sets);
        }catch(error){
            reject("getAllSets function is failed!!");
        }
    });

    
}

//3. getSetByNum function
function getSetByNum(setNum){

return new Promise((resolve,reject) =>{

    let findNum = sets.find(set => set.set_num === setNum);

    if(findNum){
        resolve(findNum);
    }else{
        reject(`getSetByNum function is failed!, unable to find requested set, ${setNum}`);
    }



})


}

//4. getSetsByTheme function
function getSetsByTheme(theme){

    return new Promise((resolve, reject) => {

        let themeName = theme.toUpperCase();

        let findTheme = sets.filter(set => set.theme.toUpperCase().includes(themeName));

        if(findTheme.length > 0 ){

            resolve(findTheme);

        }else{

            reject(`getSetsByTheme function is failed!!!, unable to find requested sets, ${theme}`);
        }

    })

}

//test code part 
//Initialize();
//console.log(getAllSets());
//console.log(getSetByNum("99999999999999999999"));
//console.log(getSetsByTheme("crazy"));

module.exports ={ Initialize, getAllSets, getSetByNum, getSetsByTheme};
