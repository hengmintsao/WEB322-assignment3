
/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Hengmin Tsao Student ID: 166494229 Date: 23 JUN 2024
*
*  Published URL: ___________________________________________________________
*
********************************************************************************/



const express = require('express');
const legoData = require("./modules/legoSets");
const path = require('path');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));

legoData.Initialize()
    .then(() => {
        console.log("Initialize successfully...");

        // GET "/"
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'home.html'));
        });

        
        app.get('/about', (req, res) => {
            res.sendFile(path.join(__dirname, 'views', 'about.html'));
        });

        
        
        app.get('/lego/sets', (req, res) => {
            const theme = req.query.theme;
            if (theme) {
                legoData.getSetsByTheme(theme) // show the specific theme
                    .then(sets => res.json(sets))
                    .catch(err => res.status(404).send('Error: ' + err.message));
            } else {
                legoData.getAllSets() // if there is not choose specific theme, show all
                    .then(sets => res.json(sets))
                    .catch(err => res.status(404).send('Error: ' + err.message));
            }
        });

        app.get('/lego/sets/:set_num', (req, res) => {
            const setNum = req.params.set_num;
            legoData.getSetByNum(setNum)
                .then(set => res.json(set))
                .catch(err => res.status(404).send('Error: ' + err.message));
        });
        

        
        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
        });

    })
    .catch(err => {
        console.error("Initialization failed: ", err);
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




