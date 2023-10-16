const successResponse = (req, res, msg, data = []) => {
   const resData = {
      status: 1,
      message: msg,
      data: data
   }
   return res.status(200).json(resData)
}


const serverErrorResponse = (req, res, msg) => {
   const resData = {
      status: 0,
      message: msg
   }
   res.status(500).json(resData)
}


const successCreateResponse = (req, res, msg, data = []) => {
   const resData = {
      status: 1,
      message: msg,
      data: data
   }
   return res.status(201).json(resData)
}


module.exports = {
   successResponse,
   serverErrorResponse,
   successCreateResponse
}