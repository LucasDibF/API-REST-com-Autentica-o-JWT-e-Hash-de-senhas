import { Router } from "express"; // Importando gerenciador de rotas do Express.
import bcrypt, { hash } from "bcrypt"; //Biblioteca de encriptação de senhas Hash.
import jsonwebtoken from "jsonwebtoken"; // Biblioteca de geração de token JWT.

const router = Router();
const usuarios = []

router.get("/", (req, res) => {
  res.json({
    message: "API Funcionando"
  })
})

router.get("/inicio",(req, res) => {
  res.send("Página Inicial")
})


//rota de registro com criptografia de senha com hash.
router.post("/registrar", async(req, res) => {
   const{ email, senha } = req.body; //extrai usuário e senha do banco
   const senhaHash = await bcrypt.hash(senha, 10);
   usuarios.push({ email, senha: senhaHash });
   res.status(201).send("Usuário Registrado")
})

//rota de teste
router.get("/perfil", (req, res) => {
  res.send("Resposta de teste")
})


router.post("/login", async(req, res) => {
  const{ email, senha } = req.body;//extrai email e senha do banco
  const usuario = usuarios.find(usuario => usuario.email === email);
 
  //condicional para autorizar ou não o login.
  if (usuario===undefined) {
    res.status(401).send("Usuário não autorizado")
  } else {
  //continua o login
  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    res.status(401).send("Senha incorreta");
  } else {
    const token = jsonwebtoken.sign(
      {email: usuario.email },
      "segredo-token",
      { expiresIn: "1h" }
    );
      res.status(200).json({
        message:"Login autorizado", 
        token
      });
  }
}
});


export default router;
