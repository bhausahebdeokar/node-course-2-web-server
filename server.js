const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
            hbs.registerPartials(__dirname + '/views/partials');
            app.set('view engine', 'hbs');

            

            //---this code for middleware, for security purpose----
            app.use((req, res, next) => {
                var now = new Date().toString();
                var log = `${now}: ${req.method} ${req.url}`;
                console.log(log);
                fs.appendFile('server.log', log + '\n', (err) =>{
                    if(err){
                        console.log('Unable to append to server log.');
                    }                    
                });
                next();
            });
            //-----------This code for Maintenance of web site---------------------------------------------
                    //app.use((req, res, next) => {
                    //res.render('maintenance.hbs');
                    //});
            //--this single code of line is very importent, keep this code after the maintenance page..
            app.use(express.static(__dirname + '/public'));
            //----------------------------------------------------------------------------

            hbs.registerHelper('getCurrentYear',()=>{
                return new Date().getFullYear()
            });

            hbs.registerHelper('screamIt',(text) => {
                return text.toUpperCase();
            });
            
            app.get('/',(req, res) =>{
                res.render('home.hbs',{
                    pageTitle:'Home Page',
                    WelcomMessage:'Welcome to first node js home page'
                });   
            });
            app.get('/about',(req, res) => {
            res.render('about.hbs',{
                pageTitle:'About Page'
                });
            });
            app.get('/bad', (req, res) => {
                res.send({
                    Message:"Bad Request by User"
                });
            });

            app.listen(3000, () =>{
                console.log('Server is up on port 3000');
            });