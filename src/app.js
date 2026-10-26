import Express from "express";
import router from "./index.js";
import jsonwebtoken from "jsonwebtoken";

const app = Express();
const PORT = 5000;


// Ele permite que suas rotas leiam dados JSON de req.body
app.use(Express.json());




//Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
})


function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    res.status(401).send("Acesso não autorizado")
   
  } else {
    const token = authHeader.split(" ")[1];
    next();
  }  
}


app.use("/perfil", verificarToken);

//Router
app.use(router); 


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
});




