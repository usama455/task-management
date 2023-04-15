import { errorResponse, successResponse } from "../../utils/response"

export const getAll = (req,res)=>{
try{
return successResponse(res,{data:"data"})
}catch(err){
    return errorResponse(res)
}
}