const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 3000

const servidor = http.createServer((req,resp)=>{
    const UrlInfo = url.parse(req.url, true)
    const cor = UrlInfo.query.cor
    if(!cor){
        //usurario somente acessou a pagina, nao tem nada no meu form
        fs.readFile('index.html', function(err, data){
            resp.writeHead(200, {'content-type': 'text/html'})
            resp.write(data)
            return resp.end()
        })
    }else{
        //já tenho um form preenchido pelo usuario
        //escrever em um arquivo quando receber o valor de cor
        fs.writeFile("arquivo.txt", cor, function(err, data){
            resp.writeHead(302,{
                //enviar para home
                Location: "/"
            })
            return resp.end()
        })
    }
})

servidor.listen(port,()=>{
    console.log(`Porta: ${port}`)
})