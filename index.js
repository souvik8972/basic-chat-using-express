const  express=require("express")
const app=express()
const fs=require("fs")

app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    fs.readFile("message.txt",'utf8',(err,data)=>{
        if(err){
            console.log(err);
            data="No Chat Exist"
        }else{
            res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
    <input type="text" name="message" id="message">
    <input type="hidden" name="username" id="username">
<button type="submit">send</button>
    
</form>`)

        }
    })
    
})
app.post("/", (req, res) => {
    const username = req.body.username;
    const message = req.body.message;
    fs.writeFile("message.txt",(`${username}: ${message}  `),{flag:'a'},(err)=>{
        if(err){
            console.log(err)
        }res.redirect('/')

    })
    });
app.get('/login',(req,res)=>{
    res.send(`<form action="/login" method="POST" onsubmit="localStorage.setItem('username',document.getElementById('username').value)"> <input type="text" name="username" id="username"> <button type="submit">login</button></form>`)
   
})
app.post('/login', (req, res) => {
    
    res.redirect("/");
  });
app.listen(3000)
