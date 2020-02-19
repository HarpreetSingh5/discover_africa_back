const express = require("express");
const router = express.Router();

const Movies = require("../../models/Data");

router.post('/watchlater',(req,res,next)=>{

    // let a = req.body.user+"?"
    // let token = a.slice(0,-1);
    console.log(req.body)
    const id = {"user":req.body.user};
    //const id = {user:"5e4cf8df9d2ca33d6c541041"}
    console.log(id)
    console.log(req.body.movie);
    var newvalues = { $push: {movie: req.body.movie } };

    let hardcoded = '5e4c39b081a41f3a080985ee';
   
    Movies.findOneAndUpdate(id,newvalues).exec()
    .then(result=>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        //console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

//try find one tomorrow. Cant seem to find and update 


router.get('/watchlaterall',(req,res,next)=>{   //get is a method that handles incoming GET requests. First parameter it takes is the url on which get requests target. 
    Movies.find()
    .exec() //.select is a filter that will only return data we specify in it. Its an optional method we can use. Still works if we just exec after .find()
    .then(obj=>{
        const response = {
            totalItems: obj.length,  //how many objects there are within our database. We could just pass the return we get from the database but this way we add metadata to our response
            items: obj.map(obj=>{
                return {
                    id: obj.id,
                    name: obj.user,
                    movies: obj.movie,

                }
            })
        };

         res.status(200).json(response);   //this is gonna return an array of all the objects within our database
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/watchlater/:userID',(req,res,next)=>{   //get is a method that handles incoming GET requests. First parameter it takes is the url on which get requests target. 
    const id = req.params.userID;  //this will get back whatever this id is. Its stored as a paramater of the request object so we extract it like this 
    console.log(req.params)
    Movies.findOne({user:id})
    .exec()
    .then(order=>{
        if(!order){
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            user: order.user,
            movie:order.movie,
            request:{
                type: "GET",
                url: "http://localhost:5000/watchlaterall"
            }
        });
    })
    .catch(err=>{
        res.status(500).json({
            error: err
        });
    });

});

module.exports = router;