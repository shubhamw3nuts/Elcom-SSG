export default async function handler(req, res) {
    // console.log("req : ",req)
    // console.log("res : ",res)
    console.log("QUERY : ",req.query)
    return res.json({ "hello": "true" })
  }