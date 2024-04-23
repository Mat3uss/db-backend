/********************************
 * Objetivo: Cria a interação com o Banco de dados MySQL para fazer o CRUD de Filmes
 * Data: 09/04/2024
 * Autor: Matheus Zanoni
 * Versão: 1.0
 *******************************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();


const selectAllClassificacoes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_classificacao order by id_classificacao desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_classificacao) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsFilmes
    let rsClassficacao = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsClassficacao.length > 0)
     return rsClassficacao;
     else
        return false

}

const selectClassficationsById = async function(id){
        try {
            // Realiza a busca da classificacao pelo ID
            let sql = `select * from tbl_classificacao where id_classificacao = ${id}`;
        
            // Executa no banco de dados o script sql
            let rsClassficacao = await prisma.$queryRawUnsafe(sql);
    
                return rsClassficacao;
        
            } catch (error) {
                return false;
                
            }
    }

const deleteClassficationById = async function(id){
        try {
            let sql = `delete from tbl_classificacao where id_classificacao = ${id}`
    
            let rsClassficacao = await prisma.$queryRawUnsafe(sql);
            return rsClassficacao;
            
        } catch (error) {
            return false
            
        }
    }

    const selectIdClassificacao = async function(){
        try {
            let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_classificacao limit 1`

            let classificacaoId = await prisma.$queryRawUnsafe(sql)
            return classificacaoId
        } catch (error) {
            return false
        }
    }

    const insertClassificacao =  async function(dadosClassificacao) {
    
        try {
    
         let sql = `insert into tbl_classificacao(categoria, descricao, simbolo) values ('${dadosClassificacao.categoria}', '${dadosClassificacao.descricao}', '${dadosClassificacao.simbolo}' )`
                
            // Executa o script SQL no banco de dados | Devemos usar execute e não query!
            // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
            let result = await prisma.$executeRawUnsafe(sql);
    
            // Validação para verificar se o insert funcionou no banco de dados
            if(result )
                return true;
            else
                return false;
    
        } catch (error) {
    
            return false;
            
        }
    }


    const updateClassificacao =  async function(id, dadosClassificacao) {
    
        try{
            let sql;
    
                sql = `UPDATE tbl_classificacao SET categoria = '${dadosClassificacao.categoria}',
                    descricao = '${dadosClassificacao.descricao}',
                    simbolo = '${dadosClassificacao.simbolo}'
                    where id_classificacao = ${id}`
            
                    console.log(sql);
    
            let result = await prisma.$executeRawUnsafe(sql);
            
    
            if (result)
                return result
            else
                return false;
            
        } catch (error) {
            return false
    
        }
    }

module.exports = {
    selectAllClassificacoes,
    selectClassficationsById,
    deleteClassficationById,
    insertClassificacao,
    selectIdClassificacao,
    updateClassificacao
}