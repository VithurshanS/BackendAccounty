function handleGet(app, path, script) {
    app.get(path, async (req, res) => {
      try {
        const result = await script();
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
    });
}

function handlePost(app,path,script){
    app.post(path,async (req,res)=>{
        const re = await script(req.body);
        res.json(re);
    })
}


module.exports = {
    handleGet,
    handlePost
}
