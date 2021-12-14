module.exports = () => {
  return (params, req, res, next) => {
    let { data, code, msg } = params
    if (!data) return next(params)
    code = code || 200
    msg = msg || "ok"
    res.status(200).json({
      code,
      data,
      msg,
    })
  }
}
