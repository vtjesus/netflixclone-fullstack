const List = require("../models/List.js")


// CREATE LIST

const createList = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            const newList = new List(req.body);
            const savedList = await newList.save();
            res.status(201).send(savedList)

        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied")
    };
}

// GET LIST

const getLists = async (req, res) => {
    const type = req.query.type;
    const genre = req.query.genre;
    let list = [];
    
    try {
        
        if (type) {
            if (genre) {
                list = await List.aggregate([
                    { 
                        $sample: { 
                            size: 10 
                            }
                    }, {
                        $match: {
                            type: type,
                            genre: genre
                        }
                    }
                ]);
                console.log(list)
            } else {
                list = await List.aggregate([
                    { 
                        $sample: { 
                            size: 10 
                            }
                    }, {
                        $match: {
                            type: type,
                        }
                    }
                ]);
            }  
        } else {
            list = await List.aggregate([
                { 
                    $sample: { 
                        size: 10 
                        }
                }
            ]);
        }

        res.status(200).send(list);
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET LISTS

// const getLists = async (req, res) => {
//     //if (req.user.isAdmin) {
    
//         try{
//             const lists = await List.find()
//             res.status(201).send(lists)

//         } catch (err) {
//             res.status(500).send(err);
//         }

//     //} else {
//         //res.status(403).send("Permission denied")
//     //};
// }

// DELETE LIST

const deleteList = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            await List.findByIdAndDelete(req.params.id)
            res.status(200).send("List deleted successfully");
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied");
    };
}

// UPDATE LIST

const updateList = async (req, res) => {
    if (req.user.isAdmin) {
    
        try{
            const updatedList = await List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).send(updatedList);
        } catch (err) {
            res.status(500).send(err);
        }

    } else {
        res.status(403).send("Permission denied");
    };
}

module.exports = {
    createList,
    getLists,
    deleteList,
    updateList
}