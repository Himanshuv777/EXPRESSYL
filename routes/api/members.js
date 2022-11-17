const express = require('express');
const router = express.Router();
const members = require("../../Members");//this is array of members---> to simulate CRUD operation
const uuid = require('uuid');

//get all members


router.get("/lsl", (req, res) => {
    // res.json(members)
    res.send("hey get");

});

//get single member
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg:`no member with id of ${req.params.id} found`})
    }
});

//Create Member
//we can use same routes as long as they are different http methods
router.post('/',(req,res)=>{
    
    const newMember ={
        id: req.body.id || uuid.v4(),
        name : req.body.name,
        email : req.body.email,
        status : 'active'
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:"Please Include a name and email"});
    }

    members.push(newMember);
    //res.json(members);
    
    res.redirect('/');
});

// Update Members
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updMember = req.body;
        members.forEach(member =>{
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
                res.json({msg: "Member updated",member});
            }
        });
    } else {
        res.status(400).json({msg:`no member with id of ${req.params.id} found`})
    }
});

//Delete Member
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg:"Member deleted",
            members:members.filter(member => member.id !== parseInt(req.params.id))
        });
    } else {
        res.status(400).json({msg:`no member with id of ${req.params.id} found`})
    }
});


module.exports =  router;